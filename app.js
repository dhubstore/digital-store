// ============================
// CATEGORY CLICK
// ============================

document.querySelectorAll(".category-card").forEach(card=>{

card.addEventListener("click",()=>{

const category=card.dataset.category;

console.log("Selected:",category);

// Products filtering will be connected later.

});

});

function loadProducts(){

const container=document.getElementById("productsGrid");

if(!container) return;

container.innerHTML="";

products.forEach(product=>{

container.innerHTML+=`

<div class="product-card">

<div class="product-image">

<img src="${product.image}" alt="${product.name}">

</div>

<div class="product-info">

<div class="product-category">

${product.category}

</div>

<h3 class="product-title">

${product.name}

</h3>

<div class="product-price">

GHS ${product.price}

</div>

<div class="product-buttons">

<button class="add-cart" onclick="addToCart(${product.id})">
    <i class="fa-solid fa-cart-plus"></i>
    Add to Cart
</button>

<button class="buy-now">

Buy Now

</button>

</div>

</div>

</div>

`;

});

}

document.addEventListener("DOMContentLoaded",loadProducts);
// =========================
// CART OPEN / CLOSE
// =========================

const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartButton = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

if (cartButton) {
    cartButton.onclick = () => {
        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");
    };
}

if (closeCart) {
    closeCart.onclick = closeShoppingCart;
}

if (cartOverlay) {
    cartOverlay.onclick = closeShoppingCart;
}

function closeShoppingCart() {

    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");

}
