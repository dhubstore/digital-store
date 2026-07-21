const slides=document.querySelectorAll(".hero-slide");

const dots=document.querySelectorAll(".dot");

const next=document.querySelector(".hero-next");

const prev=document.querySelector(".hero-prev");

let current=0;

function showSlide(index){

slides.forEach(slide=>slide.classList.remove("active"));

dots.forEach(dot=>dot.classList.remove("active"));

slides[index].classList.add("active");

dots[index].classList.add("active");

current=index;

}

next.onclick=()=>{

current++;

if(current>=slides.length){

current=0;

}

showSlide(current);

};

prev.onclick=()=>{

current--;

if(current<0){

current=slides.length-1;

}

showSlide(current);

};

dots.forEach((dot,index)=>{

dot.onclick=()=>{

showSlide(index);

};

});

setInterval(()=>{

current++;

if(current>=slides.length){

current=0;

}

showSlide(current);

},5000);

function loadBestSellers(){

const container=document.getElementById("bestSellerProducts");

if(!container) return;

container.innerHTML="";

products.forEach(product=>{

container.innerHTML+=`

<div class="product-card">

<div class="product-image">

<span class="discount-badge">HOT</span>

<img src="${product.image}" alt="${product.name}">

<button class="wishlist-button"

onclick="toggleWishlist(${product.id},this)">

<i class="fa-regular fa-heart"></i>

</button>

</div>

<div class="product-info">

<div class="product-category">

${product.category}

</div>

<h3 class="product-title">

${product.name}

</h3>

<div class="product-rating">

★★★★★

</div>

<div class="product-price">

GHS ${product.price}

</div>

<div class="product-buttons">

<button class="cart-button"
onclick="addToCart(${product.id})">

Add To Cart

</button>

<button class="view-button"
onclick="openQuickView(${product.id})">

<i class="fa-solid fa-eye"></i>

</button>

</div>
</div>

</div>

`;

});

}
function renderSection(containerId, filterCategory = null) {

    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    let list = products;

    if (filterCategory) {
        list = products.filter(product => product.category === filterCategory);
    }

    list.forEach(product => {

        container.innerHTML += `

        <div class="product-card">

            <div class="product-image">

                <span class="discount-badge">HOT</span>

                <img src="${product.image}" alt="${product.name}">

            </div>

            <div class="product-info">

                <div class="product-category">${product.category}</div>

                <h3 class="product-title">${product.name}</h3>

                <div class="product-rating">★★★★★</div>

                <div class="product-price">GHS ${product.price}</div>

                <div class="product-buttons">

                    <button class="cart-button">
                        Add to Cart
                    </button>

                    <button class="wishlist-button">
                        ❤
                    </button>

                </div>

            </div>

        </div>

        `;

    });

}
renderSection("bestSellerProducts");

renderSection("newArrivalProducts");

renderSection("vpnProducts","vpn");

renderSection("giftCardProducts","giftcards");

renderSection("dataProducts","data");
function scrollProducts(id, amount){

const container=document.getElementById(id);

container.scrollBy({

left:amount,

behavior:"smooth"

});

}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCart();

function addToCart(id){

const product = products.find(p=>p.id===id);

const existing = cart.find(item=>item.id===id);

if(existing){

existing.qty++;

}else{

cart.push({

...product,

qty:1

});

}

saveCart();

updateCart();

openCart();

}

function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

}

function updateCart(){

document.querySelector(".cart-count").textContent=

cart.reduce((a,b)=>a+b.qty,0);

const cartItems=document.getElementById("cartItems");

const total=document.getElementById("cartTotal");

cartItems.innerHTML="";

let grand=0;

cart.forEach(item=>{

grand+=item.price*item.qty;

cartItems.innerHTML+=`

<div class="cart-item">

<img src="${item.image}">

<div class="cart-info">

<h4>${item.name}</h4>

<div class="cart-price">

GHS ${item.price}

</div>

<div class="qty">

<button onclick="changeQty(${item.id},-1)">−</button>

<span>${item.qty}</span>

<button onclick="changeQty(${item.id},1)">+</button>

</div>

<button class="remove-btn"

onclick="removeItem(${item.id})">

Remove

</button>

</div>

</div>

`;

});

if(cart.length===0){

cartItems.innerHTML="<p>Your cart is empty.</p>";

}

total.textContent="GHS "+grand.toFixed(2);

}

function changeQty(id,value){

const item=cart.find(i=>i.id===id);

item.qty+=value;

if(item.qty<=0){

cart=cart.filter(i=>i.id!==id);

}

saveCart();

updateCart();

}

function removeItem(id){

cart=cart.filter(i=>i.id!==id);

saveCart();

updateCart();

}

function openCart(){

document.getElementById("cartSidebar").classList.add("active");

document.getElementById("cartOverlay").classList.add("active");

}

function closeCart(){

document.getElementById("cartSidebar").classList.remove("active");

document.getElementById("cartOverlay").classList.remove("active");

}

document.getElementById("cartOverlay").onclick=closeCart;

function toggleWishlist(id, button){

if(wishlist.includes(id)){

wishlist = wishlist.filter(item=>item!==id);

button.innerHTML='<i class="fa-regular fa-heart"></i>';

showToast("Removed from wishlist");

}else{

wishlist.push(id);

button.innerHTML='<i class="fa-solid fa-heart"></i>';

showToast("Added to wishlist");

}

localStorage.setItem("wishlist",JSON.stringify(wishlist));

}

function openQuickView(id){

const product = products.find(p=>p.id===id);

document.getElementById("quickImage").src=product.image;

document.getElementById("quickCategory").textContent=product.category;

document.getElementById("quickTitle").textContent=product.name;

document.getElementById("quickPrice").textContent="GHS "+product.price;

document.getElementById("quickAddCart").onclick=()=>{

addToCart(product.id);

closeQuickView();

};

document.getElementById("modalOverlay").classList.add("active");

}

function closeQuickView(){

document.getElementById("modalOverlay").classList.remove("active");

}
