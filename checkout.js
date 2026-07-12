/* ==========================================
   DHUB DIGITAL STORE CHECKOUT
========================================== */

/* ==========================
EMAILJS
========================== */

(function () {

    emailjs.init({
        publicKey: "MIBwgH6UI5icqbNJL"
    });

})();

/* ==========================
LOAD CART
========================== */

let cart = JSON.parse(localStorage.getItem("dhubCart")) || [];

if (cart.length === 0) {

    alert("Your cart is empty.");

    window.location.href = "index.html";

}

/* ==========================
ORDER ID
========================== */

const orderId =
"DH-" + Math.floor(100000 + Math.random() * 900000);

const paymentReference =
"REF-" + Math.floor(100000 + Math.random() * 900000);

/* ==========================
SHOW PAYMENT REFERENCE
========================== */

const paymentProof =
document.getElementById("paymentProof");

if(paymentProof){

    paymentProof.value = paymentReference;

}

/* ==========================
ORDER SUMMARY
========================== */

function loadOrder(){

    const box =
    document.getElementById("orderSummary");

    if(!box) return;

    let total = 0;

    let html = "";

    cart.forEach(item=>{

        const subtotal =
        item.price * item.quantity;

        total += subtotal;

        html += `

        <div class="order-item">

            <div>

                <strong>${item.name}</strong>

                <br>

                Qty: ${item.quantity}

                ${item.username ? `<br><small>${item.username}</small>` : ""}

            </div>

            <strong>

                GHS ${subtotal}

            </strong>

        </div>

        `;

    });

    html += `

    <hr>

    <h3>Total: GHS ${total}</h3>

    `;

    box.innerHTML = html;

}

loadOrder();
/* ==========================
PAYMENT DETAILS
========================== */

function updatePaymentDetails(){

    const method = document.getElementById("paymentMethod");
    const box = document.getElementById("paymentDetails");

    if(!method || !box) return;

    if(method.value === "tcash"){

        box.innerHTML = `

        <div class="payment-card">

            <h3>Telecel Cash (T-Cash)</h3>

            <p><strong>Name:</strong> PATRICK KOFI KUMAH</p>

            <p>
                <strong>Number:</strong>
                <span id="momoNumber">0204496069</span>

                <button type="button"
                        onclick="copyNumber()">

                    Copy

                </button>

            </p>

            <p>

                <strong>Reference:</strong>

                ${paymentReference}

            </p>

            <small>
                Send the exact amount and use the reference above.
            </small>

        </div>

        `;

    }else if(method.value === "bank"){

        box.innerHTML = `

        <div class="payment-card">

            <h3>Bank Transfer</h3>

            <p>Coming Soon.</p>

        </div>

        `;

    }else{

        box.innerHTML = "";

    }

}


/* ==========================
COPY NUMBER
========================== */

function copyNumber(){

    const number = document.getElementById("momoNumber");

    if(!number) return;

    navigator.clipboard.writeText(number.innerText);

    showNotification("Number copied successfully.");

}


/* ==========================
PAYMENT CHANGE
========================== */

const paymentMethod =
document.getElementById("paymentMethod");

if(paymentMethod){

    paymentMethod.addEventListener(
        "change",
        updatePaymentDetails
    );

    updatePaymentDetails();

}
/* ==========================
SUBMIT ORDER
========================== */

function submitOrder(){

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const email = document.getElementById("custEmail").value.trim();
    const payment = document.getElementById("paymentMethod").value;

    const accountEmail =
        document.getElementById("accountEmail")?.value || "";

    const accountPassword =
        document.getElementById("accountPassword")?.value || "";

    const extraNote =
        document.getElementById("extraNote")?.value || "";

    if(!name || !phone || !email || !payment){

        showNotification("Please fill in all required fields.");
        return;

    }

    let total = 0;
    let products = "";

    cart.forEach((item,index)=>{

        const subtotal = item.price * item.quantity;

        total += subtotal;

        products +=
`${index+1}. ${item.name}
Qty: ${item.quantity}
Price: GHS ${subtotal}
${item.username ? "Username: " + item.username : ""}

`;

    });

    const paymentName =
        payment === "tcash"
        ? "Telecel Cash"
        : "Bank Transfer";

    const whatsappMessage = `

🛒 *DHUB DIGITAL STORE*

━━━━━━━━━━━━━━

*Order ID:*
${orderId}

*Reference:*
${paymentReference}

━━━━━━━━━━━━━━

${products}

━━━━━━━━━━━━━━

*Total:*
GHS ${total}

*Payment Method:*
${paymentName}

━━━━━━━━━━━━━━

*Customer*

Name: ${name}

Phone: ${phone}

Email: ${email}

Account: ${accountEmail}

Password: ${accountPassword}

Extra Note:
${extraNote}

`;

    window.open(

        "https://wa.me/233204496069?text=" +
        encodeURIComponent(whatsappMessage),

        "_blank"

    );

    emailjs.send(

        "service_wcjw9mm",

        "template_dq6buyi",

        {

            customer_name: name,
            customer_email: email,
            customer_phone: phone,
            order_id: orderId,
            products: products,
            total: total,
            payment: paymentName,
            reference: paymentReference

        }

    );

    showNotification("Order sent successfully.");

    localStorage.removeItem("dhubCart");

    setTimeout(()=>{

        window.location.href="index.html";

    },2000);

}


/* ==========================
NOTIFICATIONS
========================== */

function showNotification(message){

    const old =
    document.querySelector(".notification");

    if(old) old.remove();

    const box =
    document.createElement("div");

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

    },3000);

}


/* ==========================
FORM SUBMIT
========================== */

const form =
document.getElementById("orderForm");

if(form){

    form.addEventListener("submit",function(e){

        e.preventDefault();

        submitOrder();

    });

}
