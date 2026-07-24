let cart = JSON.parse(localStorage.getItem("cart")) || [];

let discount = 0;

const summary = document.getElementById("orderSummary");

function renderCheckout(){

summary.innerHTML="";

let total=0;

cart.forEach(item=>{

total += item.price * item.qty;

summary.innerHTML += `

<div class="order-item">

<span>${item.name} x ${item.qty}</span>

<strong>GHS ${item.price*item.qty}</strong>

</div>

`;

});

total -= discount;

if(total<0) total=0;

document.getElementById("grandTotal").innerHTML=

"Total: GHS "+total;

}

renderCheckout();

function applyCoupon(){

const code=document.getElementById("coupon").value.trim().toUpperCase();

if(code==="DHUB10"){

discount=10;

alert("Coupon Applied");

}else if(code==="WELCOME20"){

discount=20;

alert("Coupon Applied");

}else{

alert("Invalid Coupon");

}

renderCheckout();

}

document.getElementById("placeOrder").onclick=()=>{

if(cart.length===0){

alert("Cart is empty");

return;

}

const name=document.getElementById("name").value;

const phone=document.getElementById("phone").value;

const payment=document.getElementById("payment").value;

let message=`*NEW ORDER*%0A%0A`;

message+=`Name: ${name}%0A`;

message+=`Phone: ${phone}%0A`;

message+=`Payment: ${payment}%0A%0A`;

cart.forEach(item=>{

message+=`${item.name} x ${item.qty}%0A`;

});

window.open(

`https://wa.me/233204496069?text=${message}`,

"_blank"

);

localStorage.removeItem("cart");

};
