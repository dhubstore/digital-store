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

{
id:1,
name:"EXPRESS VPN 1 MONTH",
price:45,
oldPrice:60,
rating:4.9,
reviews:248,
badge:"POPULAR",
delivery:"Instant Delivery",
description:"Premium ExpressVPN subscription with fast activation and secure browsing.",
image:"images/express-vpn.jpg",
category:"vpn"
},

{
id:2,
name:"EXPRESS VPN 3 MONTHS",
price:60,
oldPrice:80,
rating:4.9,
reviews:176,
badge:"SAVE 25%",
delivery:"Instant Delivery",
description:"3-month ExpressVPN subscription with instant activation.",
image:"images/express-vpn.jpg",
category:"vpn"
},

{
id:3,
name:"EXPRESS VPN 1 YEAR",
price:90,
oldPrice:120,
rating:5.0,
reviews:325,
badge:"BEST VALUE",
delivery:"Instant Delivery",
description:"1-year ExpressVPN subscription for maximum savings and privacy.",
image:"images/express-vpn.jpg",
category:"vpn"
},

{
id:4,
name:"PIA VPN 1 MONTH",
price:45,
oldPrice:55,
rating:4.8,
reviews:193,
badge:"POPULAR",
delivery:"Instant Delivery",
description:"Private Internet Access VPN subscription with instant activation.",
image:"images/pia-vpn.png",
category:"vpn"
},

{
id:5,
name:"PIA VPN 3 MONTHS",
price:65,
oldPrice:80,
rating:4.8,
reviews:142,
badge:"SAVE 20%",
delivery:"Instant Delivery",
description:"3-month PIA VPN subscription with secure private browsing.",
image:"images/pia-vpn.png",
category:"vpn"
},

{
id:6,
name:"PIA VPN 1 YEAR",
price:90,
oldPrice:120,
rating:4.9,
reviews:286,
badge:"BEST SELLER",
delivery:"Instant Delivery",
description:"1-year PIA VPN subscription with premium security and privacy.",
image:"images/pia-vpn.png",
category:"vpn"
},

{
id:7,
name:"NORD VPN 1 MONTH",
price:45,
oldPrice:60,
rating:4.9,
reviews:214,
badge:"TRENDING",
delivery:"Instant Delivery",
description:"Premium NordVPN subscription with secure and private browsing.",
image:"images/nord-vpn.png",
category:"vpn"
},

{
id:8,
name:"NORD VPN 1 YEAR",
price:90,
oldPrice:120,
rating:5.0,
reviews:351,
badge:"TOP RATED",
delivery:"Instant Delivery",
description:"1-year NordVPN subscription with premium online protection.",
image:"images/nord-vpn.png",
category:"vpn"
},

/* ================= ACCOUNTS ================= */

{
id:9,
name:"TEXTNOW ACCOUNT",
price:25,
oldPrice:35,
rating:4.8,
reviews:134,
badge:"HOT",
delivery:"5–15 Minutes",
description:"Verified TextNow account ready for instant use.",
image:"images/textnow.png",
category:"accounts"
},

{
id:10,
name:"TEXTFREE ACCOUNT",
price:20,
oldPrice:30,
rating:4.8,
reviews:112,
badge:"POPULAR",
delivery:"5–15 Minutes",
description:"Premium TextFree account delivered quickly.",
image:"images/textfree.png",
category:"accounts"
},

{
id:11,
name:"TEXTPLUS ACCOUNT",
price:25,
oldPrice:35,
rating:4.7,
reviews:98,
badge:"RECOMMENDED",
delivery:"5–15 Minutes",
description:"Ready-to-use TextPlus account with fast delivery.",
image:"images/textplus.png",
category:"accounts"
},

{
id:12,
name:"USA FACEBOOK ACCOUNT",
price:50,
oldPrice:70,
rating:4.9,
reviews:187,
badge:"BEST SELLER",
delivery:"5–15 Minutes",
description:"USA-based Facebook account with instant delivery.",
image:"images/facebook.png",
category:"accounts"
},

{
id:13,
name:"GMAIL VERIFIED ACCOUNT",
price:25,
oldPrice:35,
rating:4.9,
reviews:261,
badge:"TOP RATED",
delivery:"5–15 Minutes",
description:"Verified Gmail account ready for personal or business use.",
image:"images/gmail.jpg",
category:"accounts"
},
/* ================= SUBSCRIPTIONS ================= */

{
id:14,
name:"NETFLIX SHARED 1 MONTH",
price:35,
oldPrice:50,
rating:4.9,
reviews:286,
badge:"BEST SELLER",
delivery:"Instant Activation",
description:"Premium shared Netflix subscription with instant activation.",
image:"images/netflix.png",
category:"subscriptions"
},

{
id:15,
name:"NETFLIX PERSONAL 1 MONTH",
price:65,
oldPrice:80,
rating:5.0,
reviews:198,
badge:"PREMIUM",
delivery:"Instant Activation",
description:"Personal Netflix subscription with full access and instant activation.",
image:"images/netflix.png",
category:"subscriptions"
},

{
id:16,
name:"SPOTIFY PREMIUM 1 MONTH",
price:40,
oldPrice:55,
rating:4.9,
reviews:243,
badge:"POPULAR",
delivery:"Instant Activation",
description:"Spotify Premium subscription with ad-free music and offline downloads.",
image:"images/spotify.png",
category:"subscriptions"
},

{
id:17,
name:"SNAPCHAT PLUS 1 MONTH",
price:40,
oldPrice:55,
rating:4.9,
reviews:315,
badge:"TRENDING",
delivery:"Instant Activation",
description:"Snapchat+ subscription with exclusive premium features.",
image:"images/snapchat.png",
category:"subscriptions"
},

{
id:18,
name:"SNAPCHAT PLUS 1 YEAR",
price:95,
oldPrice:120,
rating:5.0,
reviews:172,
badge:"BEST VALUE",
delivery:"Instant Activation",
description:"1-year Snapchat+ subscription with premium features and maximum savings.",
image:"images/snapchat.png",
category:"subscriptions"
},
/* ================= GIFT CARDS ================= */

{
id:19,
name:"$2 ITUNES E-CODE",
price:32,
oldPrice:40,
rating:4.9,
reviews:118,
badge:"POPULAR",
delivery:"Digital Code",
description:"$2 Apple iTunes gift card delivered instantly via digital code.",
image:"images/itunes-2.png",
category:"giftcards"
},

{
id:20,
name:"$3 ITUNES E-CODE",
price:43,
oldPrice:50,
rating:4.9,
reviews:104,
badge:"HOT",
delivery:"Digital Code",
description:"$3 Apple iTunes gift card with instant digital delivery.",
image:"images/itunes-3.png",
category:"giftcards"
},

{
id:21,
name:"$4 ITUNES E-CODE",
price:57,
oldPrice:65,
rating:4.9,
reviews:96,
badge:"RECOMMENDED",
delivery:"Digital Code",
description:"$4 Apple iTunes gift card delivered as a secure digital code.",
image:"images/itunes-4.png",
category:"giftcards"
},

{
id:22,
name:"$5 ITUNES E-CODE",
price:70,
oldPrice:80,
rating:5.0,
reviews:185,
badge:"BEST SELLER",
delivery:"Digital Code",
description:"$5 Apple iTunes gift card with instant code delivery.",
image:"images/itunes-5.png",
category:"giftcards"
},

{
id:23,
name:"$10 ITUNES E-CODE",
price:120,
oldPrice:140,
rating:5.0,
reviews:241,
badge:"TOP RATED",
delivery:"Digital Code",
description:"$10 Apple iTunes gift card delivered instantly after purchase.",
image:"images/itunes-10.png",
category:"giftcards"
},

{
id:24,
name:"$15 ITUNES E-CODE",
price:215,
oldPrice:240,
rating:4.9,
reviews:88,
badge:"LIMITED OFFER",
delivery:"Digital Code",
description:"$15 Apple iTunes gift card with secure and instant digital delivery.",
image:"images/itunes-15.png",
category:"giftcards"
},

{
id:25,
name:"$20 ITUNES E-CODE",
price:275,
oldPrice:300,
rating:5.0,
reviews:153,
badge:"BEST VALUE",
delivery:"Digital Code",
description:"$20 Apple iTunes gift card delivered instantly as a redeemable code.",
image:"images/itunes-20.png",
category:"giftcards"
},
 /* ================= DATA ================= */

{
id:26,
name:"1GB MTN DATA",
price:6,
oldPrice:8,
rating:4.9,
reviews:412,
badge:"FAST DELIVERY",
delivery:"1–5 Minutes",
description:"1GB MTN data bundle delivered directly to your number within minutes.",
image:DATA_IMAGE,
category:"data"
},

{
id:27,
name:"2GB MTN DATA",
price:10,
oldPrice:12,
rating:4.9,
reviews:365,
badge:"POPULAR",
delivery:"1–5 Minutes",
description:"2GB MTN data bundle with fast and reliable delivery.",
image:DATA_IMAGE,
category:"data"
},

{
id:28,
name:"3GB MTN DATA",
price:15.50,
oldPrice:18,
rating:4.9,
reviews:298,
badge:"BEST SELLER",
delivery:"1–5 Minutes",
description:"3GB MTN data bundle delivered instantly after purchase.",
image:DATA_IMAGE,
category:"data"
},

{
id:29,
name:"5GB MTN DATA",
price:25,
oldPrice:30,
rating:5.0,
reviews:527,
badge:"TOP RATED",
delivery:"1–5 Minutes",
description:"5GB MTN data bundle with quick and secure activation.",
image:DATA_IMAGE,
category:"data"
},

{
id:30,
name:"10GB MTN DATA",
price:50,
oldPrice:60,
rating:5.0,
reviews:241,
badge:"BEST VALUE",
delivery:"1–5 Minutes",
description:"10GB MTN data bundle for uninterrupted browsing and streaming.",
image:DATA_IMAGE,
category:"data"
},

/* ================= SOCIAL ================= */

{
id:31,
name:"1K TIKTOK LIKES",
price:10,
oldPrice:15,
rating:4.8,
reviews:189,
badge:"TRENDING",
delivery:"Starts Within 24 Hours",
description:"1,000 high-quality TikTok likes to boost your engagement.",
image:"images/tiktok.png",
category:"social"
},

{
id:32,
name:"1K TIKTOK VIEWS",
price:5,
oldPrice:8,
rating:4.8,
reviews:274,
badge:"POPULAR",
delivery:"Starts Within 24 Hours",
description:"1,000 TikTok video views delivered gradually for a natural appearance.",
image:"images/tiktok.png",
category:"social"
},

{
id:33,
name:"500 TIKTOK FOLLOWERS",
price:25,
oldPrice:35,
rating:4.9,
reviews:143,
badge:"HOT",
delivery:"Starts Within 24 Hours",
description:"500 real-looking TikTok followers to grow your profile.",
image:"images/tiktok.png",
category:"social"
},

{
id:34,
name:"1K TIKTOK FOLLOWERS",
price:45,
oldPrice:60,
rating:5.0,
reviews:217,
badge:"BEST SELLER",
delivery:"Starts Within 24 Hours",
description:"1,000 TikTok followers with fast and reliable delivery.",
image:"images/tiktok.png",
category:"social"
},

{
id:35,
name:"1K INSTAGRAM LIKES",
price:23,
oldPrice:30,
rating:4.9,
reviews:201,
badge:"POPULAR",
delivery:"Starts Within 24 Hours",
description:"1,000 Instagram likes to increase engagement on your posts.",
image:"images/instagram.png",
category:"social"
},

{
id:36,
name:"1K INSTAGRAM VIEWS",
price:8,
oldPrice:12,
rating:4.8,
reviews:162,
badge:"RECOMMENDED",
delivery:"Starts Within 24 Hours",
description:"1,000 Instagram video views with gradual delivery.",
image:"images/instagram.png",
category:"social"
},

{
id:37,
name:"1K FACEBOOK FOLLOWERS",
price:30,
oldPrice:40,
rating:4.9,
reviews:118,
badge:"TOP RATED",
delivery:"Starts Within 24 Hours",
description:"1,000 Facebook followers delivered safely to help grow your page.",
image:"images/facebook.png",
category:"social"
}

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

    productList.innerHTML="";

    list.forEach(product=>{

        productList.innerHTML +=`

<div class="product-card">

    <div class="badge">${product.badge || ""}</div>

    <button
        class="wishlist-btn"
        data-id="${product.id}"
        onclick="toggleWishlist(${product.id})">

        ♡

    </button>

    <div class="image-box">

        <img src="${product.image}"
             onerror="this.src='images/default.png'">

    </div>

    <div class="delivery">

        ⚡ ${product.delivery || "Instant Delivery"}

    </div>

    <div class="rating">

        ⭐ ${product.rating || 4.9}

        <span>(${product.reviews || 100})</span>

    </div>

    <h3>${product.name}</h3>

    <p class="product-desc">

        ${product.description || "Premium digital product."}

    </p>

    <div class="price-box">

        <span class="new-price">

            GHS ${product.price}

        </span>

        ${product.oldPrice
            ? `<span class="old-price">GHS ${product.oldPrice}</span>`
            : ""}

    </div>

    <div class="product-buttons">

        <button
            class="buy-btn"
            onclick="addToCart(${product.id})">

            🛒 Add to Cart

        </button>

        <button
            class="view-btn"
            onclick="quickView(${product.id})">

            👁 View

        </button>

    </div>

</div>
       
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


/*=========================
HERO V2 SLIDER
=========================*/

let heroIndex = 0;

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".dot");

function showHero(index){

    heroSlides.forEach(slide=>slide.classList.remove("active"));
    heroDots.forEach(dot=>dot.classList.remove("active"));

    heroSlides[index].classList.add("active");
    heroDots[index].classList.add("active");

}

function nextHero(){

    heroIndex++;

    if(heroIndex >= heroSlides.length){

        heroIndex = 0;

    }

    showHero(heroIndex);

}

function prevHero(){

    heroIndex--;

    if(heroIndex < 0){

        heroIndex = heroSlides.length-1;

    }

    showHero(heroIndex);

}

document.querySelector(".hero-next")?.addEventListener("click",nextHero);

document.querySelector(".hero-prev")?.addEventListener("click",prevHero);

heroDots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        heroIndex=index;

        showHero(heroIndex);

    });

});

setInterval(nextHero,5000);

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

/*=========================
FLASH DEAL TIMER
=========================*/

const flashEnd = Date.now() + (4 * 60 * 60 * 1000);

function updateFlashTimer(){

    const timer = document.getElementById("flashTimer");

    if(!timer) return;

    const distance = flashEnd - Date.now();

    if(distance <= 0){

        timer.innerHTML = "Expired";

        return;

    }

    const h = Math.floor(distance / 1000 / 60 / 60);

    const m = Math.floor((distance / 1000 / 60) % 60);

    const s = Math.floor((distance / 1000) % 60);

    timer.innerHTML =
        `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

}

setInterval(updateFlashTimer,1000);

updateFlashTimer();

/* ==========================
MOBILE SIDEBAR
========================== */

const mobileMenu = document.getElementById("mobileMenu");
const menuOverlay = document.querySelector(".menu-overlay");

function toggleMenu(){

    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");
    document.body.classList.add("menu-open");

}

function closeMenu(){

    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");

}

/* ==========================
CLICK OUTSIDE MENU
========================== */

document.addEventListener("click", function(e){

    if(
        mobileMenu &&
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(e.target) &&
        !e.target.closest(".menu-btn")
    ){

        closeMenu();

    }

});


/* ==========================
INITIALIZE
========================== */

displayProducts(products);

updateCart();

refreshWishlist();

/* ==========================
BEST SELLERS SLIDER
========================== */

function loadBestSellerSlider(){

    const slider = document.getElementById("bestSellerSlider");

    if(!slider) return;

    slider.innerHTML = "";

    // Duplicate products for infinite scrolling
    const sliderProducts = [...products.slice(0,10), ...products.slice(0,10)];

    sliderProducts.forEach(product=>{

        slider.innerHTML += `

        <div class="slider-card">

    <div class="deal-ribbon">
        SAVE 20%
    </div>

            <img src="${product.image}" onerror="this.src='images/default.png'">

            <h4>${product.name}</h4>

            <span>GHS ${product.price}</span>

            <button onclick="addToCart(${product.id})">

                Add to Cart

            </button>

        </div>

        `;

    });

}

loadBestSellerSlider();

   /* ==========================
AUTO SCROLL
========================== */

const slider = document.getElementById("bestSellerSlider");

if(slider){

    let speed = 1;

    function autoScroll(){

        slider.scrollLeft += speed;

        if(slider.scrollLeft >= slider.scrollWidth/2){

            slider.scrollLeft = 0;

        }

        requestAnimationFrame(autoScroll);

    }

    autoScroll();

}   

loadBestSellerSlider();

/* ==========================
PROMO AUTO SLIDER
========================== */

const promoTrack = document.getElementById("promoTrack");

if(promoTrack){

    // Duplicate cards for infinite effect
    promoTrack.innerHTML += promoTrack.innerHTML;

    let promoSpeed = 0.8;

    function promoAutoSlide(){

       if(!pausePromo){

    promoTrack.scrollLeft += promoSpeed;

}

        if(promoTrack.scrollLeft >= promoTrack.scrollWidth / 2){

            promoTrack.scrollLeft = 0;

        }

        requestAnimationFrame(promoAutoSlide);

    }

    promoAutoSlide();

}
   let pausePromo = false;

promoTrack?.addEventListener("mouseenter", () => {

    pausePromo = true;

});

promoTrack?.addEventListener("mouseleave", () => {

    pausePromo = false;

});
promoTrack?.addEventListener("touchstart", () => {

    pausePromo = true;

});

promoTrack?.addEventListener("touchend", () => {

    pausePromo = false;

});

/* ==========================
MORE HOME SLIDERS
========================== */

createSlider("trendingRow", products.slice(4,12));

createSlider("newArrivalRow", products.slice(12,20));

createSlider("topDealRow", products.slice(20,30));

/*==========================
HERO SLIDER
==========================*/

const heroSlides = document.querySelectorAll(".hero-slide");

const heroDots = document.querySelectorAll(".hero-dots span");

let heroIndex = 0;

function showHero(i){

heroSlides.forEach(slide=>slide.classList.remove("active"));

heroDots.forEach(dot=>dot.classList.remove("active"));

heroSlides[i].classList.add("active");

heroDots[i].classList.add("active");

}

function nextHero(){

heroIndex++;

if(heroIndex>=heroSlides.length){

heroIndex=0;

}

showHero(heroIndex);

}

function prevHero(){

heroIndex--;

if(heroIndex<0){

heroIndex=heroSlides.length-1;

}

showHero(heroIndex);

}

document.querySelector(".hero-next").onclick=nextHero;

document.querySelector(".hero-prev").onclick=prevHero;

heroDots.forEach((dot,index)=>{

dot.onclick=()=>{

heroIndex=index;

showHero(index);

}

});

setInterval(nextHero,5000);

/*=========================
CATEGORY SLIDERS
=========================*/

createSlider("bestSellerSlider", products.slice(0,8));

createSlider("vpnSlider", products.filter(p=>p.category==="vpn"));

createSlider("streamSlider", products.filter(p=>p.category==="subscriptions"));

createSlider("giftSlider", products.filter(p=>p.category==="giftcards"));

createSlider("dataSlider", products.filter(p=>p.category==="data"));

createSlider("socialSlider", products.filter(p=>p.category==="social"));

/*=========================
TOP SELLERS
=========================*/

const topSlider=document.getElementById("topSellerSlider");

if(topSlider){

products.slice(0,10).forEach(product=>{

topSlider.innerHTML+=`

<div class="top-card">

<img src="${product.image}" onerror="this.src='images/default.png'">

<div class="info">

<h3>${product.name}</h3>

<h4>GHS ${product.price}</h4>

<button onclick="addToCart(${product.id})">

Add to Cart

</button>

</div>

</div>

`;

});

}

document.getElementById("topNext")?.addEventListener("click",()=>{

topSlider.scrollBy({

left:300,

behavior:"smooth"

});

});

document.getElementById("topPrev")?.addEventListener("click",()=>{

topSlider.scrollBy({

left:-300,

behavior:"smooth"

});

});

console.log("✅ DHub Digital Store Ready");
/* ==========================
BEST SELLERS
========================== */

const bestSellerSlider = document.getElementById("bestSellerSlider");

if(bestSellerSlider){

    const bestProducts = products.slice(0,8);

    bestProducts.forEach(product=>{

        bestSellerSlider.innerHTML += `

        <div class="best-card">

            <img src="${product.image}" onerror="this.src='images/default.png'">

            <h3>${product.name}</h3>

            <p>GHS ${product.price}</p>

            <button onclick="addToCart(${product.id})">

                Add to Cart

            </button>

        </div>

        `;

    });

}

/*==============================
QUICK ACTIONS
==============================*/

function scrollToTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

function focusSearch(){

    const desktop = document.getElementById("searchInput");
    const mobile = document.getElementById("mobileSearch");

    if(window.innerWidth <= 768){

        if(mobile){
            mobile.focus();
        }

    }else{

        if(desktop){
            desktop.focus();
        }

    }

}

/*=========================
TODAY'S DEALS COUNTDOWN
=========================*/

const dealEnd = new Date();

dealEnd.setHours(dealEnd.getHours() + 12);

function updateDealCountdown() {

    const now = new Date();

    const distance = dealEnd - now;

    if (distance <= 0) return;

    const h = Math.floor(distance / 1000 / 60 / 60);

    const m = Math.floor((distance / 1000 / 60) % 60);

    const s = Math.floor((distance / 1000) % 60);

    const timer = document.getElementById("dealCountdown");

    if (timer) {

        timer.innerHTML =

            `${String(h).padStart(2,"0")}:` +

            `${String(m).padStart(2,"0")}:` +

            `${String(s).padStart(2,"0")}`;

    }

}

setInterval(updateDealCountdown,1000);

updateDealCountdown();

/*=========================
HOME SLIDERS
==========================*/

function createSlider(id, list){

    const row = document.getElementById(id);

    if(!row) return;

    row.innerHTML="";

    list.forEach(product=>{

        row.innerHTML += `

        <div class="best-card">

            <img src="${product.image}" onerror="this.src='images/default.png'">

            <h3>${product.name}</h3>

            <p>GHS ${product.price}</p>

            <button onclick="addToCart(${product.id})">

                Add to Cart

            </button>

        </div>

        `;

    });

}

function quickView(id){

    const product = products.find(p => p.id === id);

    if(!product) return;

    document.getElementById("quickImage").src = product.image;

    document.getElementById("quickCategory").innerHTML = product.category;

    document.getElementById("quickName").innerHTML = product.name;

    document.getElementById("quickRating").innerHTML =
        product.rating || "4.9";

    document.getElementById("quickPrice").innerHTML =
        "GHS " + product.price;

    document.getElementById("quickDescription").innerHTML =
        product.description || "Premium digital product.";

    document.getElementById("quickAddCart").onclick = function(){

        addToCart(product.id);

        closeQuickView();

    };

    document
        .getElementById("quickViewOverlay")
        .classList.add("active");

}

function closeQuickView(){

    document
        .getElementById("quickViewOverlay")
        .classList.remove("active");

}

document
.getElementById("quickViewOverlay")
?.addEventListener("click",function(e){

    if(e.target === this){

        closeQuickView();

    }

});

createSlider("bestSellerRow",products.slice(0,8));

createSlider("vpnRow",

products.filter(p=>p.category==="vpn"));

createSlider("streamRow",

products.filter(p=>p.category==="subscriptions"));

createSlider("giftRow",

products.filter(p=>p.category==="giftcards"));

createSlider("dataRow",

products.filter(p=>p.category==="data"));
function quickView(id){

    const product = products.find(p => p.id === id);

    if(!product) return;

    showNotification(product.name + " details coming in Version 2.0");

}
