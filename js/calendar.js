class ModernCalendar {
    constructor(options = {}) {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.availableSlots = {};
        this.onDateSelect = options.onDateSelect || (() => {});
        this.onClose = options.onClose || (() => {});

        this.init();
        this.render();
        this.attachEventListeners();
    }

    init() {
        // Create calendar overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'calendar-overlay';
        this.overlay.innerHTML = `
            <div class="calendar-container">
                <div class="calendar-header">
                    <button type="button" class="calendar-nav" id="prev-month">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <h3 class="calendar-title" id="calendar-title">December 2024</h3>
                    <button type="button" class="calendar-nav" id="next-month">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>

                <div class="calendar-weekdays">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>

                <div class="calendar-days" id="calendar-days">
                    <!-- Days will be populated by JavaScript -->
                </div>

                <div class="calendar-legend">
                    <div class="legend-item">
                        <div class="legend-dot available"></div>
                        <span>Available</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-dot booked"></div>
                        <span>Fully Booked</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-dot selected"></div>
                        <span>Selected</span>
                    </div>
                </div>

                <div class="calendar-actions">
                    <button type="button" class="btn btn-outline" id="calendar-cancel">Cancel</button>
                    <button type="button" class="btn btn-primary" id="calendar-confirm" disabled>Confirm Date</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.overlay);

        // Get DOM elements
        this.titleElement = this.overlay.querySelector('#calendar-title');
        this.daysContainer = this.overlay.querySelector('#calendar-days');
        this.prevButton = this.overlay.querySelector('#prev-month');
        this.nextButton = this.overlay.querySelector('#next-month');
        this.cancelButton = this.overlay.querySelector('#calendar-cancel');
        this.confirmButton = this.overlay.querySelector('#calendar-confirm');
    }

    render() {
        this.updateTitle();
        this.renderDays();
    }

    updateTitle() {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.titleElement.textContent = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    }

    renderDays() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Get first day of month and last day of month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const endDate = new Date(lastDay);
        endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

        // Clear previous days
        this.daysContainer.innerHTML = '';

        // Generate calendar days
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = currentDate.getDate();

            const dateString = this.formatDate(currentDate);
            const isCurrentMonth = currentDate.getMonth() === month;
            const isToday = this.isToday(currentDate);
            const isPast = currentDate < new Date().setHours(0, 0, 0, 0);
            const availability = this.getDateAvailability(dateString);

            // Add classes based on date properties
            if (!isCurrentMonth) {
                dayElement.classList.add('disabled');
            } else if (isPast) {
                dayElement.classList.add('disabled');
            } else if (this.selectedDate && dateString === this.formatDate(this.selectedDate)) {
                dayElement.classList.add('selected');
            } else if (availability === 'available') {
                dayElement.classList.add('available');
            } else if (availability === 'fully-booked') {
                dayElement.classList.add('fully-booked');
            }

            if (isToday && isCurrentMonth) {
                dayElement.classList.add('today');
            }

            // Add click handler for selectable dates
            if (isCurrentMonth && !isPast) {
                dayElement.addEventListener('click', () => this.selectDate(currentDate));
            }

            this.daysContainer.appendChild(dayElement);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    selectDate(date) {
        this.selectedDate = new Date(date);
        this.render();
        this.confirmButton.disabled = false;
    }

    async loadAvailability(month, year) {
        try {
            // Load availability for the entire month from server
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0);

            for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                const dateString = this.formatDate(date);

                // Get available slots for this date from server
                const response = await fetch(`/api/available-slots?date=${dateString}`);
                const data = await response.json();

                if (response.ok) {
                    // If no slots available, mark as fully booked
                    this.availableSlots[dateString] = data.availableSlots.length === 0 ? 'fully-booked' : 'available';
                } else {
                    console.error('Error fetching availability for', dateString, data.error);
                    this.availableSlots[dateString] = 'available'; // Default to available on error
                }
            }
        } catch (error) {
            console.error('Error loading availability:', error);
            this.setDefaultAvailability(month, year);
        }
    }

    setDefaultAvailability(month, year) {
        // Fallback: mark all dates as available if Firebase fails
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const dateString = this.formatDate(date);
            this.availableSlots[dateString] = 'available';
        }
    }

    getDateAvailability(dateString) {
        return this.availableSlots[dateString] || 'available';
    }

    attachEventListeners() {
        // Navigation
        this.prevButton.addEventListener('click', () => this.navigateMonth(-1));
        this.nextButton.addEventListener('click', () => this.navigateMonth(1));

        // Actions
        this.cancelButton.addEventListener('click', () => this.close());
        this.confirmButton.addEventListener('click', () => {
            if (this.selectedDate) {
                this.onDateSelect(this.selectedDate);
                this.close();
            }
        });

        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.overlay.classList.contains('active')) return;

            if (e.key === 'Escape') {
                this.close();
            } else if (e.key === 'Enter' && this.selectedDate && !this.confirmButton.disabled) {
                this.confirmButton.click();
            }
        });
    }

    async navigateMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        await this.loadAvailability(this.currentDate.getMonth(), this.currentDate.getFullYear());
        this.render();
    }

    show() {
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Load availability for current month
        this.loadAvailability(this.currentDate.getMonth(), this.currentDate.getFullYear());
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        this.onClose();
    }

    // Utility methods
    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    setSelectedDate(date) {
        this.selectedDate = new Date(date);
        this.confirmButton.disabled = false;
    }

    getSelectedDate() {
        return this.selectedDate;
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const calendarToggle = document.getElementById('calendar-toggle');
    const dateDisplay = document.getElementById('booking-date-display');
    const dateInput = document.getElementById('booking-date');
    const timeSelect = document.getElementById('booking-time');

    if (!calendarToggle) return;

    const calendar = new ModernCalendar({
        onDateSelect: (date) => {
            const formattedDate = calendar.formatDate(date);
            const displayDate = date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            dateDisplay.value = displayDate;
            dateInput.value = formattedDate;

            // Trigger time slot update
            updateTimeSlotsForDate(formattedDate);
        },
        onClose: () => {
            // Calendar closed
        }
    });

    calendarToggle.addEventListener('click', () => {
        calendar.show();
    });

    dateDisplay.addEventListener('click', () => {
        calendar.show();
    });

    // Update available time slots when date changes
    dateInput.addEventListener('change', function() {
        const selectedDate = this.value;
        if (!selectedDate) return;

        updateTimeSlotsForDate(selectedDate);
    });

    async function updateTimeSlotsForDate(selectedDate) {
        try {
            // Fetch available slots from server
            const response = await fetch(`/api/available-slots?date=${selectedDate}`);
            const data = await response.json();

            if (response.ok) {
                updateTimeSlots(data.availableSlots);
                console.log('Got available slots from server:', data.availableSlots);
            } else {
                console.error('Error fetching available slots:', data.error);
                // Fallback to all slots
                updateTimeSlots(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']);
            }
        } catch (error) {
            console.error('Error fetching available slots:', error);
            // Fallback to all slots if everything fails
            updateTimeSlots(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']);
        }
    }

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