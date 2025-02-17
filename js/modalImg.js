// Get modal elements
const modal = document.getElementById("projectModal");
const closeModal = document.querySelector(".close");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const openModalButtons = document.querySelectorAll(".portfolio-box .open-modal");

let currentSlide = 0;

// Ensure modal is hidden on page load
modal.style.display = "none";

// Function to show slides
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? "block" : "none";
    });
}

// Function to open modal
openModalButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "flex"; // Show modal when clicked
        showSlide(0); // Reset to first slide
    });
});

// Function to close modal
function closeProjectModal() {
    modal.style.display = "none";
}

// Close modal when clicking the close button
closeModal.addEventListener("click", closeProjectModal);

// Close modal when clicking outside the content
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeProjectModal();
    }
});

// Previous Slide
prevBtn.addEventListener("click", function () {
    currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
});

// Next Slide
nextBtn.addEventListener("click", function () {
    currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
});
