// ================= IMAGE =================
const DATA_IMAGE = "images/data-bundle.png";

// ================= PRODUCTS =================
const products = [
  {name:"EXPRESS VPN 1 MONTH", price:45, image:"images/express-vpn.jpg", category:"vpn"},
  {name:"NETFLIX PERSONAL 1 MONTH", price:70, image:"images/netflix.png", category:"accounts"},
  {name:"SPOTIFY PREMIUM 1 MONTH", price:40, image:"images/spotify.png", category:"accounts"},
  {name:"1GB MTN DATA", price:6, image:DATA_IMAGE, category:"data"},
  {name:"5GB MTN DATA", price:25, image:DATA_IMAGE, category:"data"}
];

// ================= CART =================
let cart = [];

// ================= DISPLAY PRODUCTS =================
function displayProducts(list){
  const container = document.getElementById("productList");
  if(!container) return;

  container.innerHTML = "";

  list.forEach((p,i)=>{
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" onerror="this.src='https://via.placeholder.com/200'">
        <h3>${p.name}</h3>
        <p>GHC ${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  });
}

// ================= FILTER =================
function filterProducts(category){
  if(category === "all"){
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
    existing.quantity++;
  } else {
    cart.push({...product, quantity:1});
  }

  updateCart();
}

// ================= UPDATE CART =================
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
        <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            ${item.name}<br>
            GHC ${item.price} × ${item.quantity}
          </div>

          <div>
            <button onclick="decreaseQty(${index})">➖</button>
            <button onclick="increaseQty(${index})">➕</button>
            <button onclick="removeFromCart(${index})" style="background:red;color:white;">✖</button>
          </div>
        </div>
      `;
    });

    total.innerText = "Total: GHC " + sum;
  }
}

// ================= QUANTITY =================
function increaseQty(index){
  cart[index].quantity++;
  updateCart();
}

function decreaseQty(index){
  cart[index].quantity--;
  if(cart[index].quantity <= 0){
    cart.splice(index,1);
  }
  updateCart();
}

// ================= REMOVE =================
function removeFromCart(index){
  cart.splice(index,1);
  updateCart();
}

// ================= TOGGLE CART =================
function toggleCart(){
  const box = document.getElementById("cartBox");
  if(box){
    box.classList.toggle("active");
  }
}

// ================= CHECKOUT =================
function checkout(){
  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

// ================= PAYMENT DETAILS =================
function updatePaymentDetails(){
  const method = document.getElementById("paymentMethod").value;
  const box = document.getElementById("paymentDetails");

  if(method === "momo"){
    box.innerHTML = `
      <h4>Mobile Money (MoMo)</h4>
      <p>
        Number: <b id="momoNumber">0241923407</b>
        <button onclick="copyNumber()">Copy</button>
      </p>
      <p style="font-size:12px;">Confirm the recipient before sending</p>
      <p>Use your reference when sending payment</p>
    `;
  } else {
    box.innerHTML = `
      <h4>Bank Transfer</h4>
      <p>Coming Soon</p>
    `;
  }
}

// ================= COPY NUMBER =================
function copyNumber(){
  const number = document.getElementById("momoNumber").innerText;
  navigator.clipboard.writeText(number);
  alert("Number copied!");
}

// ================= EVENTS =================
document.addEventListener("change", function(e){
  if(e.target.id === "paymentMethod"){
    updatePaymentDetails();
  }
});

document.addEventListener("click", function(e){
  const cartBox = document.getElementById("cartBox");
  const cartIcon = document.querySelector(".cart-icon");

  if(cartBox && cartIcon){
    if(!cartBox.contains(e.target) && !cartIcon.contains(e.target)){
      cartBox.classList.remove("active");
    }
  }
});

// ================= INIT =================
displayProducts(products);
