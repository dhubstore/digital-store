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
        <div class="cart-item" style="display:flex; justify-content:space-between;">
          <div>
            ${item.name}<br>
            GHC ${item.price} × ${item.quantity}
          </div>
          <div>
            <button onclick="decreaseQty(${index})">➖</button>
            <button onclick="increaseQty(${index})">➕</button>
            <button onclick="removeFromCart(${index})">✖</button>
          </div>
        </div>
      `;
    });

    total.innerText = "Total: GHC " + sum;
  }
}

// ================= CART FUNCTIONS =================
function increaseQty(i){ cart[i].quantity++; updateCart(); }
function decreaseQty(i){ cart[i].quantity--; if(cart[i].quantity<=0) cart.splice(i,1); updateCart(); }
function removeFromCart(i){ cart.splice(i,1); updateCart(); }

// ================= CART TOGGLE =================
function toggleCart(){
  document.getElementById("cartBox").classList.toggle("active");
}

// ================= CHECKOUT =================
function checkout(){
  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  const orderId = "DH-" + Math.floor(100000 + Math.random()*900000);
  const ref = "REF-" + Math.floor(100000 + Math.random()*900000);

  document.getElementById("orderInfo").innerHTML =
    `🆔 ${orderId}<br>💳 ${ref}`;

  document.getElementById("paymentProof").value = ref;

  // RECEIPT STYLE SUMMARY
let summaryHTML = `
  <div style="background:#020617; padding:15px; border-radius:10px; margin-bottom:10px;">
    <h3 style="text-align:center;">🧾 Receipt</h3>
    <hr>
`;

let total = 0;

cart.forEach(item => {
  const itemTotal = item.price * item.quantity;
  total += itemTotal;

  summaryHTML += `
    <div style="display:flex; justify-content:space-between;">
      <span>${item.name} x${item.quantity}</span>
      <span>GHC ${itemTotal}</span>
    </div>
  `;
});

summaryHTML += `
    <hr>
    <h3 style="text-align:right;">Total: GHC ${total}</h3>
  </div>
`;

document.getElementById("orderSummary").innerHTML = summaryHTML;
  

// ================= PAYMENT =================
function updatePaymentDetails(){
  document.getElementById("paymentDetails").innerHTML = `
    <p>MoMo: <b id="momoNumber">0241923407</b>
    <button onclick="copyNumber()">Copy</button></p>
  `;
}

function copyNumber(){
  navigator.clipboard.writeText("0241923407");
  alert("Copied!");
}

// ================= SUBMIT =================
function submitOrder(){
  alert("Order sent!");
  cart=[];
  updateCart();
  document.getElementById("checkoutForm").style.display="none";
}

// ================= INIT =================
displayProducts(products);
