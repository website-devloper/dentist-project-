// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Number counter animation
function animateCounter(elementId, finalValue, duration = 2000) {
    const element = document.getElementById(elementId);
    const startValue = 0;
    const increment = finalValue / (duration / 16); // 60fps
    
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            clearInterval(timer);
            currentValue = finalValue;
        }
        
        if (elementId === 'rating-counter') {
            element.textContent = currentValue.toFixed(1);
        } else {
            element.textContent = Math.floor(currentValue).toLocaleString() + '+';
        }
    }, 16);
}

// Intersection Observer to trigger counters when in view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start counters with different durations for variety
            animateCounter('years-counter', 15, 1500);
            animateCounter('patients-counter', 5000, 2000);
            animateCounter('rating-counter', 4.9, 1800);
            
            // Stop observing after animation starts
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe the about section
const aboutSection = document.getElementById('about');
if (aboutSection) {
    observer.observe(aboutSection);
}

// Form submission handler
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.classList.add('loaded');
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Watch video button functionality
document.querySelector('.btn-outline-primary').addEventListener('click', function() {
    alert('Video player would open here in a real implementation.');
});

// Initialize tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));