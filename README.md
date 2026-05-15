# La Roche-Posay B2B - Skincare Corporativo

## Descripción Breve
La Roche-Posay B2B es una plataforma web diseñada para el abastecimiento al por mayor de productos dermatológicos corporativos. El proyecto se desarrolló utilizando HTML5, CSS3 nativo (usando variables CSS y Flexbox/Grid para un diseño responsivo) y JavaScript (Vanilla) para la lógica de negocio y simulaciones de API, cumpliendo con los estándares de diseño y experiencia de usuario (UI/UX) con una temática clínica y corporativa en tonos cremas y azules.

Este proyecto es parte del "Parcial 1" de Programación con Tecnologías Web.

## Características Principales
- **Diseño Premium**: Paleta de colores "Dark Mode", fuentes modernas y efectos "Glassmorphism" y animaciones.
- **Responsividad**: Completamente funcional en escritorio y dispositivos móviles sin elementos rotos o desbordados.
- **Semántica HTML5**: Uso correcto de etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `footer`).
- **Usabilidad (UX)**:
  - Textos descriptivos en botones (e.g. "Procesar Pago Seguro" en vez de "Enviar").
  - Etiquetas (`label`) correctas asociadas a campos de entrada con tipos específicos (`email`, `tel`, `date`, `text`).
  - Estados de carga (Spinners y botones deshabilitados).
  - Manejo y muestra de errores de la API.
  - Confirmación explícita para acciones irreversibles (modal de confirmación antes de cancelar pedido).
  - Estados de vacío explícitos ("Empty states").

## Cómo Correrlo Localmente
Dado que el proyecto utiliza Vanilla HTML/CSS/JS con uso de módulos ES6 (`type="module"`), debe ser corrido en un servidor local (no se puede simplemente abrir el archivo `index.html` en el navegador con el protocolo `file://` debido a restricciones de CORS con los módulos).

**Opción 1: Usando una extensión de Visual Studio Code**
1. Abre el proyecto en VS Code.
2. Instala la extensión **Live Server**.
3. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.

**Opción 2: Usando Node.js (http-server / serve)**
1. Abre una terminal en la raíz del proyecto.
2. Ejecuta `npx serve .` o `npx http-server -c-1` (se requiere tener Node.js instalado).
3. Abre el enlace local proporcionado (ej. `http://localhost:3000`).

**Opción 3: Usando Python**
1. Abre una terminal en la raíz del proyecto.
2. Ejecuta `python -m http.server 8000`.
3. Navega a `http://localhost:8000` en tu navegador.

---

## Documentación de la API Simulada (`mockApi.js`)

El archivo `js/mockApi.js` expone métodos que simulan una API real con un retraso (latencia) y probabilidad de falla. Todos los errores simulados lanzan en consola un código HTTP equivalente a un `500 Internal Server Error`.

### 1. `getProducts()`
Obtiene la lista de productos (lotes dermatológicos) disponibles en el catálogo.
- **Equivalente HTTP**: `GET /api/products`
- **Parámetros**: Ninguno.
- **Retorno en Éxito**: Un arreglo de objetos, donde cada objeto representa un plan con sus detalles (`id`, `name`, `price`, `description`, `image`).
- **Retorno en Error**: Lanza un `Error` si falla (10% de probabilidad programada). Además, se registra en consola `500 Internal Server Error: Error al obtener los productos de la base de datos.`

### 2. `submitOrder(orderData)`
Procesa y registra una orden de compra generada por el usuario.
- **Equivalente HTTP**: `POST /api/orders`
- **Parámetros**: `orderData` (Object). Debe contener:
  - `name`: String.
  - `email`: String.
  - `phone`: String.
  - `date`: String.
  - `productId`: String o Number.
- **Retorno en Éxito**: Un objeto de confirmación con los campos:
  - `success`: Boolean (`true`)
  - `orderId`: String (ID de orden generado aleatoriamente)
  - `message`: String
  - `estimatedDelivery`: String
- **Retorno en Error**: Lanza un `Error` en caso de fallar (15% de probabilidad programada). También puede fallar por validación si faltan datos esenciales. Se registra en consola `500 Internal Server Error: Fallo en el procesador de pagos.` (o 400 en caso de faltar datos).
