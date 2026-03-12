function buyProduct(product){
localStorage.setItem("product",product)
window.location="payment.html"
}

function completePayment(){
let product=localStorage.getItem("product")
document.getElementById("paymentMessage").innerText="Payment successful. Your "+product+" will be delivered."
}
