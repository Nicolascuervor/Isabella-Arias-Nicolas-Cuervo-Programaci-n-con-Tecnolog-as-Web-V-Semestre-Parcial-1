/**
 * mockApi.js
 * --------------------------------------------------------------
 * Simulated REST API layer for the La Roche-Posay landing page.
 *
 * Each function:
 *  - Returns a Promise.
 *  - Resolves after an artificial 800 ms delay (network simulation).
 *  - Has a configurable failure probability to demonstrate error UX.
 *  - Logs "500 Internal Server Error" to the console on failure,
 *    matching the convention of a real REST endpoint.
 *
 * Endpoints:
 *  - getBrandProducts()        → simulates GET /api/products
 *  - submitSkinConsultation()  → simulates POST /api/consultations
 * --------------------------------------------------------------
 */

const NETWORK_DELAY = 800;
const FAILURE_RATE = 0.08; // 8% chance of simulated 500 error

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const maybeFail = () => Math.random() < FAILURE_RATE;

const PRODUCTS = [
  {
    id: 'effaclar',
    name: 'Effaclar',
    description: 'Rutina dermatológica para piel grasa con tendencia acneica.',
    image: './assets/images/effaclar.svg',
  },
  {
    id: 'anthelios',
    name: 'Anthelios',
    description: 'Protección solar de alta tolerancia con tecnología avanzada.',
    image: './assets/images/anthelios.svg',
  },
  {
    id: 'cicaplast',
    name: 'Cicaplast',
    description: 'Reparación intensiva para pieles irritadas o sensibilizadas.',
    image: './assets/images/cicaplast.svg',
  },
  {
    id: 'lipikar',
    name: 'Lipikar',
    description: 'Cuidado relipidante para pieles muy secas y atópicas.',
    image: './assets/images/lipikar.svg',
  },
  {
    id: 'toleriane',
    name: 'Toleriane',
    description: 'Cuidado calmante y protector para pieles alérgicas o ultrasensibles.',
    image: './assets/images/Foto1.jpeg',
  },
  {
    id: 'hyalu-b5',
    name: 'Hyalu B5',
    description: 'Sérum anti-arrugas reparador rellenador con ácido hialurónico.',
    image: './assets/images/Foto2.jpeg',
  },
  {
    id: 'pure-vitamin-c10',
    name: 'Pure Vitamin C10',
    description: 'Renovador antioxidante que revela la luminosidad de la piel.',
    image: './assets/images/Foto3.jpeg',
  },
  {
    id: 'retinol-b3',
    name: 'Retinol B3',
    description: 'Sérum dermatológico anti-arrugas profundas y regenerador.',
    image: './assets/images/Foto4.jpeg',
  },
  {
    id: 'micellar-water',
    name: 'Agua Micelar Ultra',
    description: 'Desmaquillante purificante formulado para pieles sensibles.',
    image: './assets/images/Foto1.jpeg',
  },
  {
    id: 'rosaliac',
    name: 'Rosaliac AR',
    description: 'Concentrado intensivo para rojeces localizadas y piel reactiva.',
    image: './assets/images/Foto2.jpeg',
  },
  {
    id: 'serozinc',
    name: 'Serozinc',
    description: 'Solución purificante y calmante para pieles grasas con imperfecciones.',
    image: './assets/images/Foto3.jpeg',
  },
  {
    id: 'pigmentclar',
    name: 'Pigmentclar',
    description: 'Sérum intensivo corrector anti-manchas con eficacia prolongada.',
    image: './assets/images/Foto4.jpeg',
  },
  {
    id: 'redermic',
    name: 'Redermic Retinol',
    description: 'Concentrado anti-edad intensivo para el contorno de los ojos.',
    image: './assets/images/Foto1.jpeg',
  }
];

/**
 * GET /api/products
 * Returns the catalogue of featured product lines.
 * @returns {Promise<Array<{id:string,name:string,description:string,image:string}>>}
 */
export async function getBrandProducts() {
  await wait(NETWORK_DELAY);
  if (maybeFail()) {
    console.log('500 Internal Server Error');
    throw new Error('No fue posible cargar los productos. Intenta nuevamente.');
  }
  return structuredClone(PRODUCTS);
}

/**
 * POST /api/consultations
 * Submits a personalized skin consultation request.
 * @param {{fullName:string,email:string,phone:string,skinType:string,need:string}} payload
 * @returns {Promise<{ok:true,id:string,receivedAt:string}>}
 */
export async function submitSkinConsultation(payload) {
  await wait(NETWORK_DELAY);
  if (maybeFail()) {
    console.log('500 Internal Server Error');
    throw new Error('El servidor no pudo procesar tu solicitud. Inténtalo de nuevo.');
  }
  return {
    ok: true,
    id: `cons_${Date.now().toString(36)}`,
    receivedAt: new Date().toISOString(),
    payload,
  };
}
