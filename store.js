const DATA_IMAGE = "images/data-bundle.png";

const products = [
  {name:"EXPRESS VPN 1 MONTH", price:45, image:"images/express-vpn.jpg", category:"VPN"},
  {name:"EXPRESS VPN 3 MONTHS", price:60, image:"images/express-vpn.jpg", category:"VPN"},
  {name:"EXPRESS VPN 1 YEAR", price:90, image:"images/express-vpn.jpg", category:"VPN"},
  {name:"PIA VPN 1 MONTH", price:45, image:"images/pia-vpn.png", category:"VPN"},
  {name:"PIA VPN 3 MONTHS", price:65, image:"images/pia-vpn.png", category:"VPN"},
  {name:"PIA VPN 1 YEAR", price:90, image:"images/pia-vpn.png", category:"VPN"},
  {name:"HMA PRO VPN 1 MONTH", price:45, image:"images/hma-vpn.jpg", category:"VPN"},
  {name:"HMA PRO VPN 1 YEAR", price:90, image:"images/hma-vpn.jpg", category:"VPN"},
  {name:"IPVANISH VPN 6 MONTHS", price:55, image:"images/ipvanish-vpn.jpg", category:"VPN"},
  {name:"IPVANISH VPN 1 YEAR", price:90, image:"images/ipvanish-vpn.jpg", category:"VPN"},
  {name:"NORD VPN 1 MONTH", price:45, image:"images/nord-vpn.png", category:"VPN"},
  {name:"NORD VPN 1 YEAR", price:90, image:"images/nord-vpn.png", category:"VPN"},
  {name:"NORD VPN 2 YEARS", price:120, image:"images/nord-vpn.png", category:"VPN"},
  {name:"CYBER GHOST VPN 1 MONTH", price:45, image:"images/cyberghost-vpn.jpg", category:"VPN"},
  {name:"CYBER GHOST VPN 6 MONTHS", price:50, image:"images/cyberghost-vpn.jpg", category:"VPN"},
  {name:"CYBER GHOST VPN 2 YEARS", price:90, image:"images/cyberghost-vpn.jpg", category:"VPN"},

  {name:"GMAIL PHONE VERIFIED ACCOUNT", price:25, image:"images/gmail.jpg", category:"Accounts"},
  {name:"USA FACEBOOK ACCOUNT", price:50, image:"images/facebook.png", category:"Accounts"},
  {name:"NETFLIX SHARED 1 MONTH", price:35, image:"images/netflix.png", category:"Accounts"},
  {name:"NETFLIX PERSONAL 1 MONTH", price:70, image:"images/netflix.png", category:"Accounts"},
  {name:"SPOTIFY PREMIUM 1 MONTH", price:40, image:"images/spotify.png", category:"Accounts"},

  {name:"TEXTNOW ACCOUNT", price:25, image:"images/textnow.png", category:"Messaging"},
  {name:"TEXTFREE ACCOUNT", price:20, image:"images/textfree.png", category:"Messaging"},

  {name:"$2 ITUNES E-CODE", price:32, image:"images/itunes-2.png", category:"Giftcards"},
  {name:"$3 ITUNES E-CODE", price:43, image:"images/itunes-3.png", category:"Giftcards"},
  {name:"$4 ITUNES E-CODE", price:57, image:"images/itunes-4.png", category:"Giftcards"},
  {name:"$5 ITUNES E-CODE", price:70, image:"images/itunes-5.png", category:"Giftcards"},
  {name:"$10 ITUNES E-CODE", price:120, image:"images/itunes-10.png", category:"Giftcards"},
  {name:"$15 ITUNES E-CODE", price:215, image:"images/itunes-15.png", category:"Giftcards"},
  {name:"$20 ITUNES E-CODE", price:275, image:"images/itunes-20.png", category:"Giftcards"},

  {name:"10 PROXIES", price:25, image:"images/proxy.jpg", category:"Services"},
  {name:"25 PROXIES", price:65, image:"images/proxy.jpg", category:"Services"},
  {name:"50 PROXIES", price:100, image:"images/proxy.jpg", category:"Services"},
  {name:"100 PROXIES", price:200, image:"images/proxy.jpg", category:"Services"},
  {name:"150 PROXIES", price:325, image:"images/proxy.jpg", category:"Services"},
  {name:"200 PROXIES", price:400, image:"images/proxy.jpg", category:"Services"},

  {name:"1GB MTN DATA", price:6, image:DATA_IMAGE, category:"Data"},
  {name:"2GB MTN DATA", price:10, image:DATA_IMAGE, category:"Data"},
  {name:"3GB MTN DATA", price:15.50, image:DATA_IMAGE, category:"Data"},
  {name:"4GB MTN DATA", price:21.50, image:DATA_IMAGE, category:"Data"},
  {name:"5GB MTN DATA", price:25, image:DATA_IMAGE, category:"Data"},
  {name:"6GB MTN DATA", price:30, image:DATA_IMAGE, category:"Data"},
  {name:"8GB MTN DATA", price:40, image:DATA_IMAGE, category:"Data"},
  {name:"10GB MTN DATA", price:50, image:DATA_IMAGE, category:"Data"}
];

// ---------------- CART HELPERS ----------------
function getCart(){
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ---------------- PRODUCT DISPLAY ----------------
function renderProducts(category="all", search="") {
  const container = document.querySelector(".products-list");
  if (!container) return;

  let filtered = products;

  if(category !== "all"){
    filtered = filtered.filter(p => p.category === category);
  }

  if(search){
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  container.innerHTML = "";

  filtered.forEach(p=>{
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" class="product-image"/>
        <div>
          <h4>${p.name}</h4>
          <p>GHC ${p.price}</p>

          <button onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
          <button onclick="buyNow('${p.name}',${p.price})">Buy Now</button>
        </div>
      </div>
    `;
  });
}

// ---------------- CART ----------------
function addToCart(name, price){
  let cart = getCart();
  cart.push({name, price});
  saveCart(cart);
  updateCart();
}

function buyNow(name, price){
  saveCart([{name, price}]);
  updateCart();
  openCart();
}

function updateCart(){
  let cart = getCart();

  let count = document.getElementById("cartCount");
  if(count) count.textContent = cart.length;

  renderSideCart();
}

// ---------------- SIDE CART ----------------
function renderSideCart(){
  let cart = getCart();

  let box = document.getElementById("sideCartItems");
  let totalBox = document.getElementById("sideCartTotal");

  if(!box) return;

  box.innerHTML = "";

  let total = 0;

  cart.forEach(item=>{
    total += Number(item.price);

    box.innerHTML += `
      <div style="display:flex;justify-content:space-between;margin:6px 0;">
        <span>${item.name}</span>
        <span>GHC ${item.price}</span>
      </div>
    `;
  });

  if(totalBox) totalBox.textContent = total;
}

// ---------------- SEARCH ----------------
function searchProducts(){
  let val = document.getElementById("searchBar").value;
  renderProducts("all", val);
}

// ---------------- INIT ----------------
document.addEventListener("DOMContentLoaded", ()=>{
  renderProducts();
  updateCart();
});
