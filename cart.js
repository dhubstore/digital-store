/* =========================================================
   cart.js — cart state, persistence and sidebar rendering
   Shared by index.html and checkout.html.
   State is persisted to localStorage under "dhub_cart".
   ========================================================= */

const CART_STORAGE_KEY = "dhub_cart";

/** @type {{id:number,name:string,category:string,price:number,image:string,qty:number}[]} */
let cart = loadCart();

/** Read the cart from localStorage, tolerating corrupt data. */
function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => item && item.id) : [];
  } catch (error) {
    console.warn("Could not read cart from storage:", error);
    return [];
  }
}

/** Persist the cart and refresh every cart-aware part of the UI. */
function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("Could not save cart:", error);
  }
  updateCart();
  document.dispatchEvent(new CustomEvent("cart:change", { detail: { cart } }));
}

/** Total number of units in the cart. */
function cartCountTotal() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/** Monetary subtotal of the cart. */
function cartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

/* ---------- Sidebar open / close ---------- */
function openCart() {
  document.getElementById("cartSidebar")?.classList.add("active");
  document.getElementById("cartOverlay")?.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cartSidebar")?.classList.remove("active");
  document.getElementById("cartOverlay")?.classList.remove("active");
  document.body.style.overflow = "";
}

/* ---------- Mutations ---------- */

/** Add a product (or increment it) and open the cart drawer. */
function addToCart(id) {
  const product = getProductById(id);
  if (!product) return;

  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  showToast(`${product.name} added to cart`);
  openCart();
}

/** Increment/decrement quantity; removes the line when it hits zero. */
function changeQty(id, delta) {
  const item = cart.find((entry) => entry.id === Number(id));
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeItem(id);
    return;
  }
  saveCart();
}

/** Remove a line item entirely. */
function removeItem(id) {
  const removed = cart.find((entry) => entry.id === Number(id));
  cart = cart.filter((entry) => entry.id !== Number(id));
  saveCart();
  if (removed) showToast(`${removed.name} removed`);
}

/** Empty the cart (used after a successful checkout). */
function clearCart() {
  cart = [];
  saveCart();
}

/** Escape user/product text before injecting it into markup. */
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

/* ---------- Rendering ---------- */
function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  if (cartCount) cartCount.textContent = String(cartCountTotal());
  if (cartTotal) cartTotal.textContent = formatPrice(cartSubtotal());
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
      <div class="cart-item">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}"
             onerror="this.src='data:image/svg+xml;utf8,${encodeURIComponent(
               '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#1b2843"/></svg>'
             )}'">
        <div class="cart-details">
          <h4>${escapeHtml(item.name)}</h4>
          <p>${formatPrice(item.price)}</p>
          <div class="cart-controls">
            <button type="button" aria-label="Decrease quantity" onclick="changeQty(${item.id}, -1)">&minus;</button>
            <span aria-live="polite">${item.qty}</span>
            <button type="button" aria-label="Increase quantity" onclick="changeQty(${item.id}, 1)">+</button>
            <button type="button" class="remove-btn" aria-label="Remove ${escapeHtml(item.name)}" onclick="removeItem(${item.id})">
              <i class="fa-solid fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>`
    )
    .join("");
}

/* ---------- Wiring ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cartBtn")?.addEventListener("click", openCart);
  document.getElementById("closeCart")?.addEventListener("click", closeCart);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCart);

  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty");
      return;
    }
    window.location.href = "checkout.html";
  });

  updateCart();
});

// Keep tabs in sync when the cart changes in another window.
window.addEventListener("storage", (event) => {
  if (event.key === CART_STORAGE_KEY) {
    cart = loadCart();
    updateCart();
  }
});
