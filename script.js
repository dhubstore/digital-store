/* ==========================================
   DHUB DIGITAL STORE SCRIPT.JS
========================================== */


console.log("DHub Script Loaded");


/* ==========================
 PRODUCTS
========================== */

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



/* ==========================
 DISPLAY PRODUCTS
========================== */

const productList = document.getElementById("productList");


function displayProducts(list){

if(!productList) return;


productList.innerHTML="";


list.forEach(product=>{


productList.innerHTML += `

<div class="product-card">


<div class="image-box">


<img src="${product.image}" 
onerror="this.src='images/default.png'">


${product.badge ? 
`
<span class="product-badge">
${product.badge}
</span>
`
:""}


</div>


<div class="product-details">


<div class="category">
${product.category}
</div>


<h3>${product.name}</h3>


<div class="rating">
★★★★★ <span>(4.9)</span>
</div>


<h2>
GHS ${product.price}
</h2>


<div class="product-actions">


<button class="buy-btn"
onclick="addToCart(${product.id})">

<i class="fa-solid fa-cart-plus"></i> Add to Cart

</button>


<button class="wishlist-btn"
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


displayProducts(products);



/* ==========================
 SEARCH
========================== */


function searchProducts(){

let input=document.getElementById("searchInput");

if(!input)return;


let value=input.value.toLowerCase();


let result=products.filter(product=>

product.name.toLowerCase().includes(value)

);


displayProducts(result);

}





/* ==========================
 CATEGORY FILTER
========================== */


function filterProducts(category){


let result=products.filter(product=>

product.category===category

);


displayProducts(result);


}





/* ==========================
 CART SYSTEM
========================== */


let cart = JSON.parse(
localStorage.getItem("dhubCart")
) || [];




function saveCart(){

localStorage.setItem(
"dhubCart",
JSON.stringify(cart)
);

}



function addToCart(id){


let product =
products.find(
p=>p.id===id
);


if(!product)return;



let exist =
cart.find(
p=>p.id===id
);



if(exist){

exist.quantity++;

}else{


cart.push({

...product,

quantity:1

});


}


saveCart();

updateCart();

showNotification(
product.name+" added to cart"
);


}





function updateCart(){


let items=document.getElementById("cartItems");

let count=document.getElementById("cartCount");

let total=document.getElementById("total");



let totalPrice=0;

let totalItems=0;



if(items){


items.innerHTML="";


cart.forEach(item=>{


totalPrice += item.price * item.quantity;

totalItems += item.quantity;



items.innerHTML += `

<div class="cart-item">

<h4>${item.name}</h4>

<p>
GHS ${item.price}
</p>


<button onclick="changeQuantity(${item.id},-1)">
-
</button>


${item.quantity}


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



if(count)
count.innerHTML=totalItems;


if(total)
total.innerHTML="GHS "+totalPrice;


}



function changeQuantity(id,num){


let item =
cart.find(
p=>p.id===id
);


if(!item)return;


item.quantity += num;


if(item.quantity<=0){

removeCart(id);

return;

}


saveCart();

updateCart();

}





function removeCart(id){


cart =
cart.filter(
p=>p.id!==id
);


saveCart();

updateCart();


}




function toggleCart(){


let box=document.getElementById("cartBox");


if(box)
box.classList.toggle("active");


}





/* ==========================
 CHECKOUT
========================== */


function checkout(){


if(cart.length===0){

showNotification(
"Your cart is empty"
);

return;

}


window.location.href="checkout.html";


}




/* ==========================
 NOTIFICATION
========================== */


function showNotification(text){


let div=document.createElement("div");


div.className="notification";


div.innerHTML=text;


document.body.appendChild(div);



setTimeout(()=>{

div.classList.add("show");

},100);



setTimeout(()=>{

div.remove();

},3000);


}




/* ==========================
 WISHLIST
========================== */


let wishlist =
JSON.parse(
localStorage.getItem("dhubWishlist")
)||[];




function toggleWishlist(id){


if(wishlist.includes(id)){


wishlist =
wishlist.filter(
x=>x!==id
);


}else{


wishlist.push(id);


}


localStorage.setItem(
"dhubWishlist",
JSON.stringify(wishlist)
);


refreshWishlist();


}




function refreshWishlist(){


document.querySelectorAll(".wishlist-btn")
.forEach(btn=>{


let id =
Number(btn.dataset.id);



if(wishlist.includes(id)){


btn.innerHTML="❤";


}else{


btn.innerHTML="♡";


}



});


}




/* ==========================
 THEME
========================== */


function toggleTheme(){

document.body.classList.toggle(
"light-mode"
);

}




/* ==========================
 HERO SLIDER
========================== */


let slides=document.querySelectorAll(".slide");


let slideIndex=0;


function nextSlide(){


if(slides.length<1)return;


slides[slideIndex].classList.remove("active");


slideIndex++;


if(slideIndex>=slides.length)
slideIndex=0;


slides[slideIndex].classList.add("active");


}


setInterval(nextSlide,5000);





/* ==========================
 COUNTDOWN
========================== */


let end =
Date.now()+86400000;


setInterval(()=>{


let box=document.getElementById("countdown");


if(!box)return;


let distance=end-Date.now();



let h=Math.floor(distance/3600000);

let m=Math.floor(distance%3600000/60000);

let s=Math.floor(distance%60000/1000);



box.innerHTML=
`${h}h ${m}m ${s}s`;



},1000);





/* LOAD CART */

updateCart();
