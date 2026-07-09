/* ===========================================
   EMAILJS SETUP
=========================================== */


(function(){

    emailjs.init({

        publicKey:"MIBwgH6UI5icqbNJL"

    });


})();
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
    box.innerHTML = `
      <p>Bank transfer coming soon</p>
    `;
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

  if(!name || !phone || !email || !proof){
    alert("Fill all fields");
    return;
  }

  let paymentMethodText = "";

  if(payment === "tcash"){
    paymentMethodText = "Telecel Cash (T-Cash)";
  } else {
    paymentMethodText = "Bank Transfer";
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
  message += `💰 Total: GHC ${total}\n`;
  message += `💳 Payment: ${paymentMethodText}\n\n`;
  message += `👤 ${name}\n📱 ${phone}\n📧 ${email}`;

  // ================= WHATSAPP =================
  window.open(
    "https://wa.me/233206421572?text=" + encodeURIComponent(message),
    "_blank"
  );
/* ===========================================
   SEND EMAIL RECEIPT
=========================================== */


function sendEmailReceipt(order){


let productList = "";



order.products.forEach(item=>{


productList +=

`${item.name}
Quantity: ${item.quantity}
Price: GHS ${item.price * item.quantity}

`;


});




const templateParams = {


customer_name:
order.customer.name,


customer_email:
order.customer.email,


order_id:
order.id,


products:
productList,


payment:
order.customer.payment,


date:
order.date


};





emailjs.send(

"service_wcjw9mm",

"template_dq6buyi",

templateParams

)

.then(()=>{


console.log(
"Email sent successfully"
);


})

.catch(error=>{


console.log(
"Email error:",
error
);


});


}
  // ================= EMAILJS =================
  emailjs.send("service_wcjw9mm", "template_dq6buyi", {
    name: name,
    email: email,
    order: orderText,
    total: total,
    payment: paymentMethodText,
    order_id: orderId
  });

  // ================= SUCCESS =================
  alert("Order sent successfully!");

  localStorage.removeItem("cart");
}
/* ===========================================
   PAYMENT DETAILS
=========================================== */


function updatePaymentDetails(){


const method =

document.getElementById(
"paymentMethod"
);



const box =

document.getElementById(
"paymentDetails"
);



if(!method || !box) return;




if(method.value === "tcash"){



box.innerHTML = `


<h4>

Telecel Cash (T-Cash)

</h4>



<p>

Name:

<b>

PATRICK KOFI KUMAH

</b>

</p>




<p>

Number:

<b id="momoNumber">

0204496069

</b>



<button onclick="copyNumber()">

Copy

</button>


</p>




<p>

Use this reference:

<b>

${reference}

</b>

</p>


`;



}else{


box.innerHTML = `


<p>

Bank transfer coming soon.

</p>


`;



}


}






const paymentSelect =

document.getElementById(
"paymentMethod"
);



if(paymentSelect){


paymentSelect.addEventListener(

"change",

updatePaymentDetails

);



updatePaymentDetails();


}






/* ===========================================
   COPY PAYMENT NUMBER
=========================================== */


function copyNumber(){



const number =

document.getElementById(
"momoNumber"
);



if(number){


navigator.clipboard.writeText(

number.innerText

);



showMessage(
"Number copied"
);


}


}








/* ===========================================
   SUBMIT ORDER
=========================================== */


function submitOrder(){



const name =

document.getElementById(
"custName"
).value;



const phone =

document.getElementById(
"custPhone"
).value;



const email =

document.getElementById(
"custEmail"
).value;



const payment =

document.getElementById(
"paymentMethod"
).value;




if(!name || !phone || !email){


showMessage(
"Please fill all fields"
);


return;


}





let total = 0;

let productsText = "";



cart.forEach((item,index)=>{



let itemTotal =

item.price * item.quantity;



total += itemTotal;



productsText +=

`${index+1}. ${item.name} x${item.quantity} = GHS ${itemTotal}\n`;



});






let paymentName =

payment==="tcash"

?

"Telecel Cash"

:

"Bank Transfer";








let message = `

🛒 DHUB DIGITAL STORE

━━━━━━━━━━━━

Order ID:
${orderId}


Reference:
${reference}


Products:

${productsText}


━━━━━━━━━━━━

Total:

GHS ${total}


Payment:

${paymentName}


Customer:

${name}


Phone:

${phone}


Email:

${email}

`;






/* WHATSAPP */


window.open(

"https://wa.me/233204496069?text="

+

encodeURIComponent(message),

"_blank"

);








/* EMAIL RECEIPT */


sendEmailReceipt({

id:orderId,

products:cart,

customer:{

name:name,

email:email,

payment:paymentName

},

date:new Date().toLocaleString()

});







showMessage(

"Order sent successfully"

);





localStorage.removeItem(

"dhubCart"

);



cart=[];



}








/* ===========================================
   SEND EMAIL RECEIPT
=========================================== */


function sendEmailReceipt(order){



let productList="";



order.products.forEach(item=>{


productList +=

`

${item.name}

Quantity:
${item.quantity}

Price:
GHS ${item.price * item.quantity}


`;



});





const params = {


customer_name:

order.customer.name,



customer_email:

order.customer.email,



order_id:

order.id,



products:

productList,



payment:

order.customer.payment,



date:

order.date


};






emailjs.send(

"service_wcjw9mm",

"template_dq6buyi",

params

)

.then(()=>{


console.log(

"Receipt sent"

);


})

.catch(error=>{


console.log(

error

);


});



}







/* ===========================================
   MESSAGE SYSTEM
=========================================== */


function showMessage(text){



let box =

document.createElement(
"div"
);



box.className =
"notification";



box.innerHTML=text;



document.body.appendChild(box);




setTimeout(()=>{


box.classList.add(
"show"
);


},100);





setTimeout(()=>{


box.remove();


},3000);



}
