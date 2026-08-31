document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggler
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
      } else {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
      }
    });
  }

  // Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Notification Banner Close
  const closeBanner = document.getElementById('closeBanner');
  const notificationBanner = document.getElementById('notificationBanner');
  if (closeBanner && notificationBanner) {
    closeBanner.addEventListener('click', () => {
      notificationBanner.style.display = 'none';
    });
  }

  // Modal Functionality
  const modals = document.querySelectorAll('.modal');
  const closeBtns = document.querySelectorAll('.close-modal');

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(modal => modal.style.display = 'none');
    });
  });

  window.addEventListener('click', (e) => {
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

  // Slider
  const slidesContainer = document.querySelector('.slides');
  if (slidesContainer) {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    function showSlide(index) {
      if (index < 0) currentIndex = slides.length - 1;
      else if (index >= slides.length) currentIndex = 0;
      else currentIndex = index;
      
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    }
    
    // Auto slide
    setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);
  }

  // FAQ Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isActive = content.style.maxHeight;
      
      // Close all
      document.querySelectorAll('.accordion-content').forEach(item => {
        item.style.maxHeight = null;
      });
      
      if (!isActive) {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
