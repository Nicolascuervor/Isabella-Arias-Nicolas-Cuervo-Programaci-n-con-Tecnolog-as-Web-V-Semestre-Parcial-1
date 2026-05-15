/**
 * validation.js
 * Pure form-validation helpers. No DOM access — keeps logic testable
 * and reusable (Single Responsibility Principle).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s().-]{6,}$/;

export const validators = {
  fullName: (v) => {
    if (!v || !v.trim()) return 'El nombre completo es obligatorio.';
    if (v.trim().length < 3) return 'Ingresa al menos 3 caracteres.';
    return null;
  },
  email: (v) => {
    if (!v || !v.trim()) return 'El correo electrónico es obligatorio.';
    if (!EMAIL_RE.test(v.trim())) return 'Ingresa un correo electrónico válido.';
    return null;
  },
  phone: (v) => {
    if (!v || !v.trim()) return 'El teléfono es obligatorio.';
    if (!PHONE_RE.test(v.trim())) return 'Ingresa un teléfono válido (incluye código de país).';
    return null;
  },
  skinType: (v) => (!v ? 'Selecciona tu tipo de piel.' : null),
  need: (v) => {
    if (!v || !v.trim()) return 'Cuéntanos qué necesitas.';
    if (v.trim().length < 10) return 'Describe tu necesidad con al menos 10 caracteres.';
    return null;
  },
};

/**
 * Validate the full form payload.
 * @param {Record<string,string>} data
 * @returns {{ valid: boolean, errors: Record<string,string|null> }}
 */
export function validateConsultation(data) {
  const errors = {};
  for (const key of Object.keys(validators)) {
    errors[key] = validators[key](data[key]);
  }
  const valid = Object.values(errors).every((e) => e === null);
  return { valid, errors };
}
