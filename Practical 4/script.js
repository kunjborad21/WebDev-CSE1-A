document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Light/Dark Theme Switcher
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    
    // Check localStorage for theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    // 3. Modal Popup
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const openModalBtn = document.querySelector('#open-modal');

    // Show modal on first visit for home page
    if (modalOverlay && window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        if (!sessionStorage.getItem('welcomeShown')) {
            setTimeout(() => {
                modalOverlay.classList.add('show');
                sessionStorage.setItem('welcomeShown', 'true');
            }, 1000);
        }
    }

    if (openModalBtn && modalOverlay) {
        openModalBtn.addEventListener('click', () => {
            modalOverlay.classList.add('show');
        });
    }

    if (modalClose && modalOverlay) {
        modalClose.addEventListener('click', () => {
            modalOverlay.classList.remove('show');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('show');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modalOverlay.classList.remove('show');
            }
        });
    }

    // 4. Content Slider
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;
        let slideInterval;

        function updateSlider() {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

        function startInterval() {
            slideInterval = setInterval(nextSlide, 4000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            sliderContainer.addEventListener('mouseleave', startInterval);
        }

        startInterval();
    }

    // 5. Collapsible FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all
                faqItems.forEach(faq => faq.classList.remove('active'));

                // Toggle clicked
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // 6. Notification Banner
    const banner = document.querySelector('.notification-banner');
    const bannerClose = document.querySelector('.banner-close');

    if (banner) {
        const isDismissed = sessionStorage.getItem('bannerDismissed');
        if (!isDismissed) {
            banner.classList.add('show');
        }

        if (bannerClose) {
            bannerClose.addEventListener('click', () => {
                banner.classList.remove('show');
                sessionStorage.setItem('bannerDismissed', 'true');
            });
        }
    }
});
