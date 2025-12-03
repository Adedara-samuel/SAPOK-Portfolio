
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

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/cv', express.static(path.join(__dirname, 'cv')));

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
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Access - Adedara S.P SAPOK</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
        <style>
          :root {
            --primary-color: #2563eb;
            --secondary-color: #10b981;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --gray-color: #64748b;
            --light-color: #f8fafc;
            --dark-color: #1e293b;
            --darker-color: #0f172a;
            --light-gray: #e2e8f0;
            --font-primary: 'Poppins', sans-serif;
            --font-secondary: 'Montserrat', sans-serif;
            --gradient-primary: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            --gradient-secondary: linear-gradient(135deg, #10b981 0%, #047857 100%);
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 20px 25px rgba(0, 0, 0, 0.1);
            --radius: 0.5rem;
            --radius-lg: 0.75rem;
            --transition: all 0.3s ease;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: var(--font-primary);
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow-x: hidden;
          }

          body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background:
              radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.03) 0%, transparent 50%);
            pointer-events: none;
            z-index: -1;
          }

          .login-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 1.5rem;
            box-shadow:
              0 20px 40px rgba(0, 0, 0, 0.12),
              0 8px 20px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
            max-width: 420px;
            width: 90%;
            padding: 3rem 2.5rem;
            text-align: center;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .login-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #2563eb, #10b981, #f59e0b);
            border-radius: 2rem 2rem 0 0;
          }

          .logo-section {
            margin-bottom: 2.5rem;
          }

          .logo {
            width: 60px;
            height: 60px;
            background: var(--gradient-primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.8rem;
            margin: 0 auto 1.5rem;
            box-shadow: var(--shadow-lg);
            position: relative;
          }

          .logo::after {
            content: '';
            position: absolute;
            inset: -3px;
            border-radius: 50%;
            background: var(--gradient-primary);
            opacity: 0.3;
            z-index: -1;
          }

          .login-title {
            font-size: 2.2rem;
            font-weight: 700;
            color: var(--darker-color);
            margin-bottom: 0.5rem;
            font-family: var(--font-secondary);
          }

          .login-subtitle {
            color: var(--gray-color);
            font-size: 1.4rem;
            margin-bottom: 2.5rem;
            opacity: 0.8;
          }

          .login-form {
            width: 100%;
          }

          .form-group {
            margin-bottom: 1.5rem;
            position: relative;
          }

          .form-group input {
            width: 100%;
            padding: 1.2rem 1.5rem 1.2rem 4rem;
            border: 2px solid var(--light-gray);
            border-radius: var(--radius-lg);
            font-size: 1.4rem;
            font-family: var(--font-primary);
            color: var(--dark-color);
            background: white;
            transition: var(--transition);
            outline: none;
            position: relative;
          }

          .form-group input::placeholder {
            color: var(--gray-color);
            opacity: 0.7;
          }

          .form-group input:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
            transform: translateY(-1px);
          }

          .form-group i {
            position: absolute;
            left: 1.5rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray-color);
            font-size: 1.6rem;
            transition: var(--transition);
          }

          .form-group input:focus + i,
          .form-group input:focus ~ i {
            color: var(--primary-color);
          }

          .login-btn {
            width: 100%;
            padding: 1.2rem 1.5rem;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: var(--radius-lg);
            font-size: 1.5rem;
            font-weight: 600;
            font-family: var(--font-secondary);
            cursor: pointer;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
            box-shadow: var(--shadow);
          }

          .login-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.6s;
          }

          .login-btn:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-lg);
          }

          .login-btn:hover::before {
            left: 100%;
          }

          .login-btn:active {
            transform: translateY(-1px);
          }

          .back-link {
            display: inline-block;
            margin-top: 1.5rem;
            padding: 0.8rem 1.5rem;
            color: var(--primary-color);
            text-decoration: none;
            border: 2px solid var(--primary-color);
            border-radius: var(--radius);
            font-weight: 600;
            transition: var(--transition);
            font-size: 1.3rem;
          }

          .back-link:hover {
            background: var(--primary-color);
            color: white;
            transform: translateY(-1px);
            box-shadow: var(--shadow);
          }

          .error-message {
            background: rgba(239, 68, 68, 0.1);
            color: var(--danger-color);
            padding: 1rem;
            border-radius: var(--radius);
            margin-bottom: 2rem;
            border: 1px solid rgba(239, 68, 68, 0.2);
            font-size: 1.4rem;
          }

          /* Animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInScale {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          .login-container {
            animation: slideInScale 0.8s ease-out;
          }

          .logo {
            animation: fadeInUp 0.6s ease-out 0.2s both;
          }

          .login-title {
            animation: fadeInUp 0.6s ease-out 0.4s both;
          }

          .login-subtitle {
            animation: fadeInUp 0.6s ease-out 0.6s both;
          }

          .login-form {
            animation: fadeInUp 0.6s ease-out 0.8s both;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .login-container {
              padding: 2.5rem 2rem;
              margin: 1.5rem;
              max-width: 380px;
            }

            .login-title {
              font-size: 2rem;
            }

            .login-subtitle {
              font-size: 1.3rem;
            }

            .form-group input {
              padding: 1.1rem 1.3rem 1.1rem 3.8rem;
              font-size: 1.3rem;
            }

            .form-group i {
              left: 1.3rem;
              font-size: 1.5rem;
            }

            .login-btn {
              padding: 1.1rem 1.3rem;
              font-size: 1.4rem;
            }
          }

          @media (max-width: 480px) {
            .login-container {
              padding: 2rem 1.5rem;
              max-width: 340px;
            }

            .logo {
              width: 55px;
              height: 55px;
              font-size: 1.6rem;
            }

            .login-title {
              font-size: 1.8rem;
            }

            .form-group input {
              font-size: 1.2rem;
              padding: 1rem 1.2rem 1rem 3.5rem;
            }

            .form-group i {
              left: 1.2rem;
              font-size: 1.4rem;
            }

            .login-btn {
              padding: 1rem 1.2rem;
              font-size: 1.3rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="login-container">
          <div class="logo-section">
            <div class="logo">
              <i class="fas fa-calendar-check"></i>
            </div>
            <h1 class="login-title">Admin Access</h1>
            <p class="login-subtitle">Enter your credentials to access the admin panel</p>
          </div>

          <form class="login-form" method="get" action="/admin">
            <div class="form-group">
              <input type="password" name="password" placeholder="Enter admin password" required>
              <i class="fas fa-lock"></i>
            </div>
            <button type="submit" class="login-btn">
              <i class="fas fa-sign-in-alt"></i> Access Admin Panel
            </button>
          </form>

          <a href="/" class="back-link">
            <i class="fas fa-arrow-left"></i> Back to Website
          </a>
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