/**
 * ===================================================
 * SCRIPT PRINCIPAL - CECyTEM PLANTEL ACULCO
 * ===================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBackToTop();
  initSmoothScroll();
  initCounters();
  initGalleryFilter();
  initLightbox();
  initContactForm();
  initDarkMode();
  initScrollAnimations();
  initLazyLoad();
  initTooltips();
  initNavMascot();
});

// ==========================================
// 1. NAVBAR CON EFECTO SCROLL Y DROPDOWN MÓVIL CORREGIDO
// ==========================================
function initNavbar() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  // Efecto de scroll en el navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Resaltar enlace activo según la sección
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href.substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // --- CORRECCIÓN CLAVE PARA EL DROPDOWN EN MÓVIL ---
  const navCollapse = document.getElementById('navbarMenu');
  
  if (navCollapse) {
    // 1. Cerrar menú al hacer clic en enlaces normales (Inicio, Nosotros, Contacto, etc.)
    const normalLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
    normalLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) {
            setTimeout(() => bsCollapse.hide(), 100);
          }
        }
      });
    });

    // 2. Cerrar menú al hacer clic en las opciones del dropdown (Programación, Alimentos)
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
      item.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) {
            // 300ms de delay para que el cierre se sienta suave y natural
            setTimeout(() => bsCollapse.hide(), 100);
          }
        }
      });
    });
  }
}