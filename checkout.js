// ==========================
// LOAD CART
// ==========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let subtotal = 0;
let discount = 0;
let total = 0;

// ==========================
// COUPONS
// ==========================

const coupons = {

    DHUB10: 10,

    FIRST20: 20,

    STUDENT15: 15

};

let couponApplied = false;

// ==========================
// LOAD ORDER SUMMARY
// ==========================

function loadCheckout() {

    const container = document.getElementById("checkoutItems");

    container.innerHTML = "";

    subtotal = 0;

    if (cart.length === 0) {

        container.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        updateSummary();

        return;

    }

    cart.forEach(item => {

        const itemTotal = item.price * item.qty;

        subtotal += itemTotal;

        container.innerHTML += `

        <div class="checkout-item">

            <div class="checkout-item-left">

                <img src="${item.image}" alt="${item.name}">

                <div>

                    <h4>${item.name}</h4>

                    <small>
                        Qty: ${item.qty}
                    </small>

                </div>

            </div>

            <strong>

                GHS ${itemTotal.toFixed(2)}

            </strong>

        </div>

        `;

    });

    updateSummary();

}

// ==========================
// UPDATE TOTALS
// ==========================

function updateSummary() {

    total = subtotal - discount;

    document.getElementById("subtotal").textContent =
        "GHS " + subtotal.toFixed(2);

    document.getElementById("discount").textContent =
        "- GHS " + discount.toFixed(2);

    document.getElementById("total").textContent =
        "GHS " + total.toFixed(2);

}

// ==========================
// START
// ==========================

loadCheckout();
