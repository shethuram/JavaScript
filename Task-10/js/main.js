import { products } from "./products.js";
import { getCart, addToCart, updateQty } from "./cart.js";

const productDiv = document.getElementById("products");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

function renderProducts(list) {
  const cart = getCart();

  productDiv.innerHTML = list.map(p => {
    const item = cart.find(c => c.id === p.id);

    return `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p class="price">₹${p.price}</p>

        ${
          item
            ? `
              <div class="qty">
                <button onclick="handleQty(${p.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="handleQty(${p.id}, 1)">+</button>
              </div>
            `
            : `
              <button onclick="handleAdd(${p.id})">Add to Cart</button>
            `
        }

      </div>
    `;
  }).join("");
}



function applyFilter() {
  let filtered = [...products];

  const search = searchInput.value.toLowerCase();
  const category = filterSelect.value;

  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search)
    );
  }

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  renderProducts(filtered);
}

window.handleAdd = (id) => {
  addToCart(id);
  renderProducts(products);
  updateCartCount();
};

window.handleQty = (id, change) => {
  updateQty(id, change);
  renderProducts(products);
  updateCartCount();
};

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  document.getElementById("cartCount").innerText = count;
}

searchInput.addEventListener("input", applyFilter);
filterSelect.addEventListener("change", applyFilter);

renderProducts(products);
updateCartCount();