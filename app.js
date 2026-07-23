// ============================
// CATEGORY CLICK
// ============================
document.querySelectorAll(".category-card")

.forEach(card=>{

card.onclick=()=>{

const category=card.dataset.category;

const filtered=products.filter(product=>

product.category.toLowerCase()==category.toLowerCase()

);

displayProducts(filtered);

}

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

// ===========================
// SHOPPING CART
// ===========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add product
function addToCart(id){

    const product = products.find(p => p.id === id);

    if(!product) return;

    const existing = cart.find(item => item.id === id);

    if(existing){

        existing.qty++;

    }else{

        cart.push({
            ...product,
            qty:1
        });

    }

    saveCart();
showToast(product.name+" added to cart");
}
function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

}
function updateCart(){

    const cartItems = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");

    const cartCount = document.getElementById("cartCount");

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;

    if(cart.length===0){

        cartItems.innerHTML=`
        <p class="empty-cart">
        Your cart is empty.
        </p>
        `;

    }else{

        cart.forEach(item=>{

            total += item.price * item.qty;

            count += item.qty;

            cartItems.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-details">

                    <h4>${item.name}</h4>

                    <p>GHS ${item.price}</p>

                    <div class="cart-controls">

                        <button onclick="changeQty(${item.id},-1)">−</button>

                        <span>${item.qty}</span>

                        <button onclick="changeQty(${item.id},1)">+</button>

                        <button onclick="removeItem(${item.id})">

                        <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </div>

            </div>

            `;

        });

    }

    cartTotal.textContent = "GHS " + total;

    cartCount.textContent = count;

}
function changeQty(id,value){

    const item = cart.find(i=>i.id===id);

    if(!item) return;

    item.qty += value;

    if(item.qty<=0){

        cart = cart.filter(i=>i.id!==id);

    }

    saveCart();

}
function removeItem(id){

    cart = cart.filter(item=>item.id!==id);

    saveCart();

}
document.addEventListener("DOMContentLoaded",()=>{

    displayProducts(products);

    updateCart();

});

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

// =============================
// LIVE SEARCH
// =============================

function searchProducts(){

const keyword=document
.getElementById("searchInput")
.value
.toLowerCase();

const filtered=products.filter(product=>

product.name.toLowerCase().includes(keyword)||

product.category.toLowerCase().includes(keyword)

);

displayProducts(filtered);

}

function displayProducts(productList){

const container=document.getElementById("productsGrid");

container.innerHTML="";

productList.forEach(product=>{

container.innerHTML+=`

<div class="product-card">

<div class="product-image">

<img src="${product.image}">

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

<button class="add-cart"

onclick="addToCart(${product.id})">

<i class="fa-solid fa-cart-plus"></i>

Add

</button>

<button class="buy-now">

Buy

</button>

</div>

</div>

</div>

`;

});

}
function showToast(message){

const toast=document.getElementById("toast");

toast.textContent=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}
