// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuButton = document.getElementById('mobile-menu-button');

    if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
        mobileMenu.classList.add('hidden');
    }
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
        }
    });
});

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

// Time slot selection
document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', function () {
        // Remove selected class from all time slots
        document.querySelectorAll('.time-slot').forEach(s => {
            s.classList.remove('selected');
        });

        // Add selected class to clicked time slot
        this.classList.add('selected');
    });
});

// Date selection
document.querySelectorAll('.text-gray-800.py-2').forEach(date => {
    if (!date.classList.contains('bg-blue-100')) {
        date.addEventListener('click', function () {
            // Remove background from all dates
            document.querySelectorAll('.text-gray-800.py-2').forEach(d => {
                d.classList.remove('bg-blue-100', 'rounded-full', 'font-medium');
            });

            // Add background to clicked date
            this.classList.add('bg-blue-100', 'rounded-full', 'font-medium');
        });
    }
});

// Testimonial Swiper
var swiper = new Swiper('.testimonial-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    }
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        // Check if item should be open by default
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.paddingTop = '1rem';
            icon.classList.add('rotate-180');
        } else {
            answer.style.maxHeight = 0;
            answer.style.paddingTop = 0;
            answer.style.overflow = 'hidden';
        }

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = 0;
                    otherItem.querySelector('.faq-answer').style.paddingTop = 0;
                    otherItem.querySelector('.faq-question i').classList.remove('rotate-180');
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.paddingTop = '1rem';
                icon.classList.add('rotate-180');
            } else {
                item.classList.remove('active');
                answer.style.maxHeight = 0;
                answer.style.paddingTop = 0;
                icon.classList.remove('rotate-180');
            }
        });
    });
});
