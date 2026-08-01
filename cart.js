// ===============================
// CART.JS
// ===============================

// Cart State
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");

// Open Cart
function openCart() {
    cartSidebar?.classList.add("active");
    cartOverlay?.classList.add("active");
}

// Close Cart
function closeCart() {
    cartSidebar?.classList.remove("active");
    cartOverlay?.classList.remove("active");
}

// Event Listeners
cartBtn?.addEventListener("click", openCart);
closeCartBtn?.addEventListener("click", closeCart);
cartOverlay?.addEventListener("click", closeCart);

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            ...product,
            qty: 1
        });
    }

    saveCart();

    if (typeof showToast === "function") {
        showToast(`${product.name} added to cart`);
    }

    openCart();
}

// Save Cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    } else {
        cart.forEach(item => {
            total += item.price * item.qty;
            count += item.qty;

            cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-details">
                        <h4>${item.name}</h4>
                        <p>GHS ${item.price}</p>

                        <div class="cart-controls">
                            <button onclick="changeQty(${item.id}, -1)">−</button>
                            <span>${item.qty}</span>
                            <button onclick="changeQty(${item.id}, 1)">+</button>
                            <button onclick="removeItem(${item.id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    cartTotal.textContent = `GHS ${total}`;
    cartCount.textContent = count;
}

// Change Quantity
function changeQty(id, value) {
    const item = cart.find(i => i.id === id);

    if (!item) return;

    item.qty += value;

    if (item.qty <= 0) {
        removeItem(id);
        return;
    }

    saveCart();
}

// Remove Item
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
}

// Checkout
checkoutBtn?.addEventListener("click", () => {
    if (cart.length === 0) {
        if (typeof showToast === "function") {
            showToast("Your cart is empty");
        }
        return;
    }

    window.location.href = "checkout.html";
});

// Initialize
document.addEventListener("DOMContentLoaded", updateCart);
