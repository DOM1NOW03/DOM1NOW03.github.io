// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page loader
    initPageLoader();

    // Initialize hero slider - improved version
    initHeroSlider();

    // Mobile Navigation
    initMobileNavigation();

    // Smooth Scrolling
    initSmoothScrolling();

    // Scroll Animations
    initScrollAnimations();

    // Counter Animations
    initCounterAnimations();

    // Forms
    initForms();

    // 3D Tilt Effects
    init3DTiltEffects();

    // Ripple Effects
    initRippleEffects();

    // Active Navigation
    initActiveNavigation();

    // Header Scroll Effects
    initHeaderScrollEffects();

    // Scroll to Top Button
    initScrollToTop();

    // FAQ Accordion
    initFAQAccordion();

    // Testimonials Carousel (wait for Swiper.js to load)
    if (typeof Swiper !== 'undefined') {
        initTestimonialsCarousel();
    } else {
        // Retry after a short delay if Swiper is not yet loaded
        setTimeout(() => {
            if (typeof Swiper !== 'undefined') {
                initTestimonialsCarousel();
            }
        }, 500);
    }

    // Lazy Loading
    initLazyLoading();

    // Scroll to Top on Logo Click
    initLogoScroll();

    // Keyboard Navigation
    initKeyboardNavigation();

    // Touch/Swipe Support
    initTouchSupport();

    // ===== NOVÉ: Theme Toggle =====
    initThemeToggle();
});

// ===== NOVÁ FUNKCE: Theme Toggle =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    if (!themeToggle || !themeIcon) {
        console.warn('Theme toggle elements not found');
        return;
    }

    // Načtení uloženého motivu z localStorage
    const savedTheme = localStorage.getItem('gakeb-theme') || 'light';
    setTheme(savedTheme);

    // Event listener pro kliknutí na toggle
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const currentTheme = body.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        setTheme(newTheme);

        // Uložení do localStorage
        localStorage.setItem('gakeb-theme', newTheme);

        // Vizuální feedback
        createThemeToggleRipple(e);

        console.log(`Theme changed to: ${newTheme}`);
    });

    // Keyboard support
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });

    // Funkce pro nastavení motivu
    function setTheme(theme) {
        body.setAttribute('data-color-scheme', theme);

        // Aktualizace ikony a aria-label
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Přepnout na světlý motiv');
            themeToggle.setAttribute('title', 'Přepnout na světlý motiv');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Přepnout na tmavý motiv');
            themeToggle.setAttribute('title', 'Přepnout na tmavý motiv');
        }

        // Dispatch custom event pro další komponenty
        const themeChangeEvent = new CustomEvent('themeChanged', {
            detail: { theme: theme }
        });
        document.dispatchEvent(themeChangeEvent);
    }

    // Vizuální ripple efekt pro theme toggle
    function createThemeToggleRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: var(--color-primary);
            opacity: 0.3;
            transform: scale(0);
            animation: themeRipple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;

        button.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }

    console.log('Theme toggle initialized');
}

// Page Loader
function initPageLoader() {
    const loader = document.getElementById('pageLoader');

    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Start hero slider after loader
            setTimeout(() => {
                const slider = document.querySelector('.hero-slider-instance');
                if (slider && slider.heroSlider) {
                    slider.heroSlider.start();
                }
            }, 500);
        }, 1000);
    });
}

// Mobile Navigation - Enhanced and fixed implementation
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    if (!navToggle || !navMenu) {
        console.warn('Mobile navigation elements not found');
        return;
    }

    let isMenuOpen = false;

    // Toggle menu function
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            // Open menu
            navToggle.classList.add('active');
            navMenu.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            // Close menu
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    }

    // Close menu function
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    }

    // Toggle button click handler
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);

        if (!isClickInsideNav && isMenuOpen) {
            closeMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (!scrollToTopBtn) return;

    // Show/hide button based on scroll position
    function handleScroll() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    // Throttled scroll event
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll);

    // Click event
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// FAQ Accordion
function initFAQAccordion() {
    const faqButtons = document.querySelectorAll('.faq-question');

    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const targetId = this.getAttribute('aria-controls');
            const targetContent = document.getElementById(targetId);

            if (!targetContent) return;

            // Close all other FAQ items
            faqButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    otherButton.setAttribute('aria-expanded', 'false');
                    const otherId = otherButton.getAttribute('aria-controls');
                    const otherContent = document.getElementById(otherId);
                    if (otherContent) {
                        otherContent.classList.remove('active');
                    }
                }
            });

            // Toggle current item
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                targetContent.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                targetContent.classList.add('active');
            }
        });

        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Testimonials Carousel - Enhanced implementation
function initTestimonialsCarousel() {
    const swiperContainer = document.querySelector('.testimonials-swiper');

    if (!swiperContainer) {
        console.warn('Testimonials swiper container not found');
        return;
    }

    try {
        const swiper = new Swiper('.testimonials-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            effect: 'slide',
            speed: 600,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            },
            // Enhanced accessibility
            a11y: {
                enabled: true,
                prevSlideMessage: 'Předchozí testimonial',
                nextSlideMessage: 'Další testimonial',
                paginationBulletMessage: 'Přejít na testimonial {{index}}'
            },
            // On initialization
            on: {
                init: function() {
                    console.log('Testimonials carousel initialized successfully');
                }
            }
        });

        // Store swiper instance for external access
        window.testimonialsSwiper = swiper;

    } catch (error) {
        console.error('Error initializing testimonials carousel:', error);
        // Fallback: at least show all testimonials if Swiper fails
        swiperContainer.style.overflow = 'visible';
    }
}

// Lazy Loading
function initLazyLoading() {
    // Intersection Observer for images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-load');
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    // Observe images with data-src
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        img.classList.add('lazy-load');
        imageObserver.observe(img);
    });

    // Background images
    const backgroundObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (element.dataset.bg) {
                    element.style.backgroundImage = `url(${element.dataset.bg})`;
                    element.classList.add('loaded');
                }
                observer.unobserve(element);
            }
        });
    }, {
        rootMargin: '50px'
    });

    const lazyBackgrounds = document.querySelectorAll('[data-bg]');
    lazyBackgrounds.forEach(bg => {
        bg.classList.add('lazy-load');
        backgroundObserver.observe(bg);
    });
}

// Hero Slider - Improved and fixed implementation
let heroSliderInstance = null;

function initHeroSlider() {
    const sliderContainer = document.getElementById('sliderContainer');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const progressBar = document.getElementById('progressBar');

    if (!sliderContainer || slides.length === 0) {
        console.warn('Hero slider elements not found');
        return;
    }

    let currentSlide = 0;
    let isAutoPlaying = true;
    let autoPlayInterval = null;
    let progressInterval = null;
    const slideDuration = 6000; // 6 seconds
    let isTransitioning = false;

    // Enhanced slider object with better error handling
    heroSliderInstance = {
        currentSlide: 0,
        totalSlides: slides.length,
        isPlaying: false,
        isTransitioning: false,

        start() {
            if (this.isPlaying) return;
            this.isPlaying = true;
            this.autoPlay();
            console.log('Hero slider started');
        },

        stop() {
            this.isPlaying = false;
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
            if (progressInterval) {
                clearInterval(progressInterval);
                progressInterval = null;
            }
        },

        goToSlide(index, userInitiated = false) {
            if (this.isTransitioning || index === currentSlide) return;

            this.isTransitioning = true;
            isTransitioning = true;

            // Validate index
            if (index < 0) index = this.totalSlides - 1;
            if (index >= this.totalSlides) index = 0;

            // Stop current autoplay
            this.stop();

            // Animate to new slide
            goToSlide(index);

            // Restart autoplay after transition if not user initiated
            setTimeout(() => {
                this.isTransitioning = false;
                isTransitioning = false;

                if (isAutoPlaying && !userInitiated) {
                    setTimeout(() => this.start(), 500);
                }
            }, 1000);
        },

        next(userInitiated = false) {
            this.goToSlide((currentSlide + 1) % this.totalSlides, userInitiated);
        },

        prev(userInitiated = false) {
            this.goToSlide((currentSlide - 1 + this.totalSlides) % this.totalSlides, userInitiated);
        },

        autoPlay() {
            if (!this.isPlaying || isTransitioning) return;

            // Clear existing intervals
            if (autoPlayInterval) clearInterval(autoPlayInterval);
            if (progressInterval) clearInterval(progressInterval);

            // Start progress bar animation
            updateProgressBar();

            // Set next slide interval
            autoPlayInterval = setInterval(() => {
                if (this.isPlaying && !isTransitioning) {
                    this.next(false);
                }
            }, slideDuration);
        }
    };

    function goToSlide(index) {
        try {
            // Remove active class from current slide and dot
            if (slides[currentSlide]) {
                slides[currentSlide].classList.remove('active');
            }
            if (dots[currentSlide]) {
                dots[currentSlide].classList.remove('active');
            }

            // Update current slide index
            currentSlide = index;
            heroSliderInstance.currentSlide = index;

            // Add active class to new slide and dot
            if (slides[currentSlide]) {
                slides[currentSlide].classList.add('active');
            }
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }

            // Reset animations for slide content
            const slideContent = slides[currentSlide]?.querySelectorAll('.slide-title, .slide-subtitle, .slide-description, .slide-cta');
            if (slideContent) {
                slideContent.forEach((element) => {
                    if (element) {
                        element.style.animation = 'none';
                        element.offsetHeight; // Trigger reflow
                        element.style.animation = '';
                    }
                });
            }

            // Reset progress bar
            if (progressBar) {
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none';
                setTimeout(() => {
                    if (progressBar) {
                        progressBar.style.transition = `width ${slideDuration}ms linear`;
                    }
                }, 50);
            }
        } catch (error) {
            console.error('Error in goToSlide:', error);
        }
    }

    function updateProgressBar() {
        if (!progressBar || !heroSliderInstance.isPlaying) return;

        if (progressInterval) clearInterval(progressInterval);

        progressBar.style.width = '0%';
        progressBar.style.transition = `width ${slideDuration}ms linear`;

        // Smooth progress animation
        setTimeout(() => {
            if (progressBar && heroSliderInstance.isPlaying && !isTransitioning) {
                progressBar.style.width = '100%';
            }
        }, 50);
    }

    // Event listeners with error handling
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) {
                heroSliderInstance.prev(true);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) {
                heroSliderInstance.next(true);
            }
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) {
                heroSliderInstance.goToSlide(index, true);
            }
        });
    });

    // Improved hover controls
    let hoverTimeout;
    sliderContainer.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        isAutoPlaying = false;
        heroSliderInstance.stop();
    });

    sliderContainer.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            if (!isTransitioning) {
                isAutoPlaying = true;
                heroSliderInstance.start();
            }
        }, 1000);
    });

    // Store instance for external access
    sliderContainer.classList.add('hero-slider-instance');
    sliderContainer.heroSlider = heroSliderInstance;

    console.log('Hero slider initialized with', slides.length, 'slides');
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    const ctaButtons = document.querySelectorAll('a[href^="#"]');

    [...navLinks, ...ctaButtons].forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Trigger counter animations
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }

                // Stagger animations for service cards
                if (entry.target.classList.contains('services__grid')) {
                    const cards = entry.target.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 100);
                    });
                }

                // Stagger animations for features
                if (entry.target.classList.contains('about__features')) {
                    const features = entry.target.querySelectorAll('.feature');
                    features.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.classList.add('animate');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll('.scroll-animate, .services__grid, .about__features');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Counter Animations
function initCounterAnimations() {
    // This will be triggered by the scroll animation observer
}

function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    const targetNumber = parseInt(element.getAttribute('data-number'));
    const suffix = element.getAttribute('data-suffix') || '';

    if (!numberElement || !targetNumber) return;

    let currentNumber = 0;
    const increment = targetNumber / 60; // Animation duration ~1 second at 60fps
    const timer = setInterval(() => {
        currentNumber += increment;

        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }

        numberElement.textContent = Math.floor(currentNumber) + suffix;
    }, 16); // ~60fps
}

// Forms
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Subsidy Form
    const subsidyForm = document.getElementById('subsidyForm');
    if (subsidyForm) {
        subsidyForm.addEventListener('submit', handleSubsidyForm);
    }

    // Form Validation
    initFormValidation();

    // Phone Number Formatting
    initPhoneFormatting();
}

// Handle Contact Form Submission
function handleContactForm(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');

    // Validate form
    if (!validateForm(form)) {
        return;
    }

    // Show loading state
    setLoadingState(submitButton, true);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset loading state
        setLoadingState(submitButton, false);

        // Show success message
        showFormMessage(form, 'Děkujeme za vaši poptávku! Ozveme se vám co nejdříve.', 'success');

        // Reset form
        form.reset();
    }, 2000);
}

// Handle Subsidy Form Submission
function handleSubsidyForm(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');

    // Validate form
    if (!validateForm(form)) {
        return;
    }

    // Show loading state
    setLoadingState(submitButton, true);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset loading state
        setLoadingState(submitButton, false);

        // Show success message
        showFormMessage(form, 'Děkujeme za zájem o dotace! Kontaktujeme vás s dalšími informacemi.', 'success');

        // Reset form
        form.reset();
    }, 2000);
}

// Form Validation
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        const value = field.value.trim();

        // Remove previous error states
        field.classList.remove('error');

        if (!value) {
            field.classList.add('error');
            isValid = false;
        } else {
            // Specific validation for different field types
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    field.classList.add('error');
                    isValid = false;
                }
            }

            if (field.type === 'tel') {
                const phoneRegex = /^(\+420|420)?[0-9\s\-]{9,}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    field.classList.add('error');
                    isValid = false;
                }
            }
        }
    });

    if (!isValid) {
        showFormMessage(form, 'Prosím vyplňte všechna povinná pole správně.', 'error');
    }

    return isValid;
}

// Initialize Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const fields = form.querySelectorAll('input, textarea, select');

        fields.forEach(field => {
            // Real-time validation
            field.addEventListener('blur', function() {
                validateField(this);
            });

            // Remove error state on input
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                }
            });

            // Enhanced focus effects
            field.addEventListener('focus', function() {
                this.parentElement?.classList.add('focused');
            });

            field.addEventListener('blur', function() {
                this.parentElement?.classList.remove('focused');
            });
        });
    });
}

// Validate Individual Field
function validateField(field) {
    const value = field.value.trim();

    field.classList.remove('error');

    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        return false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }

    if (field.type === 'tel' && value) {
        const phoneRegex = /^(\+420|420)?[0-9\s\-]{9,}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            field.classList.add('error');
            return false;
        }
    }

    return true;
}

// Phone Number Formatting
function initPhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');

            // Czech phone number formatting
            if (value.startsWith('420')) {
                value = value.substring(3);
            }

            if (value.length <= 9) {
                // Format as XXX XXX XXX
                value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
            }

            e.target.value = value.trim();
        });
    });
}

// 3D Tilt Effects
function init3DTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
    });
}

function handleTilt(e) {
    const element = e.target.closest('[data-tilt]');
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
}

function resetTilt(e) {
    const element = e.target.closest('[data-tilt]');
    if (element) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    }
}

// Ripple Effects
function initRippleEffects() {
    const rippleButtons = document.querySelectorAll('.ripple-effect');

    rippleButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

function createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;

    button.appendChild(ripple);

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    const throttledUpdateNav = throttle(updateActiveNav, 100);
    window.addEventListener('scroll', throttledUpdateNav);
    updateActiveNav(); // Initial call
}

// Header Scroll Effects
function initHeaderScrollEffects() {
    const header = document.querySelector('.header');
    if (!header) return;

    const handleScroll = throttle(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 10);

    window.addEventListener('scroll', handleScroll);
}

// Logo Scroll to Top
function initLogoScroll() {
    const logo = document.querySelector('.nav__brand');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (!heroSliderInstance || isTransitioning) return;

        // Only handle keyboard events when focused on slider
        if (e.target.closest('.hero-slider')) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    heroSliderInstance.prev(true);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    heroSliderInstance.next(true);
                    break;
                case ' ':
                    e.preventDefault();
                    if (heroSliderInstance.isPlaying) {
                        heroSliderInstance.stop();
                    } else {
                        heroSliderInstance.start();
                    }
                    break;
            }
        }
    });
}

// Touch/Swipe Support
function initTouchSupport() {
    const sliderContainer = document.getElementById('sliderContainer');
    if (!sliderContainer) return;

    let startX = 0;
    let startY = 0;
    let isScrolling = null;

    sliderContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isScrolling = null;
    }, { passive: true });

    sliderContainer.addEventListener('touchmove', function(e) {
        if (!startX || !startY) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const diffX = Math.abs(startX - currentX);
        const diffY = Math.abs(startY - currentY);

        if (isScrolling === null) {
            isScrolling = diffY > diffX;
        }

        if (!isScrolling) {
            e.preventDefault(); // Prevent scrolling when swiping horizontally
        }
    }, { passive: false });

    sliderContainer.addEventListener('touchend', function(e) {
        if (isScrolling || !startX || isTransitioning) return;

        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                heroSliderInstance.next(true);
            } else {
                heroSliderInstance.prev(true);
            }
        }

        startX = 0;
        startY = 0;
    }, { passive: true });
}

// Utility Functions
function setLoadingState(button, isLoading) {
    if (!button) return;

    if (isLoading) {
        button.disabled = true;
        button.classList.add('loading');
        button.setAttribute('data-original-text', button.textContent);
        button.textContent = 'Odesílám...';
    } else {
        button.disabled = false;
        button.classList.remove('loading');
        button.textContent = button.getAttribute('data-original-text') || button.textContent;
    }
}

function showFormMessage(form, message, type) {
    if (!form) return;

    // Remove existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type} show`;
    messageElement.textContent = message;

    // Insert message after form
    form.parentNode.insertBefore(messageElement, form.nextSibling);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 300);
    }, 5000);
}

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for ripple animation dynamically
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes themeRipple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .form-group.focused .form-label {
        color: var(--color-primary);
        transform: translateY(-2px);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleCSS;
document.head.appendChild(styleSheet);

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`%c🏠 GAKEB s.r.o. - Verze s theme toggle načtena za ${Math.round(loadTime)}ms`, 'color: #007bff; font-weight: bold;');
});

// Error handling for missing elements (graceful degradation)
window.addEventListener('error', function(e) {
    console.warn('Non-critical error caught:', e.message);
    // Continue execution without breaking the page
});

// Export functions for potential external use
window.GAKEBWebsite = {
    heroSlider: heroSliderInstance,
    testimonialsSwiper: null,
    showFormMessage,
    validateForm,
    setLoadingState,
    animateCounter,
    initFAQAccordion,
    initTestimonialsCarousel,
    initThemeToggle // Nová funkce pro externí použití
};

// Console welcome message
console.log(`
%c🏠 GAKEB s.r.o. - Verze s theme toggle
%c📞 Kontakt: +420 775 071 420
%c✉️  Email: gakeb@seznam.cz
%c🌐 Design s logem a přepínáním motivu úspěšně načten!
%c✨ NOVÉ: Theme toggle, firemní logo, localStorage podpora
`, 
'color: #007bff; font-weight: bold; font-size: 16px;',
'color: #6c757d; font-size: 14px;',
'color: #6c757d; font-size: 14px;',
'color: #007bff; font-size: 14px;',
'color: #28a745; font-size: 12px;'
);