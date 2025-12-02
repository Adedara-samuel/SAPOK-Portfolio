// Simple booking system using localStorage instead of Firebase
document.getElementById("booking-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Booking...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
        const appointmentData = {
            id: Date.now().toString(),
            name: document.getElementById("booking-name").value,
            email: document.getElementById("booking-email").value,
            phone: document.getElementById("booking-phone").value,
            service: document.getElementById("booking-service").value,
            date: document.getElementById("booking-date").value,
            time: document.getElementById("booking-time").value,
            message: document.getElementById("booking-message").value,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Check if time slot is available
        const existingAppointments = getStoredAppointments();
        const isSlotTaken = existingAppointments.some(apt =>
            apt.date === appointmentData.date &&
            apt.time === appointmentData.time &&
            apt.status !== 'cancelled'
        );

        if (isSlotTaken) {
            showToast("This time slot is already booked. Please select a different time.", "error");
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }

        // Save appointment to localStorage
        existingAppointments.push(appointmentData);
        localStorage.setItem('appointments', JSON.stringify(existingAppointments));

        showToast("Appointment booked successfully! ✅\n\nI'll send you a confirmation email shortly.", "success");
        document.getElementById("booking-form").reset();

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

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Update available time slots when date changes
    dateInput.addEventListener('change', function() {
        const selectedDate = this.value;
        if (!selectedDate) return;

        updateTimeSlots(selectedDate);
    });

    function updateTimeSlots(selectedDate) {
        const appointments = getStoredAppointments();
        const bookedSlots = appointments
            .filter(apt => apt.date === selectedDate && apt.status !== 'cancelled')
            .map(apt => apt.time);

        const allSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
        const timeOptions = timeSelect.querySelectorAll('option');

        timeOptions.forEach(option => {
            if (option.value === '') return; // Skip placeholder option

            if (bookedSlots.includes(option.value)) {
                option.disabled = true;
                option.textContent = `${option.value} (Booked)`;
                option.style.color = '#999';
            } else {
                option.disabled = false;
                option.textContent = option.value;
                option.style.color = '';
            }
        });

        // Reset selection if current selection is disabled
        if (timeSelect.value && timeSelect.selectedOptions[0].disabled) {
            timeSelect.value = '';
        }
    }
});

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
    const toast = document.getElementById('toast');
    const toastContent = toast.querySelector('.toast-content');
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');

    // Set message
    toastMessage.textContent = message;

    // Set icon and styling based on type
    toastIcon.className = 'toast-icon';
    toast.className = 'toast';

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

    // Show toast
    toast.style.display = 'block';
    toast.style.opacity = '1';

    // Auto hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.style.opacity = '0';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 300);
}