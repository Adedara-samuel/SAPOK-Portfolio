// Preloader
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
          preloader.style.display = 'none';
      }, 500);
  }, 500);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', function() {
  this.classList.toggle('active');
  mainNav.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
  });
});

// Sticky Header
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
          });
      }
  });
});

// Active Section Highlight
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.main-nav a');

window.addEventListener('scroll', function() {
  let current = '';
  
  sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 300) {
          current = section.getAttribute('id');
      }
  });
  
  navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
      }
  });
});

// Initialize Typed.js
const typed = new Typed('.typed-text', {
  strings: ['Web Applications', 'Scalable Solutions', 'User Experiences', 'Digital Products'],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 1500,
  loop: true
});

// About Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabBtns.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      document.getElementById(`${tabId}-tab`).classList.add('active');
  });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      portfolioItems.forEach(item => {
          const matchesFilter = filterValue === 'all' || item.getAttribute('data-category') === filterValue;
          const isHidden = item.classList.contains('hidden-project') && !allProjectsVisible;

          if (matchesFilter && !isHidden) {
              item.style.display = 'block';
              item.classList.add('fade-in');
          } else {
              item.style.display = 'none';
              item.classList.remove('fade-in');
          }
      });
  });
});

// View All Projects functionality
const viewAllBtn = document.querySelector('.portfolio-cta a');
let allProjectsVisible = false;

viewAllBtn.addEventListener('click', function(e) {
  e.preventDefault();

  const hiddenProjects = document.querySelectorAll('.hidden-project');

  if (!allProjectsVisible) {
      // Show hidden projects
      hiddenProjects.forEach(project => {
          project.style.display = 'block';
          project.classList.add('fade-in');
      });
      viewAllBtn.textContent = 'Show Less';
      allProjectsVisible = true;
  } else {
      // Hide projects again and reapply current filter
      const activeFilter = document.querySelector('.filter-btn.active');
      const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';

      portfolioItems.forEach(item => {
          const matchesFilter = filterValue === 'all' || item.getAttribute('data-category') === filterValue;
          const isHidden = item.classList.contains('hidden-project');

          if (matchesFilter && !isHidden) {
              item.style.display = 'block';
              item.classList.add('fade-in');
          } else {
              item.style.display = 'none';
              item.classList.remove('fade-in');
          }
      });
      viewAllBtn.textContent = 'View All Projects';
      allProjectsVisible = false;
  }
});

// Current Year in Footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate hero content
gsap.from('.hero-content > *', {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.2,
  delay: 0.5,
  ease: "power3.out"
});

// Animate hero image
gsap.from('.hero-image', {
  opacity: 0,
  x: 100,
  duration: 1,
  delay: 0.8,
  ease: "power3.out"
});

// Animate sections on scroll
gsap.utils.toArray('section').forEach(section => {
  gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
      }
  });
});

// Animate cards
gsap.utils.toArray('.expertise-card, .portfolio-item').forEach(card => {
  gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none"
      }
  });
});

// Modal functionality
const portfolioModals = document.querySelectorAll('.portfolio-more');
const projectModal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');

// Sample project data (you would replace this with your actual project data)
const projects = {
  elibrary: {
      title: "E-Library System",
      category: "Web Application",
      date: "2023",
      description: "A comprehensive digital library platform developed for university departments to manage and distribute educational resources efficiently.",
      features: [
          "User authentication and authorization",
          "Book categorization and search functionality",
          "Admin dashboard for resource management",
          "User borrowing history tracking",
          "Responsive design for all devices"
      ],
      technologies: ["React", "Node.js", "Express", "MSSQL", "Redux", "JWT"],
      images: [
          "images/pt2.1.png",
          "images/pt2.2.png",
          "images/pt2.3.png",
          "images/pt2.4.png",
          "images/p1.png",
          "images/portfolio6.png"
      ],
      liveUrl: "https://e-library-system-six.vercel.app/",
      codeUrl: "https://github.com/yourusername/e-library-system"
  },
  gaming: {
      title: "Gaming E-Commerce Platform",
      category: "Web Application",
      date: "2023",
      description: "An interactive gaming package purchase platform with cart functionality and seamless checkout process.",
      features: [
          "Product catalog with filtering",
          "Shopping cart functionality",
          "User account management",
          "Responsive design",
          "Payment gateway integration"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap"],
      images: [
          "images/portfolio2.png",
          "images/p2.png",
          "images/p3.png"
      ],
      liveUrl: "https://lugx-gaming-site.vercel.app/",
      codeUrl: "https://github.com/yourusername/gaming-ecommerce"
  },
  design: {
      title: "Brand Identity Design",
      category: "Design",
      date: "2023",
      description: "Complete brand identity package including logo design, business cards, and social media graphics for various clients.",
      features: [
          "Logo design and variations",
          "Business card layouts",
          "Social media templates",
          "Brand color palette",
          "Typography selection"
      ],
      technologies: ["Photoshop", "Illustrator", "Figma", "InDesign"],
      images: [
          "images/p1.png",
          "images/portfolio3.png",
          "images/p4.png",
          "images/p5.png"
      ],
      liveUrl: "https://www.pinterest.com/adedarapsalmuel/_pins/",
      codeUrl: "#"
  },
  portfolio: {
      title: "Personal Portfolio Website",
      category: "Web Development",
      date: "2024",
      description: "A responsive personal portfolio website showcasing development skills, projects, and design work with modern animations.",
      features: [
          "Responsive design",
          "GSAP animations",
          "Interactive portfolio gallery",
          "Contact form integration",
          "Modern UI/UX design"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "GSAP", "EmailJS"],
      images: [
          "images/p2.png",
          "images/portfolio1.png",
          "images/portfolio4.png"
      ],
      liveUrl: "#",
      codeUrl: "#"
  },
  studentacademic: {
      title: "Student Academic Management System",
      category: "Web Application",
      date: "2024",
      description: "A comprehensive system for managing student academic records and administrative tasks",
      features: [
          "Student registration",
          "Course management",
          "Grade tracking",
          "Admin dashboard"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Firebase"],
      images: [
          "images/prt2.png",
          "images/pt2.1.png",
          "images/pt2.2.png",
          "images/pt2.3.png",
          "images/pt2.4.png"
      ],
      liveUrl: "https://student-academic-system25.netlify.app/",
      codeUrl: "https://github.com/Adedara-samuel/Student-Academic-Management-System"
  }
};

portfolioModals.forEach(modal => {
  modal.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.getAttribute('data-project');
      const project = projects[projectId];
      
      if (project) {
          // Update modal content
          document.querySelector('.modal-title').textContent = project.title;
          document.querySelector('.modal-category').textContent = project.category;
          document.querySelector('.modal-date').textContent = project.date;
          document.querySelector('.modal-description p').textContent = project.description;
          
          // Update features list
          const featuresList = document.querySelector('.features-list');
          featuresList.innerHTML = '';
          project.features.forEach(feature => {
              featuresList.innerHTML += `<li>${feature}</li>`;
          });
          
          // Update technologies
          const techTags = document.querySelector('.tech-tags');
          techTags.innerHTML = '';
          project.technologies.forEach(tech => {
              techTags.innerHTML += `<span>${tech}</span>`;
          });
          
          // Update gallery
          const modalGallery = document.querySelector('.modal-gallery');
          modalGallery.innerHTML = '';
          project.images.forEach(image => {
              modalGallery.innerHTML += `
                  <div class="slide">
                      <img src="${image}" alt="${project.title}">
                  </div>
              `;
          });
          
          // Update links
          const liveDemoBtn = document.getElementById('liveDemoBtn');
          const sourceCodeBtn = document.getElementById('sourceCodeBtn');
          
          liveDemoBtn.setAttribute('href', project.liveUrl);
          sourceCodeBtn.setAttribute('href', project.codeUrl);
          
          // Show modal
          projectModal.classList.add('active');
          document.body.style.overflow = 'hidden';
      }
  });
});

// Close modal
modalClose.addEventListener('click', function() {
  projectModal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
projectModal.addEventListener('click', function(e) {
  if (e.target === this) {
      projectModal.classList.remove('active');
      document.body.style.overflow = 'auto';
  }
});

// Image slider functionality for modal
let currentSlide = 0;

function showSlide(n) {
  const slides = document.querySelectorAll('.slide');
  
  if (n >= slides.length) {
      currentSlide = 0;
  } else if (n < 0) {
      currentSlide = slides.length - 1;
  } else {
      currentSlide = n;
  }
  
  slides.forEach(slide => {
      slide.style.display = 'none';
  });
  
  if (slides[currentSlide]) {
      slides[currentSlide].style.display = 'block';
  }
}

// Initialize slider when modal opens
projectModal.addEventListener('click', function(e) {
  if (e.target.classList.contains('portfolio-more')) {
      showSlide(currentSlide);
  }
});

// Next/previous controls
function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Initialize a simple testimonial slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Add navigation buttons or auto-rotation
setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}, 5000);

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

lazyImages.forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
    // If already loaded
    if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
    }
});

// Initial display
showTestimonial(0);
