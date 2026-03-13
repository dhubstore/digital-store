// RENDER PRODUCTS
function renderProducts(){
  const container = document.querySelector(".products-list");
  container.innerHTML="";
  products.forEach(p=>{
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

// ADD ITEM TO CART
function addToCart(name, price){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({item:name, price:price});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateMiniCart();
  alert(`${name} added to cart!`);
}

// MINI-CART
function updateMiniCart(){
  const cart=JSON.parse(localStorage.getItem('cart'))||[];
  const cartCount = document.getElementById('cartCount');
  cartCount.textContent = cart.length;
  cartCount.style.backgroundColor = "red"; // Ensure visible
  cartCount.style.color = "white";
  cartCount.style.fontWeight = "bold";

  const miniCartItems=document.getElementById('miniCartItems');
  miniCartItems.innerHTML="";
  let total=0;
  cart.forEach(item=>{
    const div=document.createElement('div');
    div.style.display='flex';
    div.style.justifyContent='space-between';
    div.style.marginBottom='5px';
    div.textContent=`${item.item} - GHC ${item.price}`;
    miniCartItems.appendChild(div);
    total+=item.price;
  });
  document.getElementById('miniCartTotal').textContent=total;
}

// BUY NOW
function buyNow(name, price){
  const cart=[{item:name, price:price}];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateMiniCart();
  window.location.href='checkout.html';
}

function goToCheckout(){window.location.href='checkout.html';}

document.addEventListener("DOMContentLoaded", ()=>{
  renderProducts();
  updateMiniCart();
});
