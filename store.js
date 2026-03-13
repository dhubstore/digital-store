// Mini-cart toggle
const cartIcon = document.getElementById('cartIcon');
const miniCart = document.getElementById('miniCart');
cartIcon.addEventListener('click', () => {
  miniCart.style.display = miniCart.style.display === 'none' ? 'block' : 'none';
});

// Update mini-cart
function updateMiniCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cartCount').textContent = cart.length;
  const miniCartItems = document.getElementById('miniCartItems');
  miniCartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.marginBottom = '5px';
    div.textContent = `${item.item} - GHC ${item.price}`;
    miniCartItems.appendChild(div);
    total += item.price;
  });
  document.getElementById('miniCartTotal').textContent = total;
}

// Add to cart
function addToCart(itemName, price) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ item: itemName, price: price });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateMiniCart();
}

// Buy now
function buyNow(itemName, price) {
  const cart = [{ item: itemName, price: price }];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateMiniCart();
  window.location.href = 'checkout.html';
}

// Go to checkout
function goToCheckout() { window.location.href = 'checkout.html'; }
updateMiniCart();

// Paystack Checkout function (for checkout.html)
function payWithPaystack(fname, email, phone, totalAmount) {
  const handler = PaystackPop.setup({
    key: 'pk_live_76e7df83f71c725b7e10d514b3c935324a97761e',
    email: email,
    amount: totalAmount * 100,
    currency: "GHS",
    ref: 'DH-' + Math.floor(Math.random() * 1000000),
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", value: fname },
        { display_name: "Phone", value: phone },
        { display_name: "Order Details", value: localStorage.getItem('cart') }
      ]
    },
    callback: function(response) {
      localStorage.setItem('lastPaymentRef', response.reference);
      localStorage.setItem('checkoutName', fname);
      localStorage.setItem('checkoutEmail', email);
      localStorage.setItem('checkoutPhone', phone);
      window.location.href = 'success.html';
    },
    onClose: function() { alert('Payment not completed'); }
  });
  handler.openIframe();
}
