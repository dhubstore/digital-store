// ===============================
// DHUB DIGITAL STORE APP
// PART 1
// ===============================

// ---------------------
// STATE
// ---------------------


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







// ------------------
// Swipe Support
// ------------------



// ---------------------
// CART OPEN/CLOSE
// ---------------------


// ---------------------
// WEBSITE STARTUP
// ---------------------

document.addEventListener("DOMContentLoaded", () => {

    displayProducts();

});

// ---------------------
// SUPPORT BUTTON
// ---------------------

function openSupport() {

    window.open("https://wa.me/233204496069", "_blank");

}
