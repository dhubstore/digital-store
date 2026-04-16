const products = [
  {name:"MTN 1GB", price:5, category:"data", image:"https://via.placeholder.com/200"},
  {name:"MTN 5GB", price:20, category:"data", image:"https://via.placeholder.com/200"},
  {name:"Netflix Premium", price:15, category:"subscription", image:"https://via.placeholder.com/200"},
  {name:"Spotify Premium", price:10, category:"subscription", image:"https://via.placeholder.com/200"},
  {name:"Snapchat+", price:8, category:"subscription", image:"https://via.placeholder.com/200"},
  {name:"Nord VPN", price:12, category:"vpn", image:"https://via.placeholder.com/200"},
  {name:"Express VPN", price:15, category:"vpn", image:"https://via.placeholder.com/200"}
];

let cart = [];

function displayProducts(list){
  const container = document.getElementById("productList");
  container.innerHTML = "";

  list.forEach((p,i)=>{
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  });
}

function filterProducts(category){
  if(category === 'all') return displayProducts(products);
  displayProducts(products.filter(p=>p.category===category));
}

function addToCart(index){
  cart.push(products[index]);
  updateCart();
}

function updateCart(){
  document.getElementById("cartCount").innerText = cart.length;
  const items = document.getElementById("cartItems");
  const total = document.getElementById("total");

  items.innerHTML = "";
  let sum = 0;

  cart.forEach(item=>{
    sum += item.price;
    items.innerHTML += `<div class='cart-item'>${item.name} - $${item.price}</div>`;
  });

  total.innerText = "Total: $" + sum;
}

function toggleCart(){
  const box = document.getElementById("cartBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

function checkout(){
  let message = "Hello, I want to order:%0A";

  cart.forEach(item=>{
    message += `${item.name} - $${item.price}%0A`;
  });

  // 🔥 PUT YOUR NUMBER HERE
  window.location.href = `https://wa.me/233XXXXXXXXX?text=${message}`;
}

displayProducts(products);
