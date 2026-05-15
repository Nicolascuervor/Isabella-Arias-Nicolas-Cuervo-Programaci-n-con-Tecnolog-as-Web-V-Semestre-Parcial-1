/**
 * main.js
 * Application entry point. Wires up the page on DOMContentLoaded,
 * orchestrates async data loading and form submission.
 */

import { getBrandProducts, submitSkinConsultation } from './mockApi.js';
import { validateConsultation } from './validation.js';
import {
  toast,
  initReveal,
  initHeaderScroll,
  initMobileMenu,
  initAccordion,
  initCounters,
  initYear,
} from './ui.js';

/* ---------- Products ---------- */
async function loadProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  try {
    const products = await getBrandProducts();
    grid.setAttribute('aria-busy', 'false');
    grid.innerHTML = products
      .map(
        (p) => `
          <article class="product-card reveal" aria-labelledby="p-${p.id}">
            <div class="product-card__media">
              <img src="${p.image}" alt="Producto ${p.name}" loading="lazy" width="240" height="240" />
            </div>
            <div class="product-card__body">
              <h3 id="p-${p.id}" class="product-card__name">${p.name}</h3>
              <p class="product-card__desc">${p.description}</p>
              <span class="product-card__cta">Explorar línea</span>
            </div>
          </article>
        `
      )
      .join('');
    // Re-run reveal observer for newly inserted cards
    initReveal();
  } catch (error) {
    grid.setAttribute('aria-busy', 'false');
    grid.innerHTML = `
      <div class="product-card" style="grid-column:1/-1;padding:2rem;text-align:center;">
        <h3 class="product-card__name">No pudimos cargar los productos</h3>
        <p class="product-card__desc">${error.message}</p>
        <button id="retry-products" class="btn btn--ghost" style="margin-top:1rem;">Reintentar</button>
      </div>`;
    document.getElementById('retry-products')?.addEventListener('click', loadProducts);
    toast(error.message, 'error');
  }
}

/* ---------- Consultation form ---------- */
function setFieldError(form, name, message) {
  const field = form.querySelector(`[name="${name}"]`)?.closest('.field');
  const errEl = form.querySelector(`[data-error-for="${name}"]`);
  if (!field || !errEl) return;
  field.classList.toggle('has-error', Boolean(message));
  errEl.textContent = message || '';
  const input = form.querySelector(`[name="${name}"]`);
  if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function readForm(form) {
  const fd = new FormData(form);
  return {
    fullName: String(fd.get('fullName') || ''),
    email: String(fd.get('email') || ''),
    phone: String(fd.get('phone') || ''),
    skinType: String(fd.get('skinType') || ''),
    need: String(fd.get('need') || ''),
  };
}

function bindLiveValidation(form) {
  ['fullName', 'email', 'phone', 'skinType', 'need'].forEach((name) => {
    const el = form.querySelector(`[name="${name}"]`);
    if (!el) return;
    el.addEventListener('blur', () => {
      const data = readForm(form);
      const { errors } = validateConsultation(data);
      setFieldError(form, name, errors[name]);
    });
  });
}

function initForm() {
  const form = document.getElementById('consult-form');
  if (!form) return;
  const submitBtn = document.getElementById('submit-btn');
  const status = document.getElementById('form-status');

  bindLiveValidation(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = readForm(form);
    const { valid, errors } = validateConsultation(data);
    Object.entries(errors).forEach(([name, msg]) => setFieldError(form, name, msg));

    if (!valid) {
      status.textContent = 'Revisa los campos marcados antes de continuar.';
      status.className = 'form__status is-error';
      const firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
      firstError?.focus();
      return;
    }

    // Confirmation before final submission (irreversible action UX)
    const confirmed = window.confirm(
      `¿Confirmas el envío de tu solicitud de diagnóstico para ${data.fullName.trim()}?`
    );
    if (!confirmed) return;

    submitBtn.disabled = true;
    submitBtn.classList.add('is-loading');
    status.textContent = 'Enviando tu solicitud…';
    status.className = 'form__status';

    try {
      const result = await submitSkinConsultation(data);
      status.textContent = `¡Listo! Tu solicitud #${result.id} fue recibida. Te contactaremos en menos de 48 h.`;
      status.className = 'form__status is-success';
      toast('Diagnóstico enviado correctamente.', 'success');
      form.reset();
    } catch (error) {
      status.textContent = error.message;
      status.className = 'form__status is-error';
      toast(error.message, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
    }
  });
}

/* ---------- Bootstrap ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initHeaderScroll();
  initMobileMenu();
  initAccordion();
  initReveal();
  initCounters();
  initForm();
  loadProducts();
});
