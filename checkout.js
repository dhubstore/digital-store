/* ==========================================
   DHUB DIGITAL STORE CHECKOUT.JS
========================================== */


/* ==========================
 EMAILJS
========================== */

(function(){

emailjs.init({

publicKey:"MIBwgH6UI5icqbNJL"

});

})();



/* ==========================
 LOAD CART
========================== */


let cart = JSON.parse(
localStorage.getItem("dhubCart")
) || [];



if(cart.length === 0){

showMessage("Your cart is empty");


setTimeout(()=>{

window.location.href="index.html";

},1500);


}




/* ==========================
 ORDER DETAILS
========================== */


const orderId =
"DH-" + Math.floor(100000 + Math.random()*900000);


const reference =
"REF-" + Math.floor(100000 + Math.random()*900000);



const proof =
document.getElementById("paymentProof");


if(proof){

proof.value = reference;

}



/* ==========================
 DISPLAY ORDER
========================== */


function loadOrder(){


let box =
document.getElementById("orderSummary");


if(!box)return;



let total=0;



let html=`


<div style="background:#020617;padding:20px;border-radius:15px;">


<h3>
🧾 Order Summary
</h3>


<hr>

`;



cart.forEach(item=>{


let price =
item.price * item.quantity;


total += price;



html += `


<div style="display:flex;justify-content:space-between;margin:10px 0;">


<span>
${item.name} x${item.quantity}
</span>


<b>
GHS ${price}
</b>


</div>


`;



});



html += `


<hr>


<h3>
Total: GHS ${total}
</h3>


</div>


`;



box.innerHTML=html;



}


loadOrder();





/* ==========================
 PAYMENT DETAILS
========================== */


function updatePaymentDetails(){


let method =
document.getElementById("paymentMethod");


let box =
document.getElementById("paymentDetails");



if(!method || !box)return;




if(method.value==="tcash"){



box.innerHTML=`


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
Reference:
<b>
${reference}
</b>
</p>


`;



}else{


box.innerHTML=`

<p>
Bank transfer coming soon.
</p>

`;



}


}




document
.getElementById("paymentMethod")
.addEventListener(
"change",
updatePaymentDetails
);



updatePaymentDetails();





/* ==========================
 COPY NUMBER
========================== */


function copyNumber(){


let number =
document.getElementById("momoNumber");



if(number){


navigator.clipboard.writeText(
number.innerText
);


showMessage(
"Number copied"
);


}



}





/* ==========================
 SUBMIT ORDER
========================== */


function submitOrder(){


let name =
document.getElementById("custName").value;


let phone =
document.getElementById("custPhone").value;


let email =
document.getElementById("custEmail").value;


let payment =
document.getElementById("paymentMethod").value;



if(!name || !phone || !email || !payment){


showMessage(
"Please complete all fields"
);


return;


}



let total=0;

let products="";



cart.forEach((item,index)=>{


let itemTotal =
item.price * item.quantity;


total += itemTotal;



products +=
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

━━━━━━━━━━━━━━

Order ID:
${orderId}


Reference:
${reference}


Products:

${products}


━━━━━━━━━━━━━━

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





/* EMAIL */

emailjs.send(

"service_wcjw9mm",

"template_dq6buyi",

{


customer_name:name,

customer_email:email,

order_id:orderId,

products:products,

payment:paymentName,

total:total


}

);





showMessage(
"Order sent successfully"
);




localStorage.removeItem(
"dhubCart"
);



setTimeout(()=>{


window.location.href="index.html";


},2000);



}







/* ==========================
 MESSAGE
========================== */


function showMessage(text){


let box=document.createElement("div");


box.className="notification";


box.innerHTML=text;



document.body.appendChild(box);



setTimeout(()=>{

box.classList.add("show");

},100);



setTimeout(()=>{

box.remove();

},3000);



}
