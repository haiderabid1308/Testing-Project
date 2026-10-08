document.addEventListener('DOMContentLoaded', () => {
    
    // Cart functionality
    const cartToggleBtn = document.getElementById('cartToggle');
    const sideCart = document.getElementById('sideCart');
    const closeCartBtn = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');

    let cart = [];

    // Open cart
    cartToggleBtn.addEventListener('click', () => {
        sideCart.classList.add('active');
        cartOverlay.classList.add('active');
    });

    // Close cart
    const closeCart = () => {
        sideCart.classList.remove('active');
        cartOverlay.classList.remove('active');
    };

    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Add to cart
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            
            // Basic animation feedback
            const originalText = e.target.innerText;
            e.target.innerText = 'Added!';
            e.target.style.backgroundColor = '#555';
            setTimeout(() => {
                e.target.innerText = originalText;
                e.target.style.backgroundColor = '';
            }, 1000);

            addToCart(name, price);
        });
    });

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCartUI();
    }

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        updateCartUI();
    }

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;

                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price} x ${item.quantity}</p>
                    </div>
                    <button class="remove-item" data-name="${item.name}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            // Add remove event listeners
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const name = e.target.getAttribute('data-name');
                    removeFromCart(name);
                });
            });
        }

        cartCount.innerText = totalItems;
        
        // Update checkout button with total
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (cart.length > 0) {
            checkoutBtn.innerText = `Checkout ($${totalPrice.toFixed(2)})`;
        } else {
            checkoutBtn.innerText = 'Checkout';
        }
    }
});
