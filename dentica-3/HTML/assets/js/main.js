// Initialize AOS (removed duplicate initialization)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight || 80;
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Generic number counter animation
function animateCounter(element, finalValue, duration = 2000) {
    if (!element) return;
    
    const startValue = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        let currentValue;
        if (element.id === 'rating-counter' || element.textContent.includes('.')) {
            currentValue = Number((startValue + progress * (finalValue - startValue)).toFixed(1));
            element.textContent = currentValue;
        } else if (element.textContent.includes('%')) {
            currentValue = Math.floor(startValue + progress * (finalValue - startValue));
            element.textContent = currentValue + '%';
        } else if (element.textContent.includes('min')) {
            currentValue = Math.floor(startValue + progress * (finalValue - startValue));
            element.textContent = currentValue + 'min';
        } else if (element.textContent.includes('/')) {
            currentValue = Math.floor(startValue + progress * (finalValue - startValue));
            element.textContent = currentValue + '/7';
        } else {
            currentValue = Math.floor(startValue + progress * (finalValue - startValue));
            element.textContent = currentValue.toLocaleString() + '+';
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer to trigger counters when in view
function initCounters() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    // About section counters
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(document.getElementById('years-counter'), 15, 1500);
                animateCounter(document.getElementById('patients-counter'), 5000, 2000);
                animateCounter(document.getElementById('rating-counter'), 4.9, 1800);
                aboutObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Work process counters
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.counter').forEach(counter => {
                    let finalValue;
                    if (counter.textContent.includes('15min')) {
                        finalValue = 15;
                    } else if (counter.textContent.includes('98%')) {
                        finalValue = 98;
                    } else if (counter.textContent.includes('24/7')) {
                        finalValue = 24;
                    } else {
                        finalValue = 5000;
                    }
                    animateCounter(counter, finalValue);
                });
                processObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    const aboutSection = document.getElementById('about');
    const workProcessSection = document.getElementById('work-process');
    
    if (aboutSection) aboutObserver.observe(aboutSection);
    if (workProcessSection) processObserver.observe(workProcessSection);
}

// Form submission handler
function initForms() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            console.log('Form submitted:', data);

            // Show success message (you might want to use a toast instead)
            alert('Thank you for your message! We will get back to you soon.');

            // Reset form
            this.reset();
        });
    });
}

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function () {
                this.classList.add('loaded');
            });
            img.addEventListener('error', function () {
                console.warn('Image failed to load:', this.src);
            });
        }
    });
}

// Navbar background change on scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    // Use throttling for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    updateNavbar();
}

// Watch video button functionality
function initVideoButton() {
    const videoBtn = document.querySelector('.btn-outline-primary');
    if (videoBtn) {
        videoBtn.addEventListener('click', function () {
            // You can implement a modal or lightbox here
            alert('Video player would open here in a real implementation.');
        });
    }
}

// Initialize tooltips
function initTooltips() {
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }
}

// Main initialization function
function init() {
    initAOS();
    initSmoothScrolling();
    initCounters();
    initForms();
    initImageLoading();
    initNavbarScroll();
    initVideoButton();
    initTooltips();
}

// Service Tab Switcher (Premium)
window.openServiceTab = function(evt, tabName) {
    // Get all elements with class="premium-tab-pane" and hide them
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("premium-tab-pane");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Get all elements with class="premium-tab-link" and remove the class "active"
    tablinks = document.getElementsByClassName("premium-tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    var selectedTab = document.getElementById(tabName);
    selectedTab.style.display = "block";
    
    // Small delay to allow display:block to apply before adding active class for animation
    setTimeout(() => {
        selectedTab.classList.add("active");
    }, 10);
    
    evt.currentTarget.classList.add("active");
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for potential module use (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        animateCounter,
        initSmoothScrolling,
        initCounters
    };
}