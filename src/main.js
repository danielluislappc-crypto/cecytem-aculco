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
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // 1. Si es el botón "Oferta Educativa" (dropdown-toggle), NO cerrar el menú
        if (link.classList.contains('dropdown-toggle')) {
          e.stopPropagation(); // Evita que el clic cierre el menú principal
          return;
        }
        
        // 2. Si es un enlace normal o una opción del dropdown (Programación/Alimentos), SÍ cerrar el menú
        if (navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) {
            // Pequeño delay para que la navegación se sienta natural
            setTimeout(() => bsCollapse.hide(), 250);
          }
        }
      });
    });
  }
}

// ==========================================
// 2. BOTÓN VOLVER ARRIBA
// ==========================================
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================
// 3. SCROLL SUAVE
// ==========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length <= 1) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });
}

// ==========================================
// 4. CONTADOR ANIMADO DE ESTADÍSTICAS
// ==========================================
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    updateCounter();
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  counters.forEach(counter => observer.observe(counter));
}

// ==========================================
// 5. FILTRO DE GALERÍA
// ==========================================
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.btn-filter');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
          item.style.display = '';
        } else {
          item.classList.add('hidden');
          item.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================
// 6. LIGHTBOX DE IMÁGENES
// ==========================================
function initLightbox() {
  const galleryImages = document.querySelectorAll('.gallery-img');
  const facilityImages = document.querySelectorAll('.facility-img-clickable');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');

  if (!lightboxModal || !lightboxImage) return;

  const modal = new bootstrap.Modal(lightboxModal);

  const openLightbox = (img) => {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    modal.show();
  };

  galleryImages.forEach(img => img.addEventListener('click', () => openLightbox(img)));
  facilityImages.forEach(img => img.addEventListener('click', () => openLightbox(img)));
}

// ==========================================
// 7. VALIDACIÓN DE FORMULARIO DE CONTACTO
// ==========================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  if (!form) return;

  const telefonoInput = document.getElementById('telefono');
  if (telefonoInput) {
    telefonoInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/[^0-9]/g, '');
      e.target.value = value;
      e.target.classList.remove('is-valid', 'is-invalid');
      
      if (value.length > 0 && value.length !== 10) {
        e.target.classList.add('is-invalid');
      } else if (value.length === 10) {
        e.target.classList.remove('is-invalid');
        e.target.classList.add('is-valid');
      }
    });

    telefonoInput.addEventListener('blur', function() {
      if (this.value.length === 0) {
        this.classList.remove('is-valid', 'is-invalid');
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    let isValid = true;
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    const privacidad = document.getElementById('privacidad').checked;

    if (nombre.length < 3) {
      document.getElementById('nombre').classList.add('is-invalid');
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      document.getElementById('correo').classList.add('is-invalid');
      isValid = false;
    }
    if (telefono && telefono.length !== 10) {
      document.getElementById('telefono').classList.add('is-invalid');
      isValid = false;
    }
    if (mensaje.length < 10) {
      document.getElementById('mensaje').classList.add('is-invalid');
      isValid = false;
    }
    if (!privacidad) {
      document.getElementById('privacidad').classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) {
      showToast('Por favor, corrige los errores en el formulario.', 'warning');
      form.classList.add('was-validated');
      return;
    }

    const btnSubmit = document.getElementById('btnSubmit');
    const originalBtnText = btnSubmit.innerHTML;
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.classList.add('submitted');
        if (successMessage) {
          successMessage.classList.remove('d-none');
          successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        form.reset();
        form.classList.remove('was-validated');
      } else {
        throw new Error('Error en el servidor');
      }
    } catch (error) {
      showToast('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = originalBtnText;
    }
  });
}

window.resetFormAndHide = function() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  if (form && successMessage) {
    form.classList.remove('submitted');
    successMessage.classList.add('d-none');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// ==========================================
// 8. MODO OSCURO
// ==========================================
function initDarkMode() {
  const toggleBtn = document.getElementById('darkModeToggle');
  if (!toggleBtn) return;

  const darkMode = localStorage.getItem('darkMode') === 'true';
  if (darkMode) {
    document.body.classList.add('dark-mode');
    toggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);

    if (isDark) {
      toggleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
      showToast('Modo oscuro activado', 'info');
    } else {
      toggleBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
      showToast('Modo claro activado', 'info');
    }
  });
}

// ==========================================
// 9. ANIMACIONES CON INTERSECTION OBSERVER
// ==========================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.career-card, .facility-card, .news-card, .value-card, .testimonial-card, .ally-card'
  );

  animatedElements.forEach(el => el.classList.add('fade-in-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animatedElements.forEach(el => observer.observe(el));
}

// ==========================================
// 10. CARGA DIFERIDA DE IMÁGENES
// ==========================================
function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) return;

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// 11. INICIALIZACIÓN DE TOOLTIPS
// ==========================================
function initTooltips() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));
}

// ==========================================
// 12. TOAST DE NOTIFICACIONES
// ==========================================
function showToast(message, type = 'info') {
  const toastEl = document.getElementById('mainToast');
  const toastBody = document.getElementById('toastBody');
  if (!toastEl || !toastBody) return;

  toastBody.textContent = message;
  const header = toastEl.querySelector('.toast-header');
  header.classList.remove('bg-primary', 'bg-success', 'bg-warning', 'bg-danger', 'text-white');
  
  switch(type) {
    case 'success': header.classList.add('bg-success', 'text-white'); break;
    case 'warning': header.classList.add('bg-warning'); break;
    case 'error': header.classList.add('bg-danger', 'text-white'); break;
    default: header.classList.add('bg-primary', 'text-white');
  }

  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
}

// ==========================================
// 13. MASCOTA ANIMADA EN NAVBAR
// ==========================================
function initNavMascot() {
  const video = document.getElementById('cecyto-nav-video');
  if (!video) return;

  const playVideo = () => {
    video.play().catch(() => {
      const tryPlayOnInteract = () => {
        video.play();
        document.removeEventListener('click', tryPlayOnInteract);
        document.removeEventListener('scroll', tryPlayOnInteract);
      };
      document.addEventListener('click', tryPlayOnInteract, { once: true });
      document.addEventListener('scroll', tryPlayOnInteract, { once: true });
    });
  };
  playVideo();
}