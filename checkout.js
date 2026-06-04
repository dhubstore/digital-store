// ================= LOAD CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

if(cart.length === 0){
  alert("Cart is empty");
  window.location.href = "index.html";
}

// ================= IDS =================
const orderId = "DH-" + Math.floor(100000 + Math.random() * 900000);
const reference = "REF-" + Math.floor(100000 + Math.random() * 900000);

document.getElementById("paymentProof").value = reference;

// ================= CHECK IF ACCOUNT INFO NEEDED =================
const needsAccountInfo = cart.some(item =>
  item.name.includes("SNAPCHAT") || item.name.includes("SPOTIFY")
);

// show/hide account fields
window.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("accountFields");
  if(box && needsAccountInfo){
    box.style.display = "block";
  }
});

// ================= RECEIPT =================
let html = `<div style="background:#020617;padding:15px;border-radius:10px;color:white;">`;
html += `<h3>🧾 Receipt</h3><hr>`;

let total = 0;

cart.forEach(item=>{
  const t = item.price * item.quantity;
  total += t;

  html += `
    <div style="display:flex; justify-content:space-between;">
      <span>${item.name} x${item.quantity}</span>
      <span>GHC ${t}</span>
    </div>
  `;
});

html += `<hr><h3>Total: GHC ${total}</h3></div>`;
document.getElementById("orderSummary").innerHTML = html;

// ================= PAYMENT =================
function updatePaymentDetails(){
  const method = document.getElementById("paymentMethod").value;
  const box = document.getElementById("paymentDetails");

  if(method === "tcash"){
    box.innerHTML = `
      <h4>Telecel Cash (T-Cash)</h4>

      <p>
        Name: <b>PATRICK KOFI KUMAH</b>
      </p>

      <p>
        Number: <b id="momoNumber">020 449 6069</b>
        <button onclick="copyNumber()">Copy</button>
      </p>

      <p style="font-size:12px;">
        Confirm recipient before sending
      </p>

      <p>
        Use your reference when sending payment
      </p>
    `;
  } else {
    box.innerHTML = `<p>Bank transfer coming soon</p>`;
  }
}

// ================= COPY =================
function copyNumber(){
  const number = document.getElementById("momoNumber").innerText;
  navigator.clipboard.writeText(number);
  alert("Telecel Cash number copied!");
}

document.getElementById("paymentMethod").addEventListener("change", updatePaymentDetails);
updatePaymentDetails();

// ================= SUBMIT ORDER =================
function submitOrder(){

  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const email = document.getElementById("custEmail").value;
  const payment = document.getElementById("paymentMethod").value;
  const proof = document.getElementById("paymentProof").value;

  const accountUsername =
    document.getElementById("accountUsername")?.value || "";

  const accountPassword =
    document.getElementById("accountPassword")?.value || "";

  if(!name || !phone || !email || !proof){
    alert("Fill all fields");
    return;
  }

  // REQUIRE ACCOUNT DETAILS ONLY FOR SNAPCHAT/SPOTIFY
  if(needsAccountInfo && (!accountUsername || !accountPassword)){
    alert("Enter account username/email/number and password");
    return;
  }

  let paymentMethodText = payment === "tcash"
    ? "Telecel Cash (T-Cash)"
    : "Bank Transfer";

  let message = `🛍️ *DHub Digital Store*\n`;
  message += `━━━━━━━━━━━━━━━\n`;
  message += `🆔 ${orderId}\n💳 ${reference}\n\n`;

  let orderText = "";
  let total = 0;

  cart.forEach((item,i)=>{
    const t = item.price * item.quantity;
    total += t;

    message += `${i+1}. ${item.name} x${item.quantity} = GHC ${t}\n`;
    orderText += `${item.name} x${item.quantity} = GHC ${t}\n`;
  });

  message += `━━━━━━━━━━━━━━━\n`;
  message += `💰 Total: GHC ${total}\n`;
  message += `💳 Payment: ${paymentMethodText}\n\n`;
  message += `👤 ${name}\n📱 ${phone}\n📧 ${email}`;

  // ADD ACCOUNT INFO IF NEEDED
  if(needsAccountInfo){
    message += `\n\n🔐 ACCOUNT DETAILS\n`;
    message += `👤 Username/Email/Number: ${accountUsername}\n`;
    message += `🔑 Password: ${accountPassword}\n`;
  }

  // ================= WHATSAPP =================
  window.open(
    "https://wa.me/233206421572?text=" + encodeURIComponent(message),
    "_blank"
  );

  // ================= EMAILJS =================
  emailjs.send("service_wcjw9mm", "template_dq6buyi", {
    name: name,
    email: email,
    order: orderText,
    total: total,
    payment: paymentMethodText,
    order_id: orderId,
    account_username: accountUsername,
    account_password: accountPassword
  });

  alert("Order sent successfully!");

  localStorage.removeItem("cart");
}
