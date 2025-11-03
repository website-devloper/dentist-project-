// Main JavaScript file for the dental clinic website
// This file handles interactivity and functionality for the website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Example: Toggle mobile navigation
    const navToggle = document.querySelector('.navbar-toggler');
    const navMenu = document.querySelector('.navbar-collapse');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Example: Initialize AOS (Animate On Scroll) if included
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800, // Animation duration
            easing: 'ease-in-out', // Easing function
            once: true // Whether animation should happen only once
        });
    }
});