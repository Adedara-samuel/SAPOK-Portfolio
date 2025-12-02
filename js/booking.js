// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgZSVkGJJKrFy_myaeWi1KmEAhocii6RY",
    authDomain: "single-bindery-470709-u8.firebaseapp.com",
    projectId: "single-bindery-470709-u8",
    storageBucket: "single-bindery-470709-u8.firebasestorage.app",
    messagingSenderId: "803704604709",
    appId: "1:803704604709:web:6019e1f8b4a27dcdfd57cc",
    measurementId: "G-NW91L49D4L"
};

// Initialize Firebase
let db = null;

function initializeFirebase() {
    try {
        if (typeof firebase !== 'undefined') {
            if (!firebase.apps || firebase.apps.length === 0) {
                firebase.initializeApp(firebaseConfig);
                console.log('Firebase initialized successfully');
            } else {
                console.log('Firebase already initialized');
            }
            db = firebase.firestore();
        } else {
            console.log('Firebase not available, using localStorage fallback');
        }
    } catch (error) {
        console.error('Firebase initialization error:', error);
        // Continue without Firebase - will use fallback
    }
}

// Initialize Firebase when DOM is ready
document.addEventListener('DOMContentLoaded', initializeFirebase);

document.getElementById("booking-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Booking...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
        const appointmentData = {
            name: document.getElementById("booking-name").value,
            email: document.getElementById("booking-email").value,
            phone: document.getElementById("booking-phone").value,
            service: document.getElementById("booking-service").value,
            date: document.getElementById("booking-date").value,
            time: document.getElementById("booking-time").value,
            message: document.getElementById("booking-message").value
        };

        // Send to server API
        const response = await fetch('/api/book-appointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData)
        });

        const result = await response.json();

        if (response.ok) {
            showToast("Appointment booked successfully! ✅\n\nI'll send you a confirmation email shortly.", "success");
            document.getElementById("booking-form").reset();
        } else {
            showToast(result.error || "Failed to book appointment. ❌ Please try again.", "error");
        }

    } catch (error) {
        showToast("Failed to book appointment. ❌ Please try again.", "error");
        console.error("Booking form error:", error);
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Handle time slot availability updates
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('booking-date');
    const timeSelect = document.getElementById('booking-time');

    // Update available time slots when date changes
    dateInput.addEventListener('change', async function() {
        const selectedDate = this.value;
        if (!selectedDate) return;

        try {
            let bookedSlots = [];

            // Try Firebase first
            if (db) {
                try {
                    const bookedAppointments = await db.collection('appointments')
                        .where('date', '==', selectedDate)
                        .where('status', 'in', ['pending', 'confirmed'])
                        .get();

                    bookedSlots = bookedAppointments.docs.map(doc => doc.data().time);
                    console.log('Got booked slots from Firebase:', bookedSlots);
                } catch (firebaseError) {
                    console.log('Firebase failed, using localStorage fallback');
                }
            }

            // Fallback to localStorage if Firebase fails or isn't available
            if (bookedSlots.length === 0) {
                const localAppointments = getStoredAppointments();
                bookedSlots = localAppointments
                    .filter(apt => apt.date === selectedDate && apt.status !== 'cancelled')
                    .map(apt => apt.time);
                console.log('Got booked slots from localStorage:', bookedSlots);
            }

            const allSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
            const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

            updateTimeSlots(availableSlots);
        } catch (error) {
            console.error('Error fetching available slots:', error);
            // Fallback to all slots if everything fails
            updateTimeSlots(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']);
        }
    });

    function updateTimeSlots(availableSlots) {
        const timeOptions = timeSelect.querySelectorAll('option');

        timeOptions.forEach(option => {
            if (option.value === '') return; // Skip placeholder option

            if (availableSlots.includes(option.value)) {
                option.disabled = false;
                option.textContent = option.value;
            } else {
                option.disabled = true;
                option.textContent = `${option.value} (Booked)`;
            }
        });

        // Reset selection if current selection is disabled
        if (timeSelect.value && timeSelect.selectedOptions[0].disabled) {
            timeSelect.value = '';
        }
    }
});

// Utility functions
function getStoredAppointments() {
    try {
        const stored = localStorage.getItem('appointments');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading appointments from localStorage:', error);
        return [];
    }
}

// Toast notification functions
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.getElementById('toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';

    const toastContent = document.createElement('div');
    toastContent.className = 'toast-content';

    const toastIcon = document.createElement('i');
    toastIcon.className = 'toast-icon';

    const toastMessage = document.createElement('span');
    toastMessage.className = 'toast-message';
    toastMessage.textContent = message;

    const toastClose = document.createElement('button');
    toastClose.className = 'toast-close';
    toastClose.innerHTML = '<i class="fas fa-times"></i>';
    toastClose.onclick = () => hideToast();

    // Set icon and styling based on type
    if (type === 'success') {
        toastIcon.className += ' fas fa-check-circle';
        toast.className += ' success';
    } else if (type === 'error') {
        toastIcon.className += ' fas fa-exclamation-circle';
        toast.className += ' error';
    } else {
        toastIcon.className += ' fas fa-info-circle';
        toast.className += ' info';
    }

    toastContent.appendChild(toastIcon);
    toastContent.appendChild(toastMessage);
    toast.appendChild(toastContent);
    toast.appendChild(toastClose);

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);

    // Auto hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}