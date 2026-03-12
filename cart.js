let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
cart.push({name, price});
localStorage.setItem("cart", JSON.stringify(cart));
alert("Added to cart");
}

function displayCart(){

const container = document.getElementById("cart-items");

if(!container) return;

let total = 0;
container.innerHTML="";

cart.forEach((item,index)=>{

total += item.price;

container.innerHTML += `
<p>${item.name} - $${item.price}
<button onclick="removeItem(${index})">Remove</button>
</p>
`;

});

document.getElementById("cart-total").innerText="Total: $"+total;

}

function removeItem(i){
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
displayCart();
}

displayCart();
