/* ===========================================
   DHUB DIGITAL STORE V2
   SCRIPT.JS
=========================================== */


/* ===============================
   PRODUCT DATABASE
================================ */


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



/* ===============================
   DISPLAY PRODUCTS
================================ */


const productList =
document.getElementById("productList");



function displayProducts(items){


if(!productList) return;


productList.innerHTML="";



items.forEach(product=>{


productList.innerHTML += `


<div class="product-card">


<div class="product-image">


${product.badge ? 
`
<span class="product-badge">
${product.badge}
</span>
`
:
""}



<img src="${product.image}"
alt="${product.name}"
onerror="this.src='images/default.png'">


</div>



<div class="product-info">


<span class="product-category">

${product.category}

</span>



<h3 class="product-title">

${product.name}

</h3>



<div class="rating">

⭐⭐⭐⭐⭐

</div>



<div class="product-price">

GHS ${product.price}

</div>



<div class="product-buttons">


<button class="buy-btn"
onclick="addToCart(${product.id})">

Add To Cart

</button>



<button class="wishlist-btn">

♡


</button>


</div>


</div>


</div>


`;


});


}
/* ===========================================
   SEARCH PRODUCTS
=========================================== */


function searchProducts(){

    const input =
    document.getElementById("searchInput").value.toLowerCase();


    const filtered =
    products.filter(product =>

        product.name.toLowerCase().includes(input)

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
   CART STORAGE
=========================================== */


let cart =
JSON.parse(localStorage.getItem("dhubCart")) || [];





/* ===========================================
   ADD TO CART
=========================================== */


function addToCart(id){


    const product =
    products.find(item => item.id === id);



    if(!product) return;




    const existing =
    cart.find(item => item.id === id);



    if(existing){


        existing.quantity++;


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





/* ===========================================
   SAVE CART
=========================================== */


function saveCart(){


    localStorage.setItem(
        "dhubCart",
        JSON.stringify(cart)
    );


}





/* ===========================================
   UPDATE CART
=========================================== */


function updateCart(){



const cartItems =
document.getElementById("cartItems");

const cartCount =
document.getElementById("cartCount");

const total =
document.getElementById("total");




if(!cartItems) return;




cartItems.innerHTML="";



let totalPrice = 0;

let count = 0;



cart.forEach(item=>{


count += item.quantity;



totalPrice +=
item.price * item.quantity;



cartItems.innerHTML += `



<div class="cart-item">



<img src="${item.image}"
onerror="this.src='images/default.png'">



<div class="cart-info">


<h4>

${item.name}

</h4>


<p>

GHS ${item.price}

</p>



<div>


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



</div>


</div>



`;



});





cartCount.innerHTML = count;



total.innerHTML =
"GHS " + totalPrice;



}







/* ===========================================
   CHANGE QUANTITY
=========================================== */


function changeQuantity(id, amount){


const item =
cart.find(product=>product.id===id);



if(!item) return;



item.quantity += amount;



if(item.quantity <=0){


    cart =
    cart.filter(product=>product.id!==id);


}



saveCart();


updateCart();



}





/* ===========================================
   REMOVE FROM CART
=========================================== */


function removeCart(id){



cart =
cart.filter(item=>item.id !== id);



saveCart();


updateCart();



}





/* ===========================================
   CART OPEN / CLOSE
=========================================== */


function toggleCart(){


const cartBox =
document.getElementById("cartBox");



cartBox.classList.toggle("active");


}





/* LOAD SAVED CART */

updateCart();
/* ===============================
   NOTIFICATIONS
================================ */

.notification{

    position:fixed;

    top:100px;

    right:-350px;

    background:#22c55e;

    color:white;

    padding:15px 25px;

    border-radius:12px;

    display:flex;

    gap:10px;

    align-items:center;

    z-index:99999;

    box-shadow:0 10px 30px rgba(0,0,0,.3);

    transition:.4s;

}


.notification.show{

    right:25px;

}



/* ===============================
   LIGHT MODE
================================ */


.light-mode{

    --bg:#f8fafc;

    --bg2:#ffffff;

    --bg3:#e2e8f0;

    --text:#0f172a;

    --muted:#475569;

}


.light-mode .header,
.light-mode .navbar{

    background:white;

}


.light-mode .product-card,
.light-mode .feature-box,
.light-mode .stat-card{

    color:#0f172a;

}

/* LOAD PRODUCTS */

displayProducts(products);
