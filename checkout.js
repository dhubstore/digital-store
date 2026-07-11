/* ==========================================
   DHUB DIGITAL STORE CHECKOUT
========================================== */

// ==========================
// EMAILJS
// ==========================

(function(){

emailjs.init({

publicKey:"MIBwgH6UI5icqbNJL"

});

})();

// ==========================
// LOAD CART
// ==========================

let cart = JSON.parse(localStorage.getItem("dhubCart")) || [];

if(cart.length===0){

showMessage("Your cart is empty");

setTimeout(()=>{

window.location.href="index.html";

},1500);

}

// ==========================
// ORDER ID
// ==========================

const orderId =
"DH-"+Math.floor(100000+Math.random()*900000);

const reference =
"REF-"+Math.floor(100000+Math.random()*900000);

// ==========================
// PAYMENT REFERENCE
// ==========================

const proof=document.getElementById("paymentProof");

if(proof){

proof.value=reference;

}

// ==========================
// LOAD ORDER SUMMARY
// ==========================

function loadOrder(){

const summary=document.getElementById("orderSummary");

if(!summary) return;

let total=0;

let html=`
<div class="receipt-card-inner">
<h3>🧾 Order Summary</h3>
<hr>
`;

cart.forEach(item=>{

const price=item.price*item.quantity;

total+=price;

html+=`

<div class="order-item">

<span>${item.name} × ${item.quantity}</span>

<b>GHS ${price.toFixed(2)}</b>

</div>

`;

if(item.username){

html+=`
<div class="small-text">
Username: ${item.username}
</div>
`;

}

});

html+=`

<hr>

<h3>Total: GHS ${total.toFixed(2)}</h3>

</div>

`;

summary.innerHTML=html;

}

loadOrder();
// ==========================
// PAYMENT DETAILS
// ==========================

function updatePaymentDetails(){

const method=document.getElementById("paymentMethod");
const box=document.getElementById("paymentDetails");

if(!method || !box) return;

if(method.value==="tcash"){

box.innerHTML=`

<h3>Telecel Cash (T-Cash)</h3>

<p><b>Name:</b> PATRICK KOFI KUMAH</p>

<p>
<b>Number:</b>

<span id="momoNumber">0204496069</span>

<button type="button" onclick="copyNumber()">
Copy
</button>

</p>

<p><b>Reference:</b> ${reference}</p>

<p class="small-text">
Use the reference above when sending payment.
</p>

`;

}else if(method.value==="bank"){

box.innerHTML=`

<h3>Bank Transfer</h3>

<p>Bank payment will be available soon.</p>

`;

}else{

box.innerHTML="";

}

}

const paymentSelect=document.getElementById("paymentMethod");

if(paymentSelect){

paymentSelect.addEventListener("change",updatePaymentDetails);

updatePaymentDetails();

}

// ==========================
// COPY NUMBER
// ==========================

function copyNumber(){

const number=document.getElementById("momoNumber");

if(!number) return;

navigator.clipboard.writeText(number.innerText);

showMessage("Number copied successfully.");

}

// ==========================
// CALCULATE TOTAL
// ==========================

function getTotal(){

let total=0;

cart.forEach(item=>{

total += item.price * item.quantity;

});

return total;

}
// ==========================
// SUBMIT ORDER
// ==========================

function submitOrder(){

const name=document.getElementById("custName").value.trim();
const phone=document.getElementById("custPhone").value.trim();
const email=document.getElementById("custEmail").value.trim();
const payment=document.getElementById("paymentMethod").value;

const accountEmail=document.getElementById("accountEmail").value.trim();
const accountPassword=document.getElementById("accountPassword").value.trim();
const extraNote=document.getElementById("extraNote").value.trim();

if(!name || !phone || !email || !payment){

showMessage("Please complete all required fields.");

return;

}

let productsText="";

cart.forEach((item,index)=>{

productsText += `${index+1}. ${item.name} x${item.quantity} - GHS ${item.price * item.quantity}\n`;

if(item.username){

productsText += `Username: ${item.username}\n`;

}

});

const total=getTotal();

const paymentName=
payment==="tcash"
?"Telecel Cash"
:"Bank Transfer";

const whatsappMessage=`

🛒 DHUB DIGITAL STORE

━━━━━━━━━━━━━━

Order ID: ${orderId}

Reference: ${reference}

━━━━━━━━━━━━━━

Customer:
${name}

Phone:
${phone}

Email:
${email}

━━━━━━━━━━━━━━

Products:

${productsText}

━━━━━━━━━━━━━━

Total:
GHS ${total}

Payment:
${paymentName}

Account Email:
${accountEmail || "N/A"}

Account Password:
${accountPassword || "N/A"}

Note:
${extraNote || "None"}

`;

window.open(
"https://wa.me/233204496069?text="+encodeURIComponent(whatsappMessage),
"_blank"
);

emailjs.send(

"service_wcjw9mm",

"template_dq6buyi",

{

customer_name:name,

customer_email:email,

order_id:orderId,

products:productsText,

payment:paymentName,

total:total,

reference:reference

}

);

localStorage.removeItem("dhubCart");

showMessage("Order placed successfully.");

setTimeout(()=>{

window.location.href="index.html";

},2000);

}

// ==========================
// NOTIFICATION
// ==========================

function showMessage(text){

const old=document.querySelector(".notification");

if(old) old.remove();

const box=document.createElement("div");

box.className="notification";

box.innerHTML=text;

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
