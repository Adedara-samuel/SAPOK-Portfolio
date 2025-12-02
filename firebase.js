const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let db = null;
let auth = null;

if (!admin.apps.length) {
  try {
    // For production, use environment variables
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://sapok-portfolio-default-rtdb.firebaseio.com'
      });
      db = admin.firestore();
      auth = admin.auth();
      console.log('Firebase initialized successfully with environment variables.');
    } else {
      // For local development, use service account file (you'll need to create this)
      const serviceAccount = require('./firebase-service-account.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://sapok-portfolio-default-rtdb.firebaseio.com'
      });
      db = admin.firestore();
      auth = admin.auth();
      console.log('Firebase initialized successfully with service account file.');
    }
  } catch (error) {
    console.warn('Firebase initialization failed. Using local JSON storage as fallback.');
    console.warn('Error details:', error.message);
    console.warn('To enable Firebase, set up your Firebase project and service account key.');
    // Fallback to null - will use JSON storage
  }
}

console.log('Firebase db available:', !!db);

module.exports = { admin, db, auth };