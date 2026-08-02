/* =========================================================
   script.js — product grid rendering, toasts, drawer, misc UI
   Loaded last so it can rely on products/cart/search helpers.
   ========================================================= */

/** Inline SVG placeholder used when a product image is missing. */
function fallbackTile(name) {
  const initial = name.trim().charAt(0).toUpperCase();
  return `<div class="fallback" aria-hidden="true">${initial}</div>`;
}

/** Render a list of products into #productsGrid. */
function displayProducts(productList = PRODUCTS) {
  const container = document.getElementById("productsGrid");
  if (!container) return;

  container.innerHTML = productList
    .map(
      (product) => `
      <article class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" width="400" height="180"
               onerror="this.closest('.product-image').innerHTML = ${JSON.stringify(
                 fallbackTile(product.name)
               ).replace(/"/g, "&quot;")}">
        </div>
        <div class="product-info">
          <p class="product-category">${product.category}</p>
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">${formatPrice(product.price)}</p>
          <div class="product-buttons">
            <button class="add-cart" type="button" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-cart-plus" aria-hidden="true"></i> Add to Cart
            </button>
            <button class="buy-now" type="button" onclick="buyNow(${product.id})">Buy Now</button>
          </div>
        </div>
      </article>`
    )
    .join("");
}

/* ---------- Toast ---------- */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

/* ---------- Buy now ---------- */
/** Adds the product then jumps straight to checkout. */
function buyNow(id) {
  const product = getProductById(id);
  if (!product) return;

  const existing = cart.find((item) => item.id === product.id);
  if (!existing) cart.push({ ...product, qty: 1 });
  saveCart();

  window.location.href = "checkout.html";
}

/* ---------- Mobile drawer ---------- */
function openDrawer() {
  document.getElementById("drawer")?.classList.add("active");
  document.getElementById("drawerOverlay")?.classList.add("active");
  document.getElementById("menuBtn")?.setAttribute("aria-expanded", "true");
}
function closeDrawer() {
  document.getElementById("drawer")?.classList.remove("active");
  document.getElementById("drawerOverlay")?.classList.remove("active");
  document.getElementById("menuBtn")?.setAttribute("aria-expanded", "false");
}

/* ---------- Support ---------- */
function openSupport() {
  window.open("https://wa.me/233204496069", "_blank", "noopener");
}

/* ---------- Startup ---------- */
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();

  document.getElementById("menuBtn")?.addEventListener("click", openDrawer);
  document.getElementById("closeDrawer")?.addEventListener("click", closeDrawer);
  document.getElementById("drawerOverlay")?.addEventListener("click", closeDrawer);

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Escape closes every overlay.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeCart();
    closeDrawer();
    if (typeof closeAuth === "function") closeAuth();
  });
});
