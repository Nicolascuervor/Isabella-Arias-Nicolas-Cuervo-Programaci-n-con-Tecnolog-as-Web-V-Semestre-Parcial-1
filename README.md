# La Roche-Posay — Landing Page Premium

Landing page académica que posiciona a **La Roche-Posay** como referente mundial en dermatología respaldada por la ciencia. Diseño minimalista premium inspirado en Apple, Aesop y Stripe, con paleta corporativa azul, animaciones sutiles y arquitectura limpia.

> Proyecto académico · sin uso comercial · vanilla HTML5 + CSS3 + JavaScript ES6+ (sin frameworks).

---

## ✨ Características

- **Diseño premium** ultra minimalista, mobile-first y totalmente responsive (375 / 768 / 1024 / 1440 px).
- **HTML5 semántico** con jerarquía correcta (`header`, `nav`, `main`, `section`, `article`, `form`, `footer`) y un único `<h1>`.
- **Accesibilidad WCAG 2.1 AA**: navegación por teclado, `aria-*`, focus visible, contraste validado, `skip-link`.
- **Microinteracciones**: smooth scrolling, fade-in on scroll, hover, skeleton loaders, toasts.
- **API simulada** (`mockApi.js`) con `Promise`, delay de 800 ms y simulación de error 500.
- **Validación robusta** del formulario (campo a campo, en blur y al enviar).
- **SEO**: `<title>`, meta description, Open Graph, favicon SVG.
- **Clean Code**: separación de responsabilidades (`mockApi`, `validation`, `ui`, `main`), DRY, KISS.

---

## 🛠 Tecnologías

| Capa | Tecnología |
|------|------------|
| Marcado | HTML5 semántico |
| Estilos | CSS3 moderno (variables, Grid, Flexbox, `clamp()`, `oklch`-friendly) |
| Lógica | JavaScript ES6+ (módulos nativos `import/export`) |
| Tipografía | Inter (Google Fonts) + fallback SF Pro Display / system sans |
| Iconografía | SVG inline minimalista |

Sin frameworks, sin build step. Se ejecuta directamente en el navegador.

---

## 📁 Estructura del proyecto

```
/src
├── index.html
├── /css
│   ├── variables.css     # Tokens de diseño (color, espaciado, tipografía)
│   ├── reset.css         # Reset moderno
│   ├── styles.css        # Estilos de componentes y secciones
│   └── responsive.css    # Breakpoints y media queries
├── /js
│   ├── main.js           # Punto de entrada — orquesta la página
│   ├── ui.js             # Helpers UI (toasts, reveal, accordion, contadores)
│   ├── validation.js     # Validadores puros (testables)
│   └── mockApi.js        # API simulada (GET productos / POST consultas)
└── /assets
    ├── /images           # Hero + tarjetas de producto (SVG)
    └── /icons            # Favicon
README.md
```

> En este repositorio los archivos se sirven desde `public/lrp/` para integrarse al preview, pero la estructura interna es idéntica.

---

## 🚀 Cómo ejecutar localmente

Cualquier servidor estático funciona. Tres opciones:

```bash
# Opción 1 — Python
cd public/lrp
python3 -m http.server 8080
# → http://localhost:8080
```

```bash
# Opción 2 — Node (npx)
npx serve public/lrp
```

```bash
# Opción 3 — VSCode
# Instala "Live Server" y abre public/lrp/index.html
```

> Importante: usa un servidor (no abrir el HTML con `file://`) para que los **módulos ES6** (`import`) funcionen correctamente.

---

## 🔌 Documentación de `mockApi.js`

Capa de simulación de API REST. Toda función:

- Retorna una `Promise`.
- Espera **800 ms** (simula latencia de red).
- Tiene una probabilidad configurable de fallar (`FAILURE_RATE = 0.08`).
- En caso de error, registra `console.log("500 Internal Server Error")` y rechaza la promesa con un `Error` descriptivo.

### `getBrandProducts()`

Simula `GET /api/products`.

**Respuesta exitosa** — `Promise<Product[]>`:

```js
[
  {
    id: 'effaclar',
    name: 'Effaclar',
    description: 'Rutina dermatológica para piel grasa con tendencia acneica.',
    image: './assets/images/effaclar.svg'
  },
  // ...Anthelios, Cicaplast, Lipikar
]
```

**Error** — `Error('No fue posible cargar los productos. Intenta nuevamente.')`

**Ejemplo de uso:**

```js
import { getBrandProducts } from './mockApi.js';

try {
  const products = await getBrandProducts();
  render(products);
} catch (err) {
  showToast(err.message, 'error');
}
```

### `submitSkinConsultation(payload)`

Simula `POST /api/consultations`.

**Payload esperado:**

```ts
{
  fullName: string;
  email: string;
  phone: string;
  skinType: 'seca' | 'mixta' | 'grasa' | 'sensible' | 'madura';
  need: string;
}
```

**Respuesta exitosa** — `Promise<{ ok: true, id: string, receivedAt: string, payload }>`

**Error** — `Error('El servidor no pudo procesar tu solicitud. Inténtalo de nuevo.')`

**Ejemplo:**

```js
import { submitSkinConsultation } from './mockApi.js';

const result = await submitSkinConsultation({
  fullName: 'María Fernández',
  email: 'maria@correo.com',
  phone: '+57 300 000 0000',
  skinType: 'mixta',
  need: 'Manchas y protección solar diaria.'
});
console.log(result.id); // → cons_lq8x...
```

---

## ♿ Accesibilidad

- Skip-link al contenido principal.
- Roles ARIA y `aria-live` para toasts/estado del formulario.
- Estados `aria-invalid` y mensajes de error asociados visualmente.
- Soporte de `prefers-reduced-motion`.
- Todos los inputs poseen `<label>` visible y asociado por `for`.

---

## 🎯 Performance

- Sin frameworks ni dependencias runtime → bundle ~0 KB JS de terceros.
- Imágenes vectoriales (SVG) → escalables y livianas.
- Fonts con `preconnect` + `display=swap`.
- CSS modular con variables nativas, sin preprocesadores.

Objetivo Lighthouse: **>95** en Performance, Accessibility, Best Practices y SEO.

---

## 📄 Licencia

Proyecto académico desarrollado con fines educativos. La marca **La Roche-Posay** y sus líneas (Effaclar, Anthelios, Cicaplast, Lipikar) pertenecen a sus respectivos titulares.
