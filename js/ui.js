export function toast(message, variant = 'info', timeout = 4200) {
  const stack = document.getElementById('toast-stack');
  if (!stack) return;
  const el = document.createElement('div');
  el.className = `toast toast--${variant}`;
  el.setAttribute('role', variant === 'error' ? 'alert' : 'status');
  el.textContent = message;
  stack.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    el.style.transition = 'opacity .3s ease, transform .3s ease';
    setTimeout(() => el.remove(), 320);
  }, timeout);
}


export function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Sticky header shadow on scroll ---------- */
export function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Mobile menu ---------- */
export function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', !open ? 'Cerrar menú' : 'Abrir menú');
    menu.hidden = open;
  });
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    })
  );
}

/* ---------- Accordion ---------- */
export function initAccordion() {
  document.querySelectorAll('.accordion__item').forEach((item) => {
    const trigger = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', () => {
      const open = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  });
}

/* ---------- Animated counters ---------- */
export function initCounters() {
  const nums = document.querySelectorAll('.stat__number[data-count]');
  if (!nums.length) return;

  const animate = (el) => {
    const target = Number(el.dataset.count || 0);
    const duration = 1400;
    const start = performance.now();
    const formatter = new Intl.NumberFormat('es-CO');
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(target * eased);
      el.textContent = formatter.format(value) + (target >= 1000 ? '+' : '+');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((n) => io.observe(n));
}

/* ---------- Footer year ---------- */
export function initYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
}
