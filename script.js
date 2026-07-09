/* ===========================================
   DHUB DIGITAL STORE
   FINAL SCRIPT.JS
=========================================== */


/* ===========================================
   PRODUCTS DATABASE
=========================================== */


const products = [

{
id:1,
name:"EXPRESS VPN 1 MONTH",
price:45,
category:"vpn",
image:"images/expressvpn.png",
badge:"Popular"
},

{
id:2,
name:"NORD VPN 1 MONTH",
price:45,
category:"vpn",
image:"images/nordvpn.png",
badge:"Hot"
},

{
id:3,
name:"PIA VPN 1 MONTH",
price:45,
category:"vpn",
image:"images/piavpn.png",
badge:""
},

{
id:4,
name:"NETFLIX SHARED 1 MONTH",
price:35,
category:"subscriptions",
image:"images/netflix.png",
badge:"Best Seller"
},

{
id:5,
name:"SPOTIFY PREMIUM 1 MONTH",
price:40,
category:"subscriptions",
image:"images/spotify.png",
badge:""
},

{
id:6,
name:"SNAPCHAT PLUS 1 MONTH",
price:30,
category:"subscriptions",
image:"images/snapchat.png",
badge:"New"
},

{
id:7,
name:"TEXTNOW ACCOUNT",
price:25,
category:"accounts",
image:"images/textnow.png",
badge:""
},

{
id:8,
name:"GMAIL VERIFIED ACCOUNT",
price:25,
category:"accounts",
image:"images/gmail.png",
badge:""
},

{
id:9,
name:"APPLE GIFT CARD",
price:80,
category:"giftcards",
image:"images/applegift.png",
badge:""
},

{
id:10,
name:"MTN 5GB DATA",
price:25,
category:"data",
image:"images/mtn.png",
badge:""
},

{
id:11,
name:"TIKTOK 1K FOLLOWERS",
price:45,
category:"social",
image:"images/tiktok.png",
badge:"Trending"
}

];





/* ===========================================
   DISPLAY PRODUCTS
=========================================== */


const productList =
document.getElementById("productList");



function displayProducts(items){


if(!productList) return;



productList.innerHTML="";



items.forEach(product=>{


productList.innerHTML += `


<div class="product-card">


<div class="image-box">


<img src="${product.image}"
alt="${product.name}"
onerror="this.src='images/default.png'">



${product.badge ?

`
<span class="product-badge">

${product.badge}

</span>
`

:

""

}



</div>




<div class="product-details">


<div class="category">

${product.category}

</div>



<h3>

${product.name}

</h3>



<div class="rating">

★★★★★ <span>(4.9)</span>

</div>



<h2>

GHS ${product.price}

</h2>



<div class="product-actions">


<button
class="buy-btn"
onclick="addToCart(${product.id})">

Buy Now

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



/* LOAD PRODUCTS */

displayProducts(products);
/* ===========================================
   SEARCH PRODUCTS
=========================================== */


function searchProducts(){


const input =
document.getElementById("searchInput");


if(!input) return;



const value =
input.value.toLowerCase();



const filtered =
products.filter(product =>

product.name.toLowerCase().includes(value)

);



displayProducts(filtered);



}





/* ===========================================
   CATEGORY FILTER
=========================================== */


function filterProducts(category){



if(category === "all"){


displayProducts(products);


return;


}



const filtered =
products.filter(product =>

product.category === category

);



displayProducts(filtered);



}





/* ===========================================
   CART SYSTEM
=========================================== */


let cart =
JSON.parse(
localStorage.getItem("dhubCart")
) || [];





function saveCart(){


localStorage.setItem(

"dhubCart",

JSON.stringify(cart)

);


}





/* ADD TO CART */


function addToCart(id){



const product =
products.find(
item=>item.id===id
);



if(!product) return;



const exists =
cart.find(
item=>item.id===id
);



if(exists){


exists.quantity++;


}else{


cart.push({

...product,

quantity:1

});


}



saveCart();


updateCart();



showNotification(
product.name + " added to cart"
);



}







/* UPDATE CART */


function updateCart(){


const cartItems =
document.getElementById("cartItems");


const cartCount =
document.getElementById("cartCount");


const total =
document.getElementById("total");



let count=0;

let totalPrice=0;



if(cartItems){


cartItems.innerHTML="";



cart.forEach(item=>{


count += item.quantity;


totalPrice +=
item.price * item.quantity;




cartItems.innerHTML += `


<div class="cart-item">


<h4>

${item.name}

</h4>


<p>

GHS ${item.price}

</p>


<button onclick="changeQuantity(${item.id},-1)">
-
</button>


<span>

${item.quantity}

</span>


<button onclick="changeQuantity(${item.id},1)">
+
</button>



<button onclick="removeCart(${item.id})">

❌

</button>


</div>


`;



});



}



if(cartCount){

cartCount.innerHTML=count;

}



if(total){

total.innerHTML =
"GHS " + totalPrice;

}



}





/* CHANGE QUANTITY */


function changeQuantity(id,amount){



const item =
cart.find(
product=>product.id===id
);



if(!item) return;



item.quantity += amount;



if(item.quantity <=0){


cart =
cart.filter(
product=>product.id!==id
);


}



saveCart();


updateCart();



}





/* REMOVE ITEM */


function removeCart(id){



cart =
cart.filter(
item=>item.id!==id
);



saveCart();


updateCart();



}





/* OPEN CART */


function toggleCart(){


const cartBox =
document.getElementById("cartBox");



if(cartBox){

cartBox.classList.toggle("active");

}



}





/* ===========================================
   NOTIFICATION SYSTEM
=========================================== */


function showNotification(message){



const note =
document.createElement("div");



note.className =
"notification";



note.innerHTML = `

<i class="fa-solid fa-circle-check"></i>

${message}

`;



document.body.appendChild(note);



setTimeout(()=>{

note.classList.add("show");

},100);



setTimeout(()=>{


note.classList.remove("show");



setTimeout(()=>{

note.remove();

},300);



},2500);



}





/* LOAD CART */


updateCart();
/* ===========================================
   WISHLIST SYSTEM
=========================================== */


let wishlist =
JSON.parse(
localStorage.getItem("dhubWishlist")
) || [];



function toggleWishlist(id){



const exists =
wishlist.includes(id);



if(exists){


wishlist =
wishlist.filter(
item=>item!==id
);


showNotification(
"Removed from wishlist"
);



}else{


wishlist.push(id);


showNotification(
"Added to wishlist"
);


}



localStorage.setItem(

"dhubWishlist",

JSON.stringify(wishlist)

);



refreshWishlist();



}




function refreshWishlist(){


document
.querySelectorAll(".wishlist-btn")
.forEach(button=>{


const id =
Number(button.dataset.id);



if(wishlist.includes(id)){


button.innerHTML="❤";


button.classList.add("active");



}else{


button.innerHTML="♡";


button.classList.remove("active");



}



});



}





/* ===========================================
   DARK / LIGHT MODE
=========================================== */


function toggleTheme(){


document.body.classList.toggle(
"light-mode"
);



const mode =
document.body.classList.contains(
"light-mode"
)

? "light"

: "dark";



localStorage.setItem(
"dhubTheme",
mode
);



}



const savedTheme =
localStorage.getItem(
"dhubTheme"
);



if(savedTheme==="light"){


document.body.classList.add(
"light-mode"
);


}





/* ===========================================
   HERO SLIDER
=========================================== */


const slides =
document.querySelectorAll(
".slide"
);



let currentSlide=0;



function nextSlide(){


if(slides.length===0)
return;



slides[currentSlide]
.classList.remove(
"active"
);



currentSlide++;



if(currentSlide >= slides.length){


currentSlide=0;


}



slides[currentSlide]
.classList.add(
"active"
);



}



setInterval(
nextSlide,
5000
);






/* ===========================================
   FLASH SALE COUNTDOWN
=========================================== */


const saleEnd =
new Date().getTime()
+
86400000;



setInterval(()=>{


const now =
new Date().getTime();



const distance =
saleEnd-now;



const countdown =
document.getElementById(
"countdown"
);



if(countdown){



const hours =
Math.floor(
(distance%(1000*60*60*24))
/
(1000*60*60)
);



const minutes =
Math.floor(
(distance%(1000*60*60))
/
(1000*60)
);



const seconds =
Math.floor(
(distance%(1000))
/
1000
);



countdown.innerHTML =

hours+"h "
+
minutes+"m "
+
seconds+"s";



}



},1000);






/* ===========================================
   COUNTER ANIMATION
=========================================== */


const counters =
document.querySelectorAll(
".counter"
);



counters.forEach(counter=>{


let target =
Number(
counter.dataset.target
);



let value=0;



const timer =
setInterval(()=>{


value +=
Math.ceil(
target/50
);



if(value>=target){


value=target;


clearInterval(timer);


}



counter.innerHTML=value;



},40);



});







/* ===========================================
   SCROLL ANIMATION
=========================================== */


const observer =
new IntersectionObserver(
entries=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);



}



});


});



document
.querySelectorAll(
".product-card,.category-card,.stat-box"
)
.forEach(element=>{


element.classList.add(
"animate"
);



observer.observe(element);



});
function checkout(){

    if(cart.length === 0){

        showNotification("Your cart is empty");

        return;

    }


    window.location.href="checkout.html";

}
