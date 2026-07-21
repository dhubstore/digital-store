let cart=[];

function addToCart(id){

const product=products.find(p=>p.id===id);

cart.push(product);

document.querySelector(".cart-count").textContent=cart.length;

alert(product.name+" added to cart!");

}
