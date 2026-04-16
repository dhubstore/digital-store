// ================= CART =================
let cart = [];

// ================= DISPLAY PRODUCTS =================
function displayProducts(list){
  const container = document.getElementById("productList");
  if(!container) return;

  container.innerHTML = "";

  list.forEach((p,i)=>{
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" onerror="this.src='https://via.placeholder.com/200'">
        <h3>${p.name}</h3>
        <p>GHC ${p.price}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  });
}

// ================= FILTER =================
function filterProducts(category){
  if(category === 'all'){
    displayProducts(products);
  } else {
    displayProducts(products.filter(p => p.category === category));
  }
}

// ================= ADD TO CART =================
function addToCart(index){
  const product = products[index];
  const existing = cart.find(item => item.name === product.name);

  if(existing){
    existing.quantity += 1;
  } else {
    cart.push({...product, quantity:1});
  }

  updateCart();
}

// ================= UPDATE CART =================
function updateCart(){
  const count = document.getElementById("cartCount");
  const items = document.getElementById("cartItems");
  const total = document.getElementById("total");

  if(count) count.innerText = cart.reduce((s,i)=>s+i.quantity,0);

  if(items && total){
    items.innerHTML = "";
    let sum = 0;

    cart.forEach((item,index)=>{
      sum += item.price * item.quantity;

      items.innerHTML += `
        <div class="cart-item" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          
          <div>
            ${item.name}<br>
            GHC ${item.price} × ${item.quantity}
          </div>

          <div>
            <button onclick="decreaseQty(${index})">➖</button>
            <button onclick="increaseQty(${index})">➕</button>
            <button onclick="removeFromCart(${index})" style="background:red;color:white;">✖</button>
          </div>

        </div>
      `;
    });

    total.innerText = "Total: GHC " + sum;
  }
}

// ================= QUANTITY =================
function increaseQty(index){
  cart[index].quantity++;
  updateCart();
}

function decreaseQty(index){
  cart[index].quantity--;
  if(cart[index].quantity <= 0){
    cart.splice(index,1);
  }
  updateCart();
}

// ================= REMOVE ITEM =================
function removeFromCart(index){
  cart.splice(index,1);
  updateCart();
}

// ================= TOGGLE CART =================
function toggleCart(){
  const box = document.getElementById("cartBox");
  if(box){
    box.style.display = box.style.display === "block" ? "none" : "block";
  }
}

// ================= OPEN CHECKOUT FORM =================
function checkout(){
  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  document.getElementById("checkoutForm").style.display = "block";
}

// ================= CLOSE FORM =================
function closeForm(){
  document.getElementById("checkoutForm").style.display = "none";
}

// ================= SUBMIT ORDER =================
function submitOrder(){
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const email = document.getElementById("custEmail").value;
  const location = document.getElementById("custLocation").value;
  const proof = document.getElementById("paymentProof").value;

  if(!name || !phone || !email || !location || !proof){
    alert("Please fill all fields!");
    return;
  }

  const orderId = "DH-" + Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toLocaleString();

  let message = "🛒 *Digital Hub Order*%0A%0A";
  message += `🆔 Order ID: ${orderId}%0A%0A`;

  message += "📦 Items:%0A";

  let total = 0;

  cart.forEach((item, index)=>{
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    message += `${index + 1}. ${item.name} - GHC ${itemTotal}%0A`;
  });

  message += `%0A💰 Total: GHC ${total}%0A%0A`;

  message += "👤 Customer Details:%0A";
  message += `👤 Name: ${name}%0A`;
  message += `📱 Phone: ${phone}%0A`;
  message += `📧 Email: ${email}%0A`;
  message += `📍 Location: ${location}%0A`;
  message += `💳 Payment Ref: ${proof}%0A%0A`;

  message += `🕒 Date: ${date}%0A%0A`;
  message += "Please process my order.";

  // ✅ SEND TO WHATSAPP
  window.location.href = `https://wa.me/233509329683?text=${message}`;
}

// ================= INIT =================
displayProducts(products);
