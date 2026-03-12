// Product data with images
const productsData = {
  netflix: [
    { name: "1 MONTH NETFLIX ACCOUNT", price: 20, image: "https://i.imgur.com/netflix.png" },
    { name: "SPOTIFY SUBSCRIPTION", price: 35, image: "https://i.imgur.com/spotify.png" }
  ],
  nordvpn: [
    { name: "NORD VPN 1 MONTH ACCOUNT", price: 30, image: "https://i.imgur.com/nord-vpn.jpg" },
    { name: "NORD VPN 1 YEAR ACCOUNT", price: 70, image: "https://i.imgur.com/nord-vpn.jpg" }
  ],
  piavpn: [
    { name: "PIA VPN 1 MONTH ACCOUNT", price: 40, image: "https://i.imgur.com/express-vpn.jpg" },
    { name: "PIA VPN 3 MONTHS ACCOUNT", price: 55, image: "https://i.imgur.com/express-vpn.jpg" },
    { name: "PIA VPN 1 YEAR ACCOUNT", price: 85, image: "https://i.imgur.com/express-vpn.jpg" }
  ],
  textvoice: [
    { name: "TEXTFREE ACCOUNT", price: 20, image: "https://i.imgur.com/default.png" },
    { name: "TEXTNOW ACCOUNT", price: 30, image: "https://i.imgur.com/default.png" },
    { name: "GOOGLE VOICE ACCOUNT", price: 35, image: "https://i.imgur.com/default.png" }
  ],
  data: [
    { name: "1GB MTN DATA BUNDLE", price: 5, image: "https://i.imgur.com/data-bundle.png" },
    { name: "2GB MTN DATA BUNDLE", price: 10, image: "https://i.imgur.com/data-bundle.png" },
    { name: "3GB MTN DATA BUNDLE", price: 15, image: "https://i.imgur.com/data-bundle.png" },
    { name: "4GB MTN DATA BUNDLE", price: 20, image: "https://i.imgur.com/data-bundle.png" },
    { name: "5GB MTN DATA BUNDLE", price: 24, image: "https://i.imgur.com/data-bundle.png" },
    { name: "6GB MTN DATA BUNDLE", price: 28, image: "https://i.imgur.com/data-bundle.png" },
    { name: "8GB MTN DATA BUNDLE", price: 37, image: "https://i.imgur.com/data-bundle.png" }
  ]
};

// DOM elements
const productsDiv = document.getElementById("products");
const headerTitle = document.getElementById("header-title");

// Select category and display products
function selectCategory(category) {
  productsDiv.innerHTML = "";
  headerTitle.textContent = "Products: " + category.toUpperCase();

  productsData[category].forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width:100%;border-radius:12px;margin-bottom:10px;">
      <h3>${product.name}</h3>
      <div class="price">GH₵${product.price}</div>
      <button class="btn buy" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
    `;
    productsDiv.appendChild(card);
  });
}

// Toggle menu
function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

// Open cart page
function openCartPage() {
  window.location.href = "cart.html";
}

// Add to cart
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

// Support box
function goSupport() {
  document.getElementById("supportBox").style.display = "block";
}
function closeSupportBox() {
  document.getElementById("supportBox").style.display = "none";
}

// Send support message
function sendSupportMessage() {
  const msg = document.getElementById("supportMessage").value;
  if (msg.trim() === "") {
    alert("Please enter a message.");
    return;
  }
  alert("Thank you! Support will contact you soon.\nMessage: " + msg);
  document.getElementById("supportMessage").value = "";
  closeSupportBox();
}

// Load default category on page load
window.onload = function() {
  selectCategory("netflix"); // Default
};
