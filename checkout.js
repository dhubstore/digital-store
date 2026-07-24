const cart = JSON.parse(localStorage.getItem("cart")) || [];

const summary = document.getElementById("orderSummary");

let total = 0;

cart.forEach(item=>{

total += item.price * item.qty;

summary.innerHTML += `

<div class="order-item">

<span>${item.name} × ${item.qty}</span>

<strong>GHS ${item.price * item.qty}</strong>

</div>

`;

});

summary.innerHTML += `

<h2>Total: GHS ${total}</h2>

`;

document
.getElementById("checkoutForm")
.addEventListener("submit",function(e){

e.preventDefault();

alert("Order placed successfully!");

localStorage.removeItem("cart");

window.location.href="index.html";

});
