/* =========================================================
   checkout.js — order summary, validation and order placement
   Depends on products.js and cart.js.
   ========================================================= */

const SERVICE_FEE_RATE = 0.02; // 2% service fee

/** Render the order summary panel from the persisted cart. */
function renderSummary() {
  const list = document.getElementById("summaryItems");
  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = `<p class="empty-cart">Your cart is empty. <a href="index.html">Browse products</a>.</p>`;
  } else {
    list.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div class="cart-details">
            <h4>${item.name}</h4>
            <p>${formatPrice(item.price)} &times; ${item.qty}</p>
            <div class="cart-controls">
              <button type="button" aria-label="Decrease quantity" onclick="changeQty(${item.id}, -1)">&minus;</button>
              <span>${item.qty}</span>
              <button type="button" aria-label="Increase quantity" onclick="changeQty(${item.id}, 1)">+</button>
              <button type="button" class="remove-btn" aria-label="Remove ${item.name}" onclick="removeItem(${item.id})">
                <i class="fa-solid fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>`
      )
      .join("");
  }

  const subtotal = cartSubtotal();
  const fee = Math.round(subtotal * SERVICE_FEE_RATE);

  document.getElementById("summarySubtotal").textContent = formatPrice(subtotal);
  document.getElementById("summaryFee").textContent = formatPrice(fee);
  document.getElementById("summaryTotal").textContent = formatPrice(subtotal + fee);
}

/** Basic client-side validation; returns an error string or null. */
function validateForm(form) {
  const name = form.fullName.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();

  if (cart.length === 0) return "Your cart is empty.";
  if (name.length < 3) return "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
  if (!/^[0-9+\s-]{9,15}$/.test(phone)) return "Please enter a valid phone number.";
  return null;
}

/** Generate a human-friendly order reference. */
function makeOrderRef() {
  return "DH-" + Date.now().toString(36).toUpperCase().slice(-6);
}

document.addEventListener("DOMContentLoaded", () => {
  renderSummary();
  document.addEventListener("cart:change", renderSummary);

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.getElementById("checkoutForm");
  const errorEl = document.getElementById("formError");

  // Prefill from a stored account when available.
  const stored = JSON.parse(localStorage.getItem("dhub_user") || "null");
  if (stored && form) {
    form.fullName.value = stored.name || "";
    form.email.value = stored.email || "";
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const error = validateForm(form);
    if (error) {
      errorEl.textContent = error;
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;

    const order = {
      ref: makeOrderRef(),
      customer: {
        name: form.fullName.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim()
      },
      payment: form.payment.value,
      items: cart,
      total: cartSubtotal() + Math.round(cartSubtotal() * SERVICE_FEE_RATE),
      placedAt: new Date().toISOString()
    };

    // Persist the order history locally (demo stand-in for a backend).
    const history = JSON.parse(localStorage.getItem("dhub_orders") || "[]");
    history.push(order);
    localStorage.setItem("dhub_orders", JSON.stringify(history));

    clearCart();

    document.querySelector(".checkout-grid").hidden = true;
    document.getElementById("orderRef").textContent = order.ref;
    document.getElementById("successPanel").hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/** Toast shim so cart.js can call it on this page too. */
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

/** Opens WhatsApp support. */
function openSupport() {
  window.open("https://wa.me/233204496069", "_blank", "noopener");
}
