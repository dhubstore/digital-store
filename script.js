const DATA_IMAGE = "https://via.placeholder.com/200";

// ================= PRODUCTS =================
const products = [
  {name:"EXPRESS VPN 1 MONTH", price:45, image:"images/express-vpn.jpg", category:"vpn"},
  {name:"EXPRESS VPN 3 MONTHS", price:60, image:"images/express-vpn.jpg", category:"vpn"},
  {name:"EXPRESS VPN 1 YEAR", price:90, image:"images/express-vpn.jpg", category:"vpn"},

  {name:"PIA VPN 1 MONTH", price:45, image:"images/pia-vpn.png", category:"vpn"},
  {name:"PIA VPN 3 MONTHS", price:65, image:"images/pia-vpn.png", category:"vpn"},
  {name:"PIA VPN 1 YEAR", price:90, image:"images/pia-vpn.png", category:"vpn"},

  {name:"HMA PRO VPN 1 MONTH", price:45, image:"images/hma-vpn.jpg", category:"vpn"},
  {name:"HMA PRO VPN 1 YEAR", price:90, image:"images/hma-vpn.jpg", category:"vpn"},

  {name:"IPVANISH VPN 6 MONTHS", price:55, image:"images/ipvanish-vpn.jpg", category:"vpn"},
  {name:"IPVANISH VPN 1 YEAR", price:90, image:"images/ipvanish-vpn.jpg", category:"vpn"},

  {name:"NORD VPN 1 MONTH", price:45, image:"images/nord-vpn.png", category:"vpn"},
  {name:"NORD VPN 1 YEAR", price:90, image:"images/nord-vpn.png", category:"vpn"},
  {name:"NORD VPN 2 YEARS", price:120, image:"images/nord-vpn.png", category:"vpn"},

  {name:"CYBER GHOST VPN 1 MONTH", price:45, image:"images/cyberghost-vpn.jpg", category:"vpn"},
  {name:"CYBER GHOST VPN 6 MONTHS", price:50, image:"images/cyberghost-vpn.jpg", category:"vpn"},
  {name:"CYBER GHOST VPN 2 YEARS", price:90, image:"images/cyberghost-vpn.jpg", category:"vpn"},

  {name:"GMAIL PHONE VERIFIED ACCOUNT", price:25, image:"images/gmail.jpg", category:"accounts"},
  {name:"USA FACEBOOK ACCOUNT", price:50, image:"images/facebook.png", category:"accounts"},
  {name:"NETFLIX SHARED 1 MONTH", price:35, image:"images/netflix.png", category:"accounts"},
  {name:"NETFLIX PERSONAL 1 MONTH", price:70, image:"images/netflix.png", category:"accounts"},
  {name:"SPOTIFY PREMIUM 1 MONTH", price:40, image:"images/spotify.png", category:"accounts"},

  {name:"TEXTNOW ACCOUNT", price:25, image:"images/textnow.png", category:"messaging"},
  {name:"TEXTFREE ACCOUNT", price:20, image:"images/textfree.png", category:"messaging"},

  {name:"$2 ITUNES E-CODE", price:32, image:"images/itunes-2.png", category:"giftcards"},
  {name:"$3 ITUNES E-CODE", price:43, image:"images/itunes-3.png", category:"giftcards"},
  {name:"$4 ITUNES E-CODE", price:57, image:"images/itunes-4.png", category:"giftcards"},
  {name:"$5 ITUNES E-CODE", price:70, image:"images/itunes-5.png", category:"giftcards"},
  {name:"$10 ITUNES E-CODE", price:120, image:"images/itunes-10.png", category:"giftcards"},
  {name:"$15 ITUNES E-CODE", price:215, image:"images/itunes-15.png", category:"giftcards"},
  {name:"$20 ITUNES E-CODE", price:275, image:"images/itunes-20.png", category:"giftcards"},

  {name:"10 PROXIES", price:25, image:"images/proxy.jpg", category:"services"},
  {name:"25 PROXIES", price:65, image:"images/proxy.jpg", category:"services"},
  {name:"50 PROXIES", price:100, image:"images/proxy.jpg", category:"services"},
  {name:"100 PROXIES", price:200, image:"images/proxy.jpg", category:"services"},
  {name:"150 PROXIES", price:325, image:"images/proxy.jpg", category:"services"},
  {name:"200 PROXIES", price:400, image:"images/proxy.jpg", category:"services"},

  {name:"1GB MTN DATA", price:6, image:DATA_IMAGE, category:"data"},
  {name:"2GB MTN DATA", price:10, image:DATA_IMAGE, category:"data"},
  {name:"3GB MTN DATA", price:15.50, image:DATA_IMAGE, category:"data"},
  {name:"4GB MTN DATA", price:21.50, image:DATA_IMAGE, category:"data"},
  {name:"5GB MTN DATA", price:25, image:DATA_IMAGE, category:"data"},
  {name:"6GB MTN DATA", price:30, image:DATA_IMAGE, category:"data"},
  {name:"8GB MTN DATA", price:40, image:DATA_IMAGE, category:"data"},
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

function filterProducts(category){
  if(category === 'all'){
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.category === category));
  }
}

function addToCart(index){
  cart.push(products[index]);
  updateCart();
}

function updateCart(){
  const count = document.getElementById("cartCount");
  const items = document.getElementById("cartItems");
  const total = document.getElementById("total");

  if(count) count.innerText = cart.length;

  if(items && total){
    items.innerHTML = "";
    let sum = 0;

    cart.forEach(item=>{
      sum += item.price;
      items.innerHTML += `<div class="cart-item">• ${item.name} - $${item.price}</div>`;
    });

    total.innerText = "Total: $" + sum;
  }
}

function toggleCart(){
  const box = document.getElementById("cartBox");
  if(box){
    box.style.display = box.style.display === "block" ? "none" : "block";
  }
}

function checkout(){
  let message = "Hello, I want to place an order:%0A%0A";

  cart.forEach(item=>{
    message += `• ${item.name} - $${item.price}%0A`;
  });

  // ✅ YOUR WHATSAPP NUMBER ADDED
  window.location.href = `https://wa.me/233509329683?text=${message}`;
}

// ================= INIT =================
displayProducts(products);
