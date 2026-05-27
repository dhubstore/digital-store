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
      <h4>Telecel Cash (Tcash)</h4>
      <p>
        Number: <b id="tcashNumber">0204496069</b>
        <button onclick="copyNumber()">Copy</button>
      </p>
      <p style="font-size:12px;">Confirm recipient before sending</p>
      <p>Use your reference when sending payment</p>
    `;
  } else {
    box.innerHTML = `<p>Bank transfer coming soon</p>`;
  }
}

// ================= COPY =================
function copyNumber(){
  const number = document.getElementById("tcashNumber").innerText;
  navigator.clipboard.writeText(number);
  alert("Number copied!");
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

  if(!name || !phone || !email || !proof){
    alert("Fill all fields");
    return;
  }

  let message = `🛍️ *DHub Digital Store*\n`;
  message += `━━━━━━━━━━━━━━━\n`;
  message += `🆔 ${orderId}\n💳 ${reference}\n\n`;

  let total = 0;
  let orderText = "";

  cart.forEach((item,i)=>{
    const t = item.price * item.quantity;
    total += t;

    message += `${i+1}. ${item.name} x${item.quantity} = GHC ${t}\n`;
    orderText += `${item.name} x${item.quantity} = GHC ${t}\n`;
  });

  message += `━━━━━━━━━━━━━━━\n`;
  message += `💰 Total: GHC ${total}\n\n`;
  message += `👤 ${name}\n📱 ${phone}\n📧 ${email}`;

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
    payment: payment,
    order_id: orderId
  });

  // ================= SUCCESS =================
  alert("Order sent successfully!");

  localStorage.removeItem("cart");
}
