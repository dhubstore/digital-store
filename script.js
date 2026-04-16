// ================= IMAGE =================
const DATA_IMAGE = "images/data-bundle.png";

// ================= PRODUCTS =================
const products = [
  {name:"EXPRESS VPN 1 MONTH", price:45, image:"images/express-vpn.jpg", category:"vpn"},
  {name:"NETFLIX PERSONAL 1 MONTH", price:70, image:"images/netflix.png", category:"accounts"},

  // DATA (ALL USE SAME IMAGE)
  {name:"1GB MTN DATA", price:6, image:DATA_IMAGE, category:"data"},
  {name:"2GB MTN DATA", price:10, image:DATA_IMAGE, category:"data"},
  {name:"5GB MTN DATA", price:25, image:DATA_IMAGE, category:"data"},
  {name:"10GB MTN DATA", price:50, image:DATA_IMAGE, category:"data"}
];

// ================= CART =================
let cart = [];

function displayProducts(list){
  const container = document.getElementById("productList");
  if(!container) return;

  container.innerHTML = "";

  list.forEach((p,i)=>{
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" onerror="this.src='https://via.placeholder.com/200'">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  });
}

// ================= FILTER =================
function filterProducts(category){
  if(category === 'all'){
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.category === category));
  }
}

// ================= ADD TO CART =================
function addToCart(index){
  const product = products[index];
  const existing = cart.find(item => item.name === product.name);

  if(existing){
    existing.quantity += 1;
  } else {
    cart.push({...product, quantity:1});
  }

  updateCart();
}

// ================= CART DISPLAY =================
function updateCart(){
  const count = document.getElementById("cartCount");
  const items = document.getElementById("cartItems");
  const total = document.getElementById("total");

  if(count) count.innerText = cart.reduce((s,i)=>s+i.quantity,0);

  if(items && total){
    items.innerHTML = "";
    let sum = 0;

    cart.forEach((item,index)=>{
      sum += item.price * item.quantity;

      items.innerHTML += `
        <div class="cart-item">
          ${item.name} - $${item.price} × ${item.quantity}
          <button onclick="decreaseQty(${index})">➖</button>
          <button onclick="increaseQty(${index})">➕</button>
          <button onclick="removeFromCart(${index})" style="background:red;">❌</button>
        </div>
      `;
    });

    total.innerText = "Total: $" + sum;
  }
}

// ================= QUANTITY =================
function increaseQty(index){
  cart[index].quantity++;
  updateCart();
}

function decreaseQty(index){
  cart[index].quantity--;
  if(cart[index].quantity <= 0) cart.splice(index,1);
  updateCart();
}

function removeFromCart(index){
  cart.splice(index,1);
  updateCart();
}

// ================= CART TOGGLE =================
function toggleCart(){
  const box = document.getElementById("cartBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

// ================= CHECKOUT =================
function checkout(){
  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  document.getElementById("checkoutForm").style.display = "block";
}

// ================= CLOSE FORM =================
function closeForm(){
  document.getElementById("checkoutForm").style.display = "none";
}

// ================= SUBMIT ORDER =================
function submitOrder(){
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const location = document.getElementById("custLocation").value;
  const proof = document.getElementById("paymentProof").value;

  if(!name || !phone || !location || !proof){
    alert("Please fill all fields!");
    return;
  }

  let message = `NEW ORDER%0A%0A`;
  message += `Name: ${name}%0APhone: ${phone}%0ALocation: ${location}%0A`;
  message += `Payment ID: ${proof}%0A%0AItems:%0A`;

  cart.forEach(item=>{
    message += `${item.name} x${item.quantity} - $${item.price}%0A`;
  });

  window.location.href = `https://wa.me/233509329683?text=${message}`;
}

// ================= INIT =================
displayProducts(products);
