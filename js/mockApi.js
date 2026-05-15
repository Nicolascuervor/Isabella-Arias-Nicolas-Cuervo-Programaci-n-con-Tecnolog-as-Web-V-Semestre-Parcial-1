const mockProducts = [
    {
        id: 1,
        name: "Effaclar Gel Purificante (Lote 100 uds)",
        price: 1850.00,
        description: "Gel limpiador espumoso para pieles grasas y sensibles. Elimina impurezas y exceso de sebo.",
        image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Anthelios UVmune 400 (Lote 50 uds)",
        price: 1200.00,
        description: "Protector solar fluido invisible SPF50+. Alta protección contra rayos UVA ultra largos.",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Toleriane Dermallergo (Lote 200 uds)",
        price: 4500.00,
        description: "Crema hidratante diaria para pieles alérgicas o ultra sensibles. Restaura la barrera cutánea.",
        image: "https://images.unsplash.com/photo-1608248593842-8021c6a8b51d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Cicaplast Baume B5+ (Lote 100 uds)",
        price: 1500.00,
        description: "Bálsamo reparador calmante multi-usos para irritaciones de la piel.",
        image: "https://images.unsplash.com/photo-1615397323758-132d72b53bd4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Hyalu B5 Sérum (Lote 50 uds)",
        price: 2100.00,
        description: "Sérum anti-arrugas reparador rellenador con ácido hialurónico puro y vitamina B5.",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Pure Vitamin C10 Sérum (Lote 50 uds)",
        price: 2250.00,
        description: "Sérum renovador antioxidante que revela la luminosidad de la piel sensible.",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        name: "Retinol B3 Sérum (Lote 50 uds)",
        price: 2400.00,
        description: "Sérum dermatológico anti-arrugas profundas regenerador y unificador.",
        image: "https://images.unsplash.com/photo-1570194065650-d99fb4b8ceb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        name: "Lipikar Baume AP+M (Lote 100 uds)",
        price: 2800.00,
        description: "Bálsamo relipidizante triple acción reparadora. Anti-picor y anti-reaparición.",
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bfb578c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        name: "Micellar Water Ultra (Lote 200 uds)",
        price: 3200.00,
        description: "Agua micelar desmaquillante purificante formulada específicamente para pieles sensibles.",
        image: "https://images.unsplash.com/photo-1556228720-1c2f1f31f90b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 10,
        name: "Rosaliac AR Intense (Lote 50 uds)",
        price: 1650.00,
        description: "Concentrado intensivo para rojeces localizadas. Eficacia anti-reaparición.",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 11,
        name: "Serozinc Spray (Lote 100 uds)",
        price: 1100.00,
        description: "Solución de sulfato de zinc purificante y calmante para pieles grasas con imperfecciones.",
        image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 12,
        name: "Pigmentclar Sérum (Lote 50 uds)",
        price: 2300.00,
        description: "Sérum intensivo corrector anti-manchas con eficacia prolongada.",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 13,
        name: "Redermic Retinol Ojos (Lote 50 uds)",
        price: 1900.00,
        description: "Concentrado dermatológico anti-edad intensivo para el contorno de los ojos.",
        image: "https://images.unsplash.com/photo-1571781564998-05b63ce32e18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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
