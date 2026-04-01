import { products } from "./products.js";
import { getCart, updateQty } from "./cart.js";

const cartDiv = document.getElementById("cart");
const checkoutBtn = document.getElementById("checkoutBtn");

// Summary fields
const subtotalEl = document.getElementById("subtotal");
const cgstEl = document.getElementById("cgst");
const sgstEl = document.getElementById("sgst");
const feeEl = document.getElementById("fee");
const finalTotalEl = document.getElementById("finalTotal");

function renderCart() {
  const cart = getCart();

  // 🟡 EMPTY CART
  if (cart.length === 0) {
    cartDiv.innerHTML = "Cart is empty 🥲";

    subtotalEl.innerText = "";
    cgstEl.innerText = "";
    sgstEl.innerText = "";
    feeEl.innerText = "";
    finalTotalEl.innerText = "";

    checkoutBtn.disabled = true;
    return;
  }

  checkoutBtn.disabled = false;

  let subtotal = 0;

  cartDiv.innerHTML = cart.map(item => {
    const p = products.find(x => x.id === item.id);

    if (!p) return ""; // safety

    subtotal += p.price * item.qty;

    return `
      <div class="cart-card">
        
        <img src="${p.img}" class="cart-img">

        <div class="cart-details">
          <h4>${p.name}</h4>
          <p>₹${p.price}</p>

          <div class="qty">
            <button onclick="handleQty(${item.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="handleQty(${item.id}, 1)">+</button>
          </div>

          <button class="remove" onclick="removeItem(${item.id})">
            Remove
          </button>
        </div>

        <div class="cart-price">
          ₹${p.price * item.qty}
        </div>

      </div>
    `;
  }).join("");

  // 💰 CALCULATIONS
  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const fee = 20;
  const total = subtotal + cgst + sgst + fee;

  subtotalEl.innerText = `Subtotal: ₹${subtotal}`;
  cgstEl.innerText = `CGST (9%): ₹${cgst.toFixed(2)}`;
  sgstEl.innerText = `SGST (9%): ₹${sgst.toFixed(2)}`;
  feeEl.innerText = `Platform Fee: ₹${fee}`;
  finalTotalEl.innerText = `Total: ₹${total.toFixed(2)}`;
}

// ➕➖ Quantity
window.handleQty = (id, change) => {
  updateQty(id, change);
  renderCart();
};

// ❌ Remove (clean way)
window.removeItem = (id) => {
  const cart = getCart();
  const item = cart.find(p => p.id === id);
  if (!item) return;

  updateQty(id, -item.qty); // remove fully
  renderCart();
};

// 💳 Checkout
checkoutBtn.onclick = () => {
  document.getElementById("modal").classList.remove("hidden");
};

// ❌ Close modal
window.closeModal = () => {
  document.getElementById("modal").classList.add("hidden");
};

// 🚀 Init
renderCart();