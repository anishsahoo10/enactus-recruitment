// Enactus Jain University - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navContainer = document.getElementById('navContainer');
  
  if (menuToggle && navContainer) {
    menuToggle.addEventListener('click', () => {
      navContainer.classList.toggle('mobile-open');
    });

    navContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navContainer.classList.remove('mobile-open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
        navContainer.classList.remove('mobile-open');
      }
    });
  }

  // Projects Category Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Animated Numbers Counter with Intersection Observer
  const statElements = document.querySelectorAll('[data-target]');
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (statsAnimated) return;
    if (entries.some(entry => entry.isIntersecting)) {
      statsAnimated = true;
      statElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1600;
        const startTimestamp = performance.now();

        const step = (now) => {
          const progress = Math.min((now - startTimestamp) / duration, 1);
          const currentVal = Math.floor((1 - Math.pow(1 - progress, 3)) * target);
          el.innerHTML = currentVal.toLocaleString() + '<span>+</span>';
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      });
    }
  }, { threshold: 0.2 });

  if (statElements.length > 0) {
    statsObserver.observe(statElements[0].closest('div'));
  }
});
