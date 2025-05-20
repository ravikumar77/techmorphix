document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Services Carousel
    initServicesCarousel();
    
    // Testimonial slider functionality
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (testimonialSlides.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        
        // Initialize first slide
        testimonialSlides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
        });
        
        // Set up dot click events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                goToSlide(index);
            });
        });
        
        // Auto rotate testimonials
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            goToSlide(currentSlide);
        }, 8000);
        
        function goToSlide(slideIndex) {
            // Hide all slides
            testimonialSlides.forEach((slide, index) => {
                slide.style.display = 'none';
            });
            
            // Remove active class from all dots
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
            });
            
            // Show selected slide and activate corresponding dot
            testimonialSlides[slideIndex].style.display = 'block';
            dots[slideIndex].classList.add('active');
            
            currentSlide = slideIndex;
        }
    }
    
    // Project filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        const categories = card.getAttribute('data-category').split(' ');
                        if (categories.includes(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                
                // Toggle active class on the FAQ item
                faqItem.classList.toggle('active');
                
                // Toggle icon
                const icon = this.querySelector('i');
                if (icon) {
                    if (faqItem.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        });
    }
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value.trim())) {
                        isValid = false;
                        field.classList.add('error');
                    }
                }
            });
            
            if (isValid) {
                // Normally would submit the form here, but for demo purposes:
                alert('Form submitted successfully! We will contact you shortly.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Sticky header effect on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Services Carousel function
    function initServicesCarousel() {
        // Initialize all carousels
        initCarousel('.carousel-track', '.carousel-slide', '.carousel-dots .dot', '.prev-btn', '.next-btn');
        initCarousel('.dev-carousel .carousel-track', '.dev-carousel .carousel-slide', '.dev-carousel .carousel-dots .dot', '.dev-carousel .prev-btn', '.dev-carousel .next-btn');
        
        // Initialize Hero Carousel if it exists
        initHeroCarousel();
    }
    
    function initCarousel(trackSelector, slideSelector, dotSelector, prevSelector, nextSelector) {
        const carouselTrack = document.querySelector(trackSelector);
        const slides = document.querySelectorAll(slideSelector);
        const dots = document.querySelectorAll(dotSelector);
        const prevButton = document.querySelector(prevSelector);
        const nextButton = document.querySelector(nextSelector);
        
        if (!carouselTrack || slides.length === 0) {
            return; // Exit if carousel elements don't exist
        }
        
        let currentSlide = 0;
        const slideWidth = 100; // 100% width
        
        // Set initial position
        updateCarousel();
        
        // Add event listeners for navigation
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                updateCarousel();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % slides.length;
                updateCarousel();
            });
        }
        
        // Add event listeners for dots
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    currentSlide = index;
                    updateCarousel();
                });
            });
        }
        
        // Set up auto-rotation
        let carouselInterval = setInterval(autoRotate, 6000);
        
        // Pause rotation on hover
        const carousel = document.querySelector('.services-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', function() {
                clearInterval(carouselInterval);
            });
            
            carousel.addEventListener('mouseleave', function() {
                carouselInterval = setInterval(autoRotate, 6000);
            });
        }
        
        // Auto-rotate function
        function autoRotate() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }
        
        // Update carousel position and active indicators
        function updateCarousel() {
            // Move slide track
            carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            
            // Update active dot
            if (dots.length > 0) {
                dots.forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
    }
    
    // Hero Carousel functionality
    function initHeroCarousel() {
        const heroTrack = document.querySelector('.hero-carousel-track');
        const heroSlides = document.querySelectorAll('.hero-slide');
        const heroIndicators = document.querySelectorAll('.hero-indicator');
        
        if (!heroTrack || heroSlides.length === 0) {
            return; // Exit if elements don't exist
        }
        
        let currentHeroSlide = 0;
        const totalSlides = heroSlides.length;
        
        // Set up auto-rotation
        let heroInterval = setInterval(rotateHeroSlides, 4000);
        
        // Add click events to indicators
        if (heroIndicators.length > 0) {
            heroIndicators.forEach((indicator, index) => {
                indicator.addEventListener('click', function() {
                    currentHeroSlide = index;
                    updateHeroCarousel();
                });
            });
        }
        
        // Auto-rotate function
        function rotateHeroSlides() {
            currentHeroSlide = (currentHeroSlide + 1) % totalSlides;
            updateHeroCarousel();
        }
        
        // Update hero carousel position and active indicators
        function updateHeroCarousel() {
            // Update slides 
            heroTrack.style.transform = `translateX(-${currentHeroSlide * (100 / totalSlides)}%)`;
            
            // Update active indicator
            heroIndicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentHeroSlide);
            });
        }
        
        // Initialize with the first slide active
        updateHeroCarousel();
    }
});
