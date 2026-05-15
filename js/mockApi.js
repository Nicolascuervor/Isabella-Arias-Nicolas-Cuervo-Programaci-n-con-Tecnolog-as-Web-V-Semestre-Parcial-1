const mockProducts = [
    {
        id: 1,
        name: "Enterprise CRM Suite (Lote 50 Licencias)",
        price: 999.99,
        description: "Gestión integral de clientes. Ideal para potenciar tu equipo de ventas al por mayor.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Cloud Storage Business (100TB)",
        price: 499.99,
        description: "Almacenamiento seguro, distribuido y redundante para toda la organización.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "ERP Global Scale (Lote 100 Licencias)",
        price: 1499.99,
        description: "Planificación de recursos empresariales en la nube. Automatización total.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "HR Management System (Lote 500 Empleados)",
        price: 850.00,
        description: "Plataforma SaaS para gestionar nóminas, vacaciones y evaluación de talento humano.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Marketing Automation Pro (Licencia Ilimitada)",
        price: 1200.50,
        description: "Automatiza campañas de correo, redes sociales y métricas en tiempo real.",
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Cybersecurity Analytics Engine (SaaS)",
        price: 2500.00,
        description: "Monitoreo de red con inteligencia artificial y prevención de intrusiones en la nube.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "B2B eCommerce API (Plan Transaccional)",
        price: 799.00,
        description: "Headless commerce APIs listas para integrar en tu propio frontend B2B.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "AI Customer Support Bot (1M Peticiones/mes)",
        price: 650.00,
        description: "Soporte automatizado de primer nivel integrado con tus canales de comunicación.",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        name: "Supply Chain Tracker (Global Edition)",
        price: 1800.00,
        description: "Rastreo de envíos en tiempo real mediante integraciones con cientos de transportistas.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        name: "Financial Accounting Cloud (Multi-moneda)",
        price: 1150.00,
        description: "Contabilidad, facturación y reportes financieros diseñados para operaciones globales.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        name: "Team Collaboration Hub (Lote 200 Usuarios)",
        price: 399.99,
        description: "Videoconferencias, chat empresarial y gestión de tareas unificados.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 12,
        name: "Data Warehousing Solution (Peta-scale)",
        price: 3500.00,
        description: "Bodega de datos en la nube preparada para Big Data y análisis predictivos.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 13,
        name: "ITSM Ticketing System (Enterprise)",
        price: 890.00,
        description: "Mesa de ayuda y gestión de incidentes bajo el marco ITIL.",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
];

/**
 * Simula una llamada a la API para obtener productos (GET /api/products)
 * @returns {Promise<Array>} Lista de productos
 */
export const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulamos un 10% de probabilidad de error para probar el manejo de errores
            const shouldFail = Math.random() < 0.1;
            
            if (shouldFail) {
                console.log("500 Internal Server Error: Error al obtener los productos de la base de datos.");
                reject(new Error("No se pudieron cargar los productos en este momento. Por favor, intenta de nuevo más tarde."));
            } else {
                // Simulamos también la posibilidad de que la lista esté vacía para el "empty state"
                // Descomenta la siguiente línea para probar el estado vacío:
                // resolve([]);
                resolve(mockProducts);
            }
        }, 1200); // 1.2s de delay
    });
};

/**
 * Simula una llamada a la API para enviar una orden de compra (POST /api/orders)
 * @param {Object} orderData Datos de la orden
 * @returns {Promise<Object>} Confirmación de la orden
 */
export const submitOrder = (orderData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Validaciones básicas simuladas en backend
            if (!orderData.email || !orderData.productId) {
                console.log("400 Bad Request: Datos incompletos");
                return reject(new Error("Datos de orden incompletos. Revisa tu formulario."));
            }

            const shouldFail = Math.random() < 0.15; // 15% probabilidad de fallo
            
            if (shouldFail) {
                console.log("500 Internal Server Error: Fallo en el procesador de pagos.");
                reject(new Error("Hubo un problema procesando tu pago. Verifica los datos de tu tarjeta o intenta con otro método."));
            } else {
                resolve({
                    success: true,
                    orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
                    message: "Orden procesada con éxito",
                    estimatedDelivery: "3-5 días hábiles"
                });
            }
        }, 2000); // 2s de delay para notar el loading
    });
};
