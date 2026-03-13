// ALL PRODUCTS
const products = [
  {name:"EXPRESS VPN 1 MONTH", price:35, stock:10, image:"images/express-vpn.png"},
  {name:"EXPRESS VPN 3 MONTHS", price:50, stock:10, image:"images/express-vpn.png"},
  {name:"EXPRESS VPN 1 YEAR", price:70, stock:10, image:"images/express-vpn.png"},
  {name:"PIA VPN 1 MONTH", price:45, stock:10, image:"images/pia-vpn.png"},
  {name:"PIA VPN 3 MONTHS", price:65, stock:10, image:"images/pia-vpn.png"},
  {name:"PIA VPN 1 YEAR", price:100, stock:10, image:"images/pia-vpn.png"},
  {name:"HMA PRO VPN 1 MONTH", price:35, stock:10, image:"images/hma-vpn.png"},
  {name:"HMA PRO VPN 1 YEAR", price:60, stock:10, image:"images/hma-vpn.png"},
  {name:"IPVANISH VPN 6 MONTHS", price:55, stock:10, image:"images/ipvanish-vpn.png"},
  {name:"IPVANISH VPN 1 YEAR", price:85, stock:10, image:"images/ipvanish-vpn.png"},
  {name:"NORD VPN 1 MONTH", price:35, stock:10, image:"images/nord-vpn.png"},
  {name:"NORD VPN 1 YEAR", price:70, stock:10, image:"images/nord-vpn.png"},
  {name:"NORD VPN 2 YEARS", price:120, stock:10, image:"images/nord-vpn.png"},
  {name:"CYBER GHOST VPN 1 MONTH", price:35, stock:10, image:"images/cyberghost-vpn.png"},
  {name:"CYBER GHOST VPN 6 MONTHS", price:50, stock:10, image:"images/cyberghost-vpn.png"},
  {name:"CYBER GHOST VPN 2 YEARS", price:90, stock:10, image:"images/cyberghost-vpn.png"},
  {name:"SURFSHARK VPN 1 MONTH", price:30, stock:10, image:"images/surfshark-vpn.png"},
  {name:"GMAIL PHONE VERIFIED ACCOUNT", price:25, stock:10, image:"images/gmail.png"},
  {name:"GOOGLE VOICE ACCOUNT", price:40, stock:10, image:"images/google-voice.png"},
  {name:"NETFLIX 1 MONTH", price:25, stock:10, image:"images/netflix.png"},
  {name:"1GB MTN DATA BUNDLE", price:5, stock:100, image:"images/data-bundle.png"},
  {name:"2GB MTN DATA BUNDLE", price:10, stock:100, image:"images/data-bundle.png"},
  {name:"3GB MTN DATA BUNDLE", price:15, stock:100, image:"images/data-bundle.png"},
  {name:"4GB MTN DATA BUNDLE", price:20, stock:100, image:"images/data-bundle.png"},
  {name:"5GB MTN DATA BUNDLE", price:25, stock:100, image:"images/data-bundle.png"},
  {name:"6GB MTN DATA BUNDLE", price:30, stock:100, image:"images/data-bundle.png"},
  {name:"8GB MTN DATA BUNDLE", price:40, stock:100, image:"images/data-bundle.png"},
  {name:"10GB MTN DATA BUNDLE", price:45, stock:100, image:"images/data-bundle.png"},
  {name:"15GB MTN DATA BUNDLE", price:65, stock:100, image:"images/data-bundle.png"},
  {name:"10GB TELECEL DATA BUNDLE", price:42, stock:100, image:"images/telecel.png"},
  {name:"TEXTNOW ACCOUNT", price:25, stock:20, image:"images/textnow.png"},
  {name:"TEXTFREE ACCOUNT", price:20, stock:20, image:"images/textfree.png"}
];

// RENDER PRODUCTS
function renderProducts(){
  const container = document.querySelector(".products-list");
  container.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <div class="product-info">
        <img src="${p.image}" alt="${p.name}">
        <div class="product-details"><span>${p.name}</span><a href="#">View details</a></div>
      </div>
      <div class="product-price-stock">
        <span class="price">${p.price}GHC</span>
        <span class="stock">${p.stock} pcs</span>
        <div style="display:flex;gap:10px;">
          <button class="purchase-btn" onclick="buyNow('${p.name}',${p.price})">Buy Now</button>
          <button class="purchase-btn add-cart-btn" onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
        </div>
      </div>`;
    container.appendChild(div);
  });
}

// ADD TO CART
function addToCart(name, price){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({item:name, price:price});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateSideCart();
  alert(`${name} added to cart!`);
}

// SIDE CART
const sideCart = document.getElementById('sideCart');
document.getElementById('cartIcon').addEventListener('click', () => {
  sideCart.style.right = '0';
  updateSideCart();
});
document.getElementById('closeSideCart').addEventListener('click', () => {
  sideCart.style.right = '-100%';
});

function updateSideCart(){
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.getElementById('cartCount').textContent = cart.length;
  const container = document.getElementById('sideCartItems');
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    const itemText = document.createElement('span');
    itemText.textContent = `${item.item} - GHC ${item.price}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    removeBtn.addEventListener('click', () => { removeFromCart(index); updateSideCart(); });

    div.appendChild(itemText);
    div.appendChild(removeBtn);
    container.appendChild(div);

    total += item.price;
  });

  document.getElementById('sideCartTotal').textContent = total;
}

// REMOVE ITEM
function removeFromCart(index){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index,1);
  localStorage.setItem('cart', JSON.stringify(cart));
}

// BUY NOW
function buyNow(name, price){
  const cart = [{item:name, price:price}];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateSideCart();
  window.location.href='checkout.html';
}

function goToCheckout(){ window.location.href='checkout.html'; }

// INITIALIZE
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateSideCart();
});
