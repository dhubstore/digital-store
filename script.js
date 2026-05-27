// ================= IMAGE =================
const DATA_IMAGE = "images/data-bundle.png";

// ================= PRODUCTS =================
const products = [

  // ================= VPN =================
  {name:"EXPRESS VPN 1 MONTH", price:45, image:"images/express-vpn.jpg", category:"vpn"},
  {name:"EXPRESS VPN 3 MONTHS", price:60, image:"images/express-vpn.jpg", category:"vpn"},
  {name:"EXPRESS VPN 1 YEAR", price:90, image:"images/express-vpn.jpg", category:"vpn"},

  {name:"PIA VPN 1 MONTH", price:45, image:"images/pia-vpn.png", category:"vpn"},
  {name:"PIA VPN 3 MONTHS", price:65, image:"images/pia-vpn.png", category:"vpn"},
  {name:"PIA VPN 1 YEAR", price:90, image:"images/pia-vpn.png", category:"vpn"},

  {name:"NORD VPN 1 MONTH", price:45, image:"images/nord-vpn.png", category:"vpn"},
  {name:"NORD VPN 1 YEAR", price:90, image:"images/nord-vpn.png", category:"vpn"},

  // ================= ACCOUNTS =================
  {name:"TEXTNOW ACCOUNT", price:25, image:"images/textnow.png", category:"accounts"},
  {name:"TEXTFREE ACCOUNT", price:20, image:"images/textfree.png", category:"accounts"},
  {name:"TEXTPLUS ACCOUNT", price:25, image:"images/textplus.png", category:"accounts"},
  {name:"USA FACEBOOK ACCOUNT", price:50, image:"images/facebook.png", category:"accounts"},
  {name:"GMAIL VERIFIED ACCOUNT", price:25, image:"images/gmail.jpg", category:"accounts"},

  // ================= SUBSCRIPTIONS =================
  {name:"NETFLIX SHARED 1 MONTH", price:35, image:"images/netflix.png", category:"subscriptions"},
  {name:"NETFLIX PERSONAL 1 MONTH", price:70, image:"images/netflix.png", category:"subscriptions"},
  {name:"SPOTIFY PREMIUM 1 MONTH", price:40, image:"images/spotify.png", category:"subscriptions"},
  {name:"SNAPCHAT PLUS 1 MONTH", price:30, image:"images/snapchat.png", category:"subscriptions"},
  {name:"SNAPCHAT PLUS 1 YEAR", price:95, image:"images/snapchat.png", category:"subscriptions"},

  // ================= GIFT CARDS =================
  {name:"$2 ITUNES E-CODE", price:32, image:"images/itunes-2.png", category:"giftcards"},
  {name:"$3 ITUNES E-CODE", price:43, image:"images/itunes-3.png", category:"giftcards"},
  {name:"$4 ITUNES E-CODE", price:57, image:"images/itunes-4.png", category:"giftcards"},
  {name:"$5 ITUNES E-CODE", price:70, image:"images/itunes-5.png", category:"giftcards"},
  {name:"$10 ITUNES E-CODE", price:120, image:"images/itunes-10.png", category:"giftcards"},
  {name:"$15 ITUNES E-CODE", price:215, image:"images/itunes-15.png", category:"giftcards"},
  {name:"$20 ITUNES E-CODE", price:275, image:"images/itunes-20.png", category:"giftcards"},

  // ================= DATA =================
  {name:"1GB MTN DATA", price:6, image:DATA_IMAGE, category:"data"},
  {name:"2GB MTN DATA", price:10, image:DATA_IMAGE, category:"data"},
  {name:"3GB MTN DATA", price:15.50, image:DATA_IMAGE, category:"data"},
  {name:"5GB MTN DATA", price:25, image:DATA_IMAGE, category:"data"},
  {name:"10GB MTN DATA", price:50, image:DATA_IMAGE, category:"data"},

  // ================= SOCIAL BOOST =================
  {name:"1K TIKTOK LIKES", price:10, image:"images/tiktok.png", category:"social"},
  {name:"1K TIKTOK VIEWS", price:5, image:"images/tiktok.png", category:"social"},
  {name:"500 TIKTOK FOLLOWERS", price:25, image:"images/tiktok.png", category:"social"},
  {name:"1K TIKTOK FOLLOWERS", price:45, image:"images/tiktok.png", category:"social"},
  {name:"1K INSTAGRAM LIKES", price:23, image:"images/instagram.png", category:"social"},
  {name:"1K INSTAGRAM VIEWS", price:8, image:"images/instagram.png", category:"social"},
  {name:"1K FACEBOOK FOLLOWERS", price:30, image:"images/facebook.png", category:"social"}

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

  let username = "";

  if(product.category === "social"){
    username = prompt("Enter username or link:");
    if(!username){
      alert("Username/link is required!");
      return;
    }
  }

  const existing = cart.find(item =>
    item.name === product.name && item.username === username
  );

  if(existing){
    existing.quantity++;
  } else {
    cart.push({...product, quantity:1, username});
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
            ${item.username ? "User: " + item.username + "<br>" : ""}
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
      <h4>Telecel Cash</h4>
      <p>
        Number: <b id="momoNumber">020 449 6069</b>
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
  alert("Telecel Cash number copied!");
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
