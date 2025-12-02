# Adedara S.P SAPOK - Portfolio

A modern, responsive portfolio website with backend functionality, appointment booking system, and mobile app-like experience.

## ⚡ QUICK START - No Setup Required!

**Perfect for immediate testing!** Just open `index-simple.html` in your browser!

### ✅ **`index-simple.html`** - WORKS IMMEDIATELY!
- **localStorage-based** appointment booking (no Firebase needed!)
- **EmailJS** contact form
- **Real-time availability** checking
- **Mobile responsive** design
- **Toast notifications**
- **Calendar with availability**
- **Swipe gestures** for testimonials

### 🎯 **How to Test:**
1. **Double-click `index-simple.html`** → Opens in browser
2. **Book an appointment** → Saves to browser storage
3. **Send contact message** → EmailJS sends email
4. **Check calendar** → Shows booked/unavailable dates
5. **Refresh page** → Appointments persist!

---

### 🔄 **`index-standalone.html`** - SMART FALLBACK SYSTEM!
- **Firebase-first**, **localStorage-fallback** booking system
- **Automatically switches** to localStorage if Firebase fails
- **No setup required** - works even without Firebase configuration
- **EmailJS** contact form
- **Real-time availability** checking
- **Mobile responsive** design

### 🎯 **How to Test:**
1. **Open `index-standalone.html`** → Works immediately
2. **Book appointments** → Tries Firebase, falls back to localStorage
3. **Send contact messages** → EmailJS sends email
4. **Check availability** → Works with both storage systems

---

## 🔧 Advanced Version (Firebase Required)

If you want cloud storage, use `index-standalone.html`:

### 🚨 **Firebase Setup Required:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `single-bindery-470709-u8`
3. Go to **Firestore Database** → **Create database**
4. Choose **Start in test mode** → **Done**

### 🎯 **How to Test:**
1. **Open `index-standalone.html`** in browser
2. **Book an appointment** → Data saves to Firebase
3. **Send contact message** → EmailJS sends email
4. **Check calendar** → Shows booked/unavailable dates

**Note:** If Firebase isn't enabled, booking will show error but contact form still works!

## 🚀 Features

- **Full-Stack Portfolio**: Frontend with HTML/CSS/JS + Backend with Node.js/Express
- **Appointment Booking System**: Real-time booking with time slot management
- **Email Integration**: Contact forms and booking confirmations via email
- **Mobile App Experience**: Swipe gestures, responsive design, app-like interactions
- **Admin Dashboard**: Manage appointments at `/admin`
- **Vercel Deployment Ready**: Configured for serverless deployment

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gmail account for email sending (or configure your own SMTP)
- Firebase project (optional, for production database)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Adedara-samuel/SAPOK-Portfolio.git
cd SAPOK-Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
ADMIN_PASSWORD=your-secure-admin-password
PORT=3000
```

## 🔥 Firebase Setup ✅ (Now Active!)

**Firebase Firestore is now successfully configured and working!** Your appointment booking system uses Firebase for reliable, scalable data storage.

### Current Firebase Status:
- ✅ **Firebase Project**: `single-bindery-470709-u8`
- ✅ **Firestore Database**: Active and working
- ✅ **Service Account**: Configured
- ✅ **Appointment Storage**: Working perfectly

### For Production Deployment:
When deploying to Vercel, add this environment variable:
```env
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"single-bindery-470709-u8",...}
```

### Firebase Features:
- **Real-time data**: Appointments sync instantly
- **Scalable**: Handles thousands of bookings
- **Reliable**: No data loss on server restarts
- **Secure**: Server-side authentication

##  Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password: https://support.google.com/accounts/answer/185833
3. Use the App Password in EMAIL_PASS

## 🚀 Running Locally

```bash
npm start
```

Visit `http://localhost:3000`

## 📱 Appointment Booking System

### For Visitors:
- Navigate to "Book Appointment" section
- Select service, date, and available time slot
- Fill in contact details and submit
- Receive confirmation email
- Time slots are blocked once booked
- Past time slots automatically become available again

### For Admin:
- Visit `/admin?password=admin123` to manage appointments (change password in server.js)
- View dashboard with appointment statistics
- Search and filter appointments by status
- Confirm appointments with meeting details (Zoom links, locations, etc.)
- Mark appointments as completed or cancelled
- Automatic email notifications sent to clients
- Real-time updates and notifications

## 🎨 Features

### Mobile App Experience:
- Swipe gestures on testimonials and portfolio modals
- Touch-friendly interface
- Responsive design optimized for mobile
- App-like animations and transitions

### Backend Features:
- RESTful API endpoints
- Appointment time slot blocking
- Email notifications
- JSON-based data storage
- CORS enabled for cross-origin requests

## 📡 API Endpoints

### Contact
- `POST /api/contact` - Send contact form

### Appointments
- `POST /api/book-appointment` - Book new appointment
- `GET /api/available-slots?date=YYYY-MM-DD` - Get available time slots
- `GET /api/appointments` - Get all appointments (admin)
- `PATCH /api/appointments/:id` - Update appointment status

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Environment Variables on Vercel:
Set these in your Vercel project settings:
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Your Gmail App Password
- `NODE_ENV` - Set to `production`

## 📁 Project Structure

```
├── index.html                              # Main portfolio page
├── admin.html                              # Admin dashboard
├── server.js                               # Express server
├── firebase.js                             # Firebase configuration
├── firebase-service-account-template.json  # Firebase service account template
├── appointments.json                       # Appointment storage (fallback)
├── vercel.json                             # Vercel configuration
├── package.json                            # Dependencies and scripts
├── css/
│   └── mystyle.css                         # Main styles
├── js/
│   ├── script.js                           # Main functionality
│   ├── contact.js                          # Contact form handling
│   ├── booking.js                          # Appointment booking
│   └── calendar.js                         # Modern calendar component
└── images/                                 # Portfolio images
```

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server (requires nodemon)
- `npm run build` - Build for production (no-op for this project)

## 📞 Support

For issues or questions:
- Email: adedarasapok@gmail.com
- Portfolio: Visit the live site

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

---

**Built with ❤️ by Adedara Samuel Precious**