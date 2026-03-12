const products = [
{
name: "Netflix Account",
price: 20,
category: "netflix"
},
{
name: "NordVPN Account",
price: 15,
category: "nordvpn"
},
{
name: "PIA VPN Account",
price: 12,
category: "piavpn"
},
{
name: "TextNow / TextFree Number",
price: 10,
category: "textvoice"
},
{
name: "1GB Data Bundle",
price: 5,
category: "data"
}
];

let cart = [];

function displayProducts(list) {

const container = document.getElementById("products");
container.innerHTML = "";

list.forEach((product, index) => {

const item = document.createElement("div");
item.className = "product";

item.innerHTML = `
<h3>${product.name}</h3>
<p>GH₵${product.price}</p>
<button onclick="addToCart(${index})">Add to Cart</button>
`;

container.appendChild(item);

});

}

function showAllProducts(){
document.getElementById("header-title").innerText = "All Products";
displayProducts(products);
}

function selectCategory(category){

const filtered = products.filter(p => p.category === category);

document.getElementById("header-title").innerText = category.toUpperCase();

displayProducts(filtered);

}

function addToCart(index){

cart.push(products[index]);
updateCart();

}

function updateCart(){

const cartItems = document.getElementById("cartItems");
const total = document.getElementById("cartTotal");

cartItems.innerHTML = "";

let sum = 0;

cart.forEach(item => {

const div = document.createElement("div");
div.innerHTML = `${item.name} - GH₵${item.price}`;

cartItems.appendChild(div);

sum += item.price;

});

total.innerText = sum;

}

function openCart(){
document.getElementById("cartPanel").style.right = "0";
}

function closeCart(){
document.getElementById("cartPanel").style.right = "-400px";
}

function toggleMenu(){

const menu = document.getElementById("menu");

menu.style.display =
menu.style.display === "block" ? "none" : "block";

}

function goSupport(){
window.open("https://wa.me/233509329683","_blank");
}

function checkoutCart(){
alert("Checkout coming soon");
}

window.onload = showAllProducts;
