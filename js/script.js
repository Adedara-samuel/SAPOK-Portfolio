// Selectors for navigation and dynamic section highlighting
let menuBar = document.querySelector('#menu-bar');
let nav = document.querySelector('nav');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Toggle mobile menu visibility
menuBar.onclick = () => {
  menuBar.classList.toggle('fa-x');
  nav.classList.toggle('active');
};

// Add active class on navigation links click and close mobile menu
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
    menuBar.classList.remove('fa-x');
    nav.classList.remove('active');
  });
});

// Highlight the active section in the navigation bar during scrolling
window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      document.querySelector(`header nav a[href*="${id}"]`).classList.add('active');
    }
  });

  // Sticky header effect
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);
};

// Scroll reveal animations
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200
});
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .service-container, .portfolio-box, .contact form', { origin: 'bottom' });

// Real-time Typed Text Effect Setup
const dynamicTexts = ['Frontend Developer', 'Backend Developer', 'Software Engineer', 'Database Engineer', 'Software Developer'];

let typedInstance;

// Initialize or Update Typed Text Effect
function initTypedEffect(stringsArray) {
  if (typedInstance) typedInstance.destroy(); // Remove any existing instance

  typedInstance = new Typed('.multiple-text', {
    strings: stringsArray,
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
  });
}

// Initial typed text setup
initTypedEffect(dynamicTexts);

// Example for dynamically updating typed text after 5 seconds
setTimeout(() => {
  initTypedEffect(['Fullstack Developer', 'Tech Enthusiast', 'Innovative Engineer']);
}, 5000);

// Function to trigger real-time updates for typed text
function updateTypedText(newTexts) {
  initTypedEffect(newTexts);
}

// Download CV with confirmation and custom filename prompt
document.querySelector('#download-cv').addEventListener('click', function (event) {
  event.preventDefault();
  let confirmation = confirm('Are you sure you want to download the CV?');
  if (confirmation) {
    let filename = prompt('Enter a filename for the CV:', 'AdedaraSamuel_CV.pdf');
    if (filename) {
      let downloadLink = document.createElement('a');
      downloadLink.href = 'path-to-your-cv/AdedaraSamuel_CV.pdf'; // Adjust path accordingly
      downloadLink.download = filename;
      downloadLink.click();
    }
  }
});
