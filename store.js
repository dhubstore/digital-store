const productsData = {
  data:[
    { name:"1GB MTN DATA", price:5, image:"images/data-bundle.png" },
    { name:"2GB MTN DATA", price:10, image:"images/data-bundle.png" }
  ]
};

const productsDiv = document.getElementById("products");

// Toast System
const toastContainer = document.getElementById("toastContainer");
function showToast(message){
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  toastContainer.appendChild(toast);
  setTimeout(()=>{ toast.remove(); }, 3000);
}

// Display Products
function addProductCard(product){
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <div class="price">GH₵${product.price}</div>
    <button class="btn buy" onclick="addToCart('${product.name}',${product.price})">Add to Cart</button>
    <button class="btn buy-now" onclick="payWithPaystack('${product.name}',${product.price})">Buy Now</button>
  `;
  productsDiv.appendChild(card);
}

function showAllProducts(){ productsDiv.innerHTML=""; productsData.data.forEach(addProductCard); }
window.onload = showAllProducts;

// Cart
function openCart(){ document.getElementById("cartPanel").classList.add("show"); loadCart(); }
function closeCart(){ document.getElementById("cartPanel").classList.remove("show"); }

function addToCart(name,price){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({name,price});
  localStorage.setItem("cart",JSON.stringify(cart));
  loadCart();
  showToast(name + " added to cart");
}

function loadCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cartItems");
  let total = 0;
  cartItems.innerHTML = "";
  cart.forEach((item,index)=>{
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>GH₵${item.price}</span>
        <button class="remove-btn" onclick="removeItem(${index})">X</button>
      </div>`;
  });
  document.getElementById("cartTotal").innerText = total;
}

function removeItem(index){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  loadCart();
}

function checkoutCart(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if(cart.length === 0){ showToast("Your cart is empty."); return; }
  let total = cart.reduce((sum,item)=>sum+item.price,0);
  showToast(`Total: GH₵${total}. Use Buy Now buttons to pay.`);
}

// Paystack
function payWithPaystack(productName,amount){
  let email = prompt("Enter your email");
  if(!email) return;
  let handler = PaystackPop.setup({
    key:'pk_live_76e7df83f71c725b7e10d514b3c935324a97761e',
    email: email,
    amount: amount*100,
    currency: "GHS",
    callback: function(){ showToast(`${productName} purchased successfully!`); },
    onClose: function(){ showToast("Payment cancelled."); }
  });
  handler.openIframe();
}
