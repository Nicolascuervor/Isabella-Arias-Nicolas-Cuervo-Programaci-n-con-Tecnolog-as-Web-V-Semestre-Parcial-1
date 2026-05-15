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
