import { getProducts, submitOrder } from './mockApi.js';

document.addEventListener('DOMContentLoaded', () => {
    initCatalog();
    initForm();
    initModal();
});

// --- Catalog Section ---
async function initCatalog() {
    const catalogContainer = document.getElementById('catalog-container');
    const catalogLoading = document.getElementById('catalog-loading');
    const catalogError = document.getElementById('catalog-error');
    const catalogEmpty = document.getElementById('catalog-empty');
    const productSelect = document.getElementById('product');

    try {
        // Fetch products
        const products = await getProducts();
        
        catalogLoading.classList.add('hidden');

        if (!products || products.length === 0) {
            catalogEmpty.classList.remove('hidden');
            return;
        }

        // Render products
        products.forEach(product => {
            // Add to grid
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)} USD</p>
                    <p class="product-desc">${product.description}</p>
                    <button class="btn btn-primary" onclick="selectProduct(${product.id})">Seleccionar Modelo</button>
                </div>
            `;
            catalogContainer.appendChild(card);

            // Add to select form
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = `${product.name} - $${product.price.toFixed(2)}`;
            productSelect.appendChild(option);
        });

    } catch (error) {
        catalogLoading.classList.add('hidden');
        catalogError.classList.remove('hidden');
        catalogError.textContent = error.message;
    }
}

// Global function to be called from inline onclick
window.selectProduct = (id) => {
    const select = document.getElementById('product');
    select.value = id;
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
};


// --- Form Section ---
function initForm() {
    const form = document.getElementById('order-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const formError = document.getElementById('form-error');
    const formSuccess = document.getElementById('form-success');
    const cancelBtn = document.getElementById('btn-cancel-order');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Hide previous messages
        formError.classList.add('hidden');
        formSuccess.classList.add('hidden');

        const formData = new FormData(form);
        const orderData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            date: formData.get('date'),
            productId: formData.get('product')
        };

        if (!orderData.productId) {
            formError.classList.remove('hidden');
            formError.textContent = "Por favor selecciona un modelo antes de continuar.";
            return;
        }

        // Loading state
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span> Procesando pago...';

        try {
            const response = await submitOrder(orderData);
            
            formSuccess.classList.remove('hidden');
            formSuccess.textContent = `${response.message}. ID de Orden: ${response.orderId}. Entrega estimada: ${response.estimatedDelivery}.`;
            form.reset();
        } catch (error) {
            formError.classList.remove('hidden');
            formError.textContent = error.message;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    cancelBtn.addEventListener('click', () => {
        window.openModal('¿Estás seguro que deseas limpiar el formulario y cancelar el pedido en curso?', () => {
            form.reset();
            formError.classList.add('hidden');
            formSuccess.classList.add('hidden');
        });
    });
}


// --- Modal Section (Confirmations) ---
function initModal() {
    const modal = document.getElementById('confirmation-modal');
    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn = document.getElementById('modal-cancel');
    const modalText = document.getElementById('modal-text');
    
    let onConfirmCallback = null;

    window.openModal = (text, callback) => {
        modalText.textContent = text;
        onConfirmCallback = callback;
        modal.classList.add('active');
    };

    window.closeModal = () => {
        modal.classList.remove('active');
        onConfirmCallback = null;
    };

    confirmBtn.addEventListener('click', () => {
        if (onConfirmCallback) onConfirmCallback();
        window.closeModal();
    });

    cancelBtn.addEventListener('click', () => {
        window.closeModal();
    });
}
