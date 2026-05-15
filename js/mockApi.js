const mockProducts = [
    {
        id: 1,
        name: "Aether Chronos - Obsidian Black",
        price: 299.99,
        description: "El equilibrio perfecto entre elegancia oscura y rendimiento extremo.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Aether Chronos - Lunar Silver",
        price: 319.99,
        description: "Brillo metálico refinado para cualquier ocasión.",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Aether Chronos - Rose Gold",
        price: 349.99,
        description: "Un toque de lujo y sofisticación inigualable.",
        image: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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
