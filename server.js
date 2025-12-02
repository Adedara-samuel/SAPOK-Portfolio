
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const { db } = require('./firebase');

const app = express();
const PORT = process.env.PORT || 3000;
const APPOINTMENTS_FILE = path.join(__dirname, 'appointments.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Helper functions for appointment management
async function readAppointments() {
  try {
    if (db) {
      // Use Firebase
      console.log('Reading appointments from Firebase DB');
      const snapshot = await db.collection('appointments').get();
      let appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(`Found ${appointments.length} appointments in Firebase`);

      // If Firebase is empty, seed with JSON data
      if (appointments.length === 0) {
        console.log('Firebase collection is empty, seeding with JSON data');
        const jsonData = await fs.readFile(APPOINTMENTS_FILE, 'utf8');
        const jsonAppointments = JSON.parse(jsonData);
        for (const appointment of jsonAppointments) {
          await db.collection('appointments').doc(appointment.id).set(appointment);
        }
        appointments = jsonAppointments;
        console.log(`Seeded Firebase with ${appointments.length} appointments`);
      }

      return appointments;
    } else {
      // Fallback to JSON file
      console.log('Reading appointments from JSON file (Firebase not available)');
      const data = await fs.readFile(APPOINTMENTS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading appointments:', error);
    return [];
  }
}

async function writeAppointments(appointments) {
  // This function is kept for backward compatibility but not used with Firebase
  if (!db) {
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));
  }
}

async function isTimeSlotAvailable(date, time) {
  try {
    // Check if the date/time is in the past
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    // If the appointment time has passed, it's available again
    if (appointmentDateTime < now) {
      return true;
    }

    if (db) {
      // Use Firebase
      const snapshot = await db.collection('appointments')
        .where('date', '==', date)
        .where('time', '==', time)
        .where('status', 'in', ['pending', 'confirmed'])
        .get();

      return snapshot.empty;
    } else {
      // Fallback to JSON file
      const appointments = await readAppointments();
      return !appointments.some(appointment =>
        appointment.date === date &&
        appointment.time === time &&
        appointment.status !== 'completed' &&
        appointment.status !== 'cancelled'
      );
    }
  } catch (error) {
    console.error('Error checking time slot availability:', error);
    return false;
  }
}

function generateAppointmentId() {
  return `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  try {
    const mailOptions = {
      from: email,
      to: 'adedarasapok@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// Appointment booking endpoint
app.post('/api/book-appointment', async (req, res) => {
  const { name, email, phone, service, date, time, message } = req.body;

  if (!name || !email || !phone || !service || !date || !time || !message) {
    return res.status(400).json({ error: 'All required fields must be filled' });
  }

  try {
    // Check if time slot is available
    const isAvailable = await isTimeSlotAvailable(date, time);
    if (!isAvailable) {
      return res.status(409).json({
        error: 'This time slot is already booked. Please select a different time.'
      });
    }

    // Create new appointment
    const appointmentId = generateAppointmentId();
    const newAppointment = {
      id: appointmentId,
      name,
      email,
      phone,
      service,
      date,
      time,
      message,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save to database
    if (db) {
      // Use Firebase
      await db.collection('appointments').doc(appointmentId).set(newAppointment);
    } else {
      // Fallback to JSON file
      const appointments = await readAppointments();
      appointments.push(newAppointment);
      await writeAppointments(appointments);
    }

    const serviceName = service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    const mailOptions = {
      from: email,
      to: 'adedarasapok@gmail.com',
      subject: `New Appointment Booking: ${serviceName}`,
      html: `
        <h2>New Appointment Booking</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><strong>Appointment ID:</strong> ${newAppointment.id}</p>
        <p><em>Please confirm this appointment and send details to the client.</em></p>
        <p><a href="${process.env.VERCEL_URL || 'http://localhost:3000'}/api/appointments/${newAppointment.id}/confirm">Confirm Appointment</a></p>
      `
    };

    // Also send confirmation to client
    const clientMailOptions = {
      from: 'adedarasapok@gmail.com',
      to: email,
      subject: 'Appointment Booking Confirmation - Adedara S.P SAPOK',
      html: `
        <h2>Appointment Booking Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Thank you for booking an appointment with me! Here are the details:</p>
        <ul>
          <li><strong>Service:</strong> ${serviceName}</li>
          <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p><strong>Your Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><strong>Status:</strong> Pending Confirmation</p>
        <p>I will send you a confirmation email once I review your booking. If you need to make any changes, please reply to this email.</p>
        <p>Looking forward to working with you!</p>
        <p>Best regards,<br>Adedara Samuel Precious<br>Software Developer</p>
      `
    };

    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    res.json({
      success: true,
      message: 'Appointment booked successfully! You will receive a confirmation email.',
      appointmentId: newAppointment.id
    });
  } catch (error) {
    console.error('Appointment booking error:', error);
    res.status(500).json({ error: 'Failed to book appointment. Please try again.' });
  }
});

// Get available time slots for a specific date
app.get('/api/available-slots', async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  try {
    const allSlots = [
      '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
    ];

    let bookedSlots = [];

    if (db) {
      // Use Firebase
      const snapshot = await db.collection('appointments')
        .where('date', '==', date)
        .where('status', 'in', ['pending', 'confirmed'])
        .get();

      bookedSlots = snapshot.docs.map(doc => doc.data().time);
    } else {
      // Fallback to JSON file
      const appointments = await readAppointments();
      bookedSlots = appointments
        .filter(apt => apt.date === date && apt.status !== 'completed' && apt.status !== 'cancelled')
        .map(apt => apt.time);
    }

    // Filter out past time slots for today
    const today = new Date().toISOString().split('T')[0];
    let availableSlotsFiltered = allSlots.filter(slot => !bookedSlots.includes(slot));

    if (date === today) {
      const now = new Date();
      availableSlotsFiltered = availableSlotsFiltered.filter(slot => {
        const slotTime = new Date(`${date}T${slot}`);
        return slotTime > now;
      });
    }

    res.json({ availableSlots: availableSlotsFiltered });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ error: 'Failed to fetch available slots' });
  }
});

// Get all appointments (for admin)
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await readAppointments();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Update appointment status
app.patch('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { status, meetingDetails } = req.body;

  if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    let appointment;

    if (db) {
      // Use Firebase
      const appointmentRef = db.collection('appointments').doc(id);
      const doc = await appointmentRef.get();

      if (!doc.exists) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      appointment = doc.data();
      await appointmentRef.update({ status, meetingDetails, confirmedAt: new Date().toISOString() });
    } else {
      // Fallback to JSON file
      const appointments = await readAppointments();
      const appointmentIndex = appointments.findIndex(apt => apt.id === id);

      if (appointmentIndex === -1) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      appointment = appointments[appointmentIndex];
      appointments[appointmentIndex].status = status;
      appointments[appointmentIndex].meetingDetails = meetingDetails;
      appointments[appointmentIndex].confirmedAt = new Date().toISOString();
      await writeAppointments(appointments);
    }

    // Send confirmation email to client if status is confirmed
    if (status === 'confirmed' && appointment) {
      const serviceName = appointment.service.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

      const confirmationMailOptions = {
        from: 'adedarasapok@gmail.com',
        to: appointment.email,
        subject: 'Appointment Confirmed - Adedara S.P SAPOK',
        html: `
          <h2>Appointment Confirmed!</h2>
          <p>Dear ${appointment.name},</p>
          <p>Great news! Your appointment has been confirmed. Here are the details:</p>
          <ul>
            <li><strong>Service:</strong> ${serviceName}</li>
            <li><strong>Date:</strong> ${new Date(appointment.date).toLocaleDateString()}</li>
            <li><strong>Time:</strong> ${appointment.time}</li>
          </ul>
          ${meetingDetails ? `<p><strong>Meeting Details:</strong> ${meetingDetails}</p>` : ''}
          <p><strong>Your Message:</strong></p>
          <p>${appointment.message.replace(/\n/g, '<br>')}</p>
          <p>I'm looking forward to our meeting! If you have any questions, feel free to reply to this email.</p>
          <p>Best regards,<br>Adedara Samuel Precious<br>Software Developer</p>
        `
      };

      try {
        await transporter.sendMail(confirmationMailOptions);
        console.log('Confirmation email sent to client');
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
      }
    }

    res.json({ success: true, message: 'Appointment status updated' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// Confirm appointment endpoint (for the email link)
app.get('/api/appointments/:id/confirm', async (req, res) => {
  const { id } = req.params;

  try {
    // Update status to confirmed
    const response = await fetch(`${req.protocol}://${req.get('host')}/api/appointments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'confirmed' })
    });

    if (response.ok) {
      res.send(`
        <html>
        <head>
          <title>Appointment Confirmed</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .success { color: #10b981; }
          </style>
        </head>
        <body>
          <h1 class="success">Appointment Confirmed!</h1>
          <p>Your appointment has been successfully confirmed.</p>
          <p>You will receive a confirmation email with the details shortly.</p>
          <p><a href="/">Return to Website</a></p>
        </body>
        </html>
      `);
    } else {
      res.status(500).send('Failed to confirm appointment. Please try again.');
    }
  } catch (error) {
    console.error('Error confirming appointment:', error);
    res.status(500).send('An error occurred. Please try again.');
  }
});

// Admin route (simple password protection)
app.get('/admin', (req, res) => {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Psalmuel'; // Change this!

  // Check if password is provided in query
  if (req.query.password !== ADMIN_PASSWORD) {
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Admin Login - Adedara S.P SAPOK</title>
        <style>
          body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .login-container {
            background: white;
            padding: 3rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 90%;
            text-align: center;
          }
          .login-container h2 {
            margin-bottom: 2rem;
            color: #1e293b;
          }
          .login-container input {
            width: 100%;
            padding: 1rem;
            margin: 0.5rem 0;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1.6rem;
            transition: border-color 0.3s ease;
          }
          .login-container input:focus {
            outline: none;
            border-color: #2563eb;
          }
          .login-container button {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.6rem;
            font-weight: 600;
            width: 100%;
            margin-top: 1rem;
            transition: transform 0.2s ease;
          }
          .login-container button:hover {
            transform: translateY(-2px);
          }
          .login-container .logo {
            font-size: 2.5rem;
            color: #2563eb;
            margin-bottom: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="login-container">
          <div class="logo">
            <i class="fas fa-calendar-check"></i>
          </div>
          <h2>Admin Access Required</h2>
          <form method="get" action="/admin">
            <input type="password" name="password" placeholder="Enter admin password" required>
            <button type="submit">Access Admin Panel</button>
          </form>
        </div>
      </body>
      </html>
    `);
  }

  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// For Vercel deployment
if (process.env.NODE_ENV === 'production') {
  module.exports = app;
} else {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}