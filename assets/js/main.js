/**
 * EL 24 CAFÉ BAR - JavaScript Ligero para UX, Navegación & Accesibilidad
 * Sin dependencias externas (<3KB).
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navegación Móvil Accesible (Hamburger Menu)
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (menuToggle && mobileMenu) {
    const toggleMenu = (open) => {
      const isExpanded = open !== undefined ? open : menuToggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      
      menuToggle.setAttribute('aria-expanded', String(newState));
      if (newState) {
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      } else {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    };

    menuToggle.addEventListener('click', () => toggleMenu());

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
        menuToggle.focus();
      }
    });
  }

  // 2. Transición del Header al hacer scroll
  const siteHeader = document.getElementById('site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        siteHeader.classList.add('bg-zinc-950/92', 'shadow-lg', 'backdrop-blur-md', 'py-3');
        siteHeader.classList.remove('bg-zinc-950/40', 'py-4');
      } else {
        siteHeader.classList.remove('bg-zinc-950/92', 'shadow-lg', 'py-3');
        siteHeader.classList.add('bg-zinc-950/40', 'py-4');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Acordeón FAQ: Cierre automático al abrir otro
  const faqItems = document.querySelectorAll('details.faq-item');
  faqItems.forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (detail.open) {
        faqItems.forEach((otherDetail) => {
          if (otherDetail !== detail && otherDetail.open) {
            otherDetail.open = false;
          }
        });
      }
    });
  });

  // 4. Copiar dirección al portapapeles con feedback visual
  const copyAddressBtn = document.getElementById('copy-address-btn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', async () => {
      const address = "Calle Alcalde Pedro González González, 24, 28914 Leganés, Madrid";
      try {
        await navigator.clipboard.writeText(address);
        const originalText = copyAddressBtn.innerHTML;
        copyAddressBtn.innerHTML = '<span class="text-xs font-semibold text-emerald-400">¡Dirección copiada!</span>';
        setTimeout(() => { copyAddressBtn.innerHTML = originalText; }, 2200);
      } catch (err) {
        console.error('Error al copiar:', err);
      }
    });
  }
});
