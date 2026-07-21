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

<button class="wishlist-button">❤</button>

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

Add to Cart

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
