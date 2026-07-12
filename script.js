/* ==========================================
   DHUB DIGITAL STORE
========================================== */

console.log("DHub Digital Store Loaded");

/* ==========================
PRODUCTS
========================== */

const DATA_IMAGE = "images/data-bundle.png";

const products = [

/* ================= VPN ================= */

{id:1,name:"EXPRESS VPN 1 MONTH",price:45,image:"images/express-vpn.jpg",category:"vpn"},
{id:2,name:"EXPRESS VPN 3 MONTHS",price:60,image:"images/express-vpn.jpg",category:"vpn"},
{id:3,name:"EXPRESS VPN 1 YEAR",price:90,image:"images/express-vpn.jpg",category:"vpn"},

{id:4,name:"PIA VPN 1 MONTH",price:45,image:"images/pia-vpn.png",category:"vpn"},
{id:5,name:"PIA VPN 3 MONTHS",price:65,image:"images/pia-vpn.png",category:"vpn"},
{id:6,name:"PIA VPN 1 YEAR",price:90,image:"images/pia-vpn.png",category:"vpn"},

{id:7,name:"NORD VPN 1 MONTH",price:45,image:"images/nord-vpn.png",category:"vpn"},
{id:8,name:"NORD VPN 1 YEAR",price:90,image:"images/nord-vpn.png",category:"vpn"},

/* ================= ACCOUNTS ================= */

{id:9,name:"TEXTNOW ACCOUNT",price:25,image:"images/textnow.png",category:"accounts"},
{id:10,name:"TEXTFREE ACCOUNT",price:20,image:"images/textfree.png",category:"accounts"},
{id:11,name:"TEXTPLUS ACCOUNT",price:25,image:"images/textplus.png",category:"accounts"},
{id:12,name:"USA FACEBOOK ACCOUNT",price:50,image:"images/facebook.png",category:"accounts"},
{id:13,name:"GMAIL VERIFIED ACCOUNT",price:25,image:"images/gmail.jpg",category:"accounts"},

/* ================= SUBSCRIPTIONS ================= */

{id:14,name:"NETFLIX SHARED 1 MONTH",price:35,image:"images/netflix.png",category:"subscriptions"},
{id:15,name:"NETFLIX PERSONAL 1 MONTH",price:65,image:"images/netflix.png",category:"subscriptions"},
{id:16,name:"SPOTIFY PREMIUM 1 MONTH",price:40,image:"images/spotify.png",category:"subscriptions"},
{id:17,name:"SNAPCHAT PLUS 1 MONTH",price:40,image:"images/snapchat.png",category:"subscriptions"},
{id:18,name:"SNAPCHAT PLUS 1 YEAR",price:95,image:"images/snapchat.png",category:"subscriptions"},

/* ================= GIFT CARDS ================= */

{id:19,name:"$2 ITUNES E-CODE",price:32,image:"images/itunes-2.png",category:"giftcards"},
{id:20,name:"$3 ITUNES E-CODE",price:43,image:"images/itunes-3.png",category:"giftcards"},
{id:21,name:"$4 ITUNES E-CODE",price:57,image:"images/itunes-4.png",category:"giftcards"},
{id:22,name:"$5 ITUNES E-CODE",price:70,image:"images/itunes-5.png",category:"giftcards"},
{id:23,name:"$10 ITUNES E-CODE",price:120,image:"images/itunes-10.png",category:"giftcards"},
{id:24,name:"$15 ITUNES E-CODE",price:215,image:"images/itunes-15.png",category:"giftcards"},
{id:25,name:"$20 ITUNES E-CODE",price:275,image:"images/itunes-20.png",category:"giftcards"},

/* ================= DATA ================= */

{id:26,name:"1GB MTN DATA",price:6,image:DATA_IMAGE,category:"data"},
{id:27,name:"2GB MTN DATA",price:10,image:DATA_IMAGE,category:"data"},
{id:28,name:"3GB MTN DATA",price:15.50,image:DATA_IMAGE,category:"data"},
{id:29,name:"5GB MTN DATA",price:25,image:DATA_IMAGE,category:"data"},
{id:30,name:"10GB MTN DATA",price:50,image:DATA_IMAGE,category:"data"},

/* ================= SOCIAL ================= */

{id:31,name:"1K TIKTOK LIKES",price:10,image:"images/tiktok.png",category:"social"},
{id:32,name:"1K TIKTOK VIEWS",price:5,image:"images/tiktok.png",category:"social"},
{id:33,name:"500 TIKTOK FOLLOWERS",price:25,image:"images/tiktok.png",category:"social"},
{id:34,name:"1K TIKTOK FOLLOWERS",price:45,image:"images/tiktok.png",category:"social"},
{id:35,name:"1K INSTAGRAM LIKES",price:23,image:"images/instagram.png",category:"social"},
{id:36,name:"1K INSTAGRAM VIEWS",price:8,image:"images/instagram.png",category:"social"},
{id:37,name:"1K FACEBOOK FOLLOWERS",price:30,image:"images/facebook.png",category:"social"}

];

/* ==========================
LOCAL STORAGE
========================== */

let cart = JSON.parse(localStorage.getItem("dhubCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("dhubWishlist")) || [];

function saveCart(){
    localStorage.setItem("dhubCart", JSON.stringify(cart));
}

function saveWishlist(){
    localStorage.setItem("dhubWishlist", JSON.stringify(wishlist));
}
/* ==========================
DISPLAY PRODUCTS
========================== */

const productList = document.getElementById("productList");

function displayProducts(list){

    if(!productList) return;

    productList.innerHTML = "";

    list.forEach(product => {

        productList.innerHTML += `

        <div class="product-card">

            <div class="image-box">

                <img src="${product.image}"
                     onerror="this.src='images/default.png'">

            </div>

            <div class="product-details">

                <span class="category">${product.category}</span>

                <h3>${product.name}</h3>

                <div class="rating">
                    ★★★★★ <span>(4.9)</span>
                </div>

                <h2>GHS ${product.price}</h2>

                <div class="product-actions">

                    <button class="buy-btn"
                            onclick="addToCart(${product.id})">

                        <i class="fa-solid fa-cart-plus"></i>
                        Add to Cart

                    </button>

                    <button
                        class="wishlist-btn"
                        data-id="${product.id}"
                        onclick="toggleWishlist(${product.id})">

                        ♡

                    </button>

                </div>

            </div>

        </div>

        `;

    });

    refreshWishlist();

}


/* ==========================
SEARCH
========================== */

function searchProducts(){

    const input = document.getElementById("searchInput");

    if(!input) return;

    const keyword = input.value.toLowerCase();

    displayProducts(

        products.filter(product =>

            product.name.toLowerCase().includes(keyword)

        )

    );

}


/* ==========================
CATEGORY FILTER
========================== */

function filterProducts(category){

    if(category === "all"){

        displayProducts(products);
        return;

    }

    displayProducts(

        products.filter(product =>

            product.category === category

        )

    );

}


/* ==========================
ADD TO CART
========================== */

function addToCart(id){

    const product = products.find(p => p.id === id);

    if(!product){

        showNotification("Product not found");
        return;

    }

    let username = "";

    // Ask for username only for Social Boost products
    if(product.category === "social"){

        username = prompt("Enter your TikTok / Instagram / Facebook username or profile link:");

        if(username === null) return;

        username = username.trim();

        if(username === ""){

            showNotification("Username is required.");
            return;

        }

    }

    const existing = cart.find(item =>

        item.id === id &&
        item.username === username

    );

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            ...product,

            quantity:1,

            username:username

        });

    }

    saveCart();

    updateCart();

    showNotification(product.name + " added to cart.");

}
/* ==========================
UPDATE CART
========================== */

function updateCart(){

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const total = document.getElementById("total");

    let grandTotal = 0;
    let totalItems = 0;

    if(cartItems){

        cartItems.innerHTML = "";

        cart.forEach(item => {

            grandTotal += item.price * item.quantity;
            totalItems += item.quantity;

            cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-info">

                    <strong>${item.name}</strong>

                    ${item.username ? `<br><small>${item.username}</small>` : ""}

                    <br>

                    GHS ${item.price} × ${item.quantity}

                </div>

                <div class="cart-buttons">

                    <button onclick="changeQuantity(${item.id},-1)">−</button>

                    <button onclick="changeQuantity(${item.id},1)">+</button>

                    <button onclick="removeCart(${item.id})">❌</button>

                </div>

            </div>

            `;

        });

    }else{

        totalItems = cart.reduce((sum,item)=>sum+item.quantity,0);

        grandTotal = cart.reduce((sum,item)=>sum+(item.price*item.quantity),0);

    }

    if(cartCount){
        cartCount.innerHTML = totalItems;
    }

    if(total){
        total.innerHTML = "GHS " + grandTotal.toFixed(2);
    }

}


/* ==========================
CHANGE QUANTITY
========================== */

function changeQuantity(id, amount){

    const item = cart.find(p => p.id === id);

    if(!item) return;

    item.quantity += amount;

    if(item.quantity <= 0){

        removeCart(id);
        return;

    }

    saveCart();
    updateCart();

}


/* ==========================
REMOVE ITEM
========================== */

function removeCart(id){

    cart = cart.filter(item => item.id !== id);

    saveCart();

    updateCart();

    showNotification("Item removed from cart");

}


/* ==========================
CLEAR CART
========================== */

function clearCart(){

    cart = [];

    saveCart();

    updateCart();

    showNotification("Cart cleared");

}


/* ==========================
TOGGLE CART
========================== */

function toggleCart(){

    const box = document.getElementById("cartBox");

    if(box){

        box.classList.toggle("active");

    }

}


/* ==========================
CHECKOUT
========================== */

function checkout(){

    if(cart.length === 0){

        showNotification("Your cart is empty");
        return;

    }

    saveCart();

    window.location.href = "checkout.html";

}
/* ==========================
NOTIFICATIONS
========================== */

function showNotification(message){

    const old = document.querySelector(".notification");
    if(old) old.remove();

    const box = document.createElement("div");

    box.className = "notification";
    box.innerHTML = message;

    document.body.appendChild(box);

    setTimeout(()=>{
        box.classList.add("show");
    },100);

    setTimeout(()=>{
        box.classList.remove("show");

        setTimeout(()=>{
            box.remove();
        },300);

    },2500);

}


/* ==========================
WISHLIST
========================== */

function toggleWishlist(id){

    if(wishlist.includes(id)){

        wishlist = wishlist.filter(item => item !== id);
        showNotification("Removed from wishlist");

    }else{

        wishlist.push(id);
        showNotification("Added to wishlist");

    }

    saveWishlist();
    refreshWishlist();

}

function refreshWishlist(){

    document.querySelectorAll(".wishlist-btn").forEach(btn=>{

        const id = Number(btn.dataset.id);

        btn.innerHTML = wishlist.includes(id)
            ? "❤"
            : "♡";

    });

}


/* ==========================
THEME
========================== */

function toggleTheme(){

    document.body.classList.toggle("light-mode");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("light-mode")
            ? "light"
            : "dark"
    );

}

if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light-mode");
}


/* ==========================
HERO SLIDER
========================== */

let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function nextSlide(){

    if(slides.length === 0) return;

    slides[slideIndex].classList.remove("active");

    slideIndex++;

    if(slideIndex >= slides.length){
        slideIndex = 0;
    }

    slides[slideIndex].classList.add("active");

}

if(slides.length > 0){
    setInterval(nextSlide,5000);
}


/* ==========================
COUNTDOWN
========================== */

const endTime = Date.now() + (24 * 60 * 60 * 1000);

function updateCountdown(){

    const countdown = document.getElementById("countdown");

    if(!countdown) return;

    const distance = endTime - Date.now();

    if(distance <= 0){

        countdown.innerHTML = "Sale Ended";
        return;

    }

    const h = Math.floor(distance / 1000 / 60 / 60);
    const m = Math.floor((distance / 1000 / 60) % 60);
    const s = Math.floor((distance / 1000) % 60);

    countdown.innerHTML = `${h}h ${m}m ${s}s`;

}

setInterval(updateCountdown,1000);
updateCountdown();


/* ==========================
MOBILE MENU
========================== */

/* ==========================
MOBILE SIDEBAR
========================== */

function toggleMenu() {
    document.getElementById("mobileMenu").classList.add("active");
    document.querySelector(".menu-overlay").classList.add("active");
}

function closeMenu() {
    document.getElementById("mobileMenu").classList.remove("active");
    document.querySelector(".menu-overlay").classList.remove("active");
}


/* ==========================
CLICK OUTSIDE CART
========================== */

document.addEventListener("click",function(e){

    const cartBox = document.getElementById("cartBox");
    const cartButton = document.querySelector(".cart-btn");

    if(!cartBox || !cartButton) return;

    if(
        !cartBox.contains(e.target) &&
        !cartButton.contains(e.target)
    ){
        cartBox.classList.remove("active");
    }

});


/* ==========================
INITIALIZE
========================== */

displayProducts(products);

updateCart();

refreshWishlist();

console.log("✅ DHub Digital Store Ready");
