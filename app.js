// ===============================
// DHUB DIGITAL STORE APP
// PART 1
// ===============================

// ---------------------
// STATE
// ---------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---------------------
// PRODUCT DISPLAY
// ---------------------

function displayProducts(productList = products) {

    const container = document.getElementById("productsGrid");

    if (!container) return;

    container.innerHTML = "";

    productList.forEach(product => {

        container.innerHTML += `

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

                    <button class="add-cart"

                        onclick="addToCart(${product.id})">

                        <i class="fa-solid fa-cart-plus"></i>

                        Add to Cart

                    </button>

                    <button class="buy-now"

                        onclick="buyNow(${product.id})">

                        Buy Now

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// ---------------------
// SEARCH
// ---------------------

function searchProducts() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    const keyword = input.value.toLowerCase();

    const filtered = products.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword)

    );

    displayProducts(filtered);

}

// ---------------------
// CATEGORY FILTER
// ---------------------

document.querySelectorAll(".category-card").forEach(card => {

    card.addEventListener("click", () => {

        const category = card.dataset.category;

        if (category === "all") {

            displayProducts(products);

            return;

        }

        const filtered = products.filter(product =>

            product.category.toLowerCase() === category.toLowerCase()

        );

        displayProducts(filtered);

    });

});

// ---------------------
// TOAST
// ---------------------

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}
// ===============================
// PART 2
// SHOPPING CART
// ===============================

// ---------------------
// ADD TO CART
// ---------------------

function addToCart(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {

        existing.qty++;

    } else {

        cart.push({
            ...product,
            qty: 1
        });

    }

    saveCart();

    showToast(product.name + " added to cart");

}

// ---------------------
// BUY NOW
// ---------------------

function buyNow(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    localStorage.setItem("cart", JSON.stringify([
        {
            ...product,
            qty: 1
        }
    ]));

    window.location.href = "checkout.html";

}

// ---------------------
// SAVE CART
// ---------------------

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

}

// ---------------------
// UPDATE CART
// ---------------------

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    } else {

        cart.forEach(item => {

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

    if (cartTotal) {

        cartTotal.textContent = "GHS " + total;

    }

    if (cartCount) {

        cartCount.textContent = count;

    }

}

// ---------------------
// CHANGE QUANTITY
// ---------------------

function changeQty(id, value) {

    const item = cart.find(i => i.id === id);

    if (!item) return;

    item.qty += value;

    if (item.qty <= 0) {

        cart = cart.filter(i => i.id !== id);

    }

    saveCart();

}

// ---------------------
// REMOVE ITEM
// ---------------------

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

}

// ---------------------
// CHECKOUT
// ---------------------

const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your cart is empty");

            return;

        }

        window.location.href = "checkout.html";

    });

}
// ===============================
// PART 3
// HERO SLIDER + CART + INIT
// ===============================

// ================================
// HERO SLIDER
// ================================
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let totalSlides = slide.length;

if(slides){

function updateSlider(){

slides.style.transform=`translateX(-${currentSlide*100}%)`;

dots.forEach(dot=>dot.classList.remove("active"));

if(dots[currentSlide]){
dots[currentSlide].classList.add("active");
}

}

function nextSlide(){

currentSlide++;

if(currentSlide>=totalSlides){
currentSlide=0;
}

updateSlider();

}

let autoSlide=setInterval(nextSlide,5000);

dots.forEach((dot,index)=>{

dot.onclick=()=>{

currentSlide=index;

updateSlider();

};

});

let startX=0;

slides.addEventListener("touchstart",(e)=>{

startX=e.touches[0].clientX;

});

slides.addEventListener("touchend",(e)=>{

let endX=e.changedTouches[0].clientX;

if(startX-endX>50){

nextSlide();

}

if(endX-startX>50){

currentSlide--;

if(currentSlide<0){

currentSlide=totalSlides-1;

}

updateSlider();

}

});

updateSlider();

}

let autoSlide = setInterval(nextSlide, 5000);

// ------------------
// Dots
// ------------------

dots.forEach((dot,index)=>{

    dot.onclick=()=>{

        currentSlide=index;

        updateSlider();

        clearInterval(autoSlide);

        autoSlide=setInterval(nextSlide,5000);

    }

});

// ------------------
// Swipe Support
// ------------------

let startX=0;

let endX=0;

slides.addEventListener("touchstart",(e)=>{

    startX=e.touches[0].clientX;

});

slides.addEventListener("touchend",(e)=>{

    endX=e.changedTouches[0].clientX;

    if(startX-endX>50){

        nextSlide();

    }

    if(endX-startX>50){

        currentSlide--;

        if(currentSlide<0){

            currentSlide=totalSlides-1;

        }

        updateSlider();

    }

});

// Start

updateSlider();

// ---------------------
// CART OPEN/CLOSE
// ---------------------

const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCart");

function openCart() {

    if (cartSidebar) cartSidebar.classList.add("active");

    if (cartOverlay) cartOverlay.classList.add("active");

}

function closeCart() {

    if (cartSidebar) cartSidebar.classList.remove("active");

    if (cartOverlay) cartOverlay.classList.remove("active");

}

if (cartBtn) {

    cartBtn.addEventListener("click", openCart);

}

if (closeCartBtn) {

    closeCartBtn.addEventListener("click", closeCart);

}

if (cartOverlay) {

    cartOverlay.addEventListener("click", closeCart);

}

// ---------------------
// WEBSITE STARTUP
// ---------------------

document.addEventListener("DOMContentLoaded", () => {

    displayProducts();

    updateCart();

    updateSlider();

});

// ---------------------
// SUPPORT BUTTON
// ---------------------

function openSupport() {

    window.open("https://wa.me/233204496069", "_blank");

}
