const list = document.getElementById("list");
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

let draggedItem = null;
let placeholder = document.createElement("li");
placeholder.className = "placeholder";

//  Add item
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.className = "item";
  li.textContent = text;
  li.draggable = true;

  addDragEvents(li);

  list.appendChild(li);
  input.value = "";
});

//  allow drop anywhere
list.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
});

// drop handling (container level)
list.addEventListener("drop", () => {

  const target = document.querySelector("[data-action]");
  if (!target) return;

  const action = target.dataset.action;

  if (action === "above" || action === "below") {
    list.insertBefore(draggedItem, placeholder);
  }

  else if (action === "swap") {
    if (draggedItem !== target) {
      const draggedNext = draggedItem.nextSibling;
      const targetNext = target.nextSibling;

      list.insertBefore(draggedItem, targetNext);
      list.insertBefore(target, draggedNext);
    }
  }

  clearAll();
});

//  attach drag events
function addDragEvents(item) {

  item.addEventListener("dragstart", () => {
    draggedItem = item;
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
    clearAll();
  });

  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const rect = item.getBoundingClientRect();
    const offset = e.clientY - rect.top;

    const topZone = rect.height * 0.25;
    const bottomZone = rect.height * 0.75;

    placeholder.remove();
    clearHighlights();

    document.querySelectorAll(".item").forEach(i => {
      delete i.dataset.action;
    });

    if (offset < topZone) {
      //  insert above
      list.insertBefore(placeholder, item);
      item.dataset.action = "above";

    } else if (offset > bottomZone) {
      //  insert below
      list.insertBefore(placeholder, item.nextSibling);
      item.dataset.action = "below";

    } else {
      //  swap
      item.classList.add("swap-hover");
      item.dataset.action = "swap";
    }
  });

  item.addEventListener("dragleave", () => {
    item.classList.remove("swap-hover");
  });
}

//  cleanup
function clearHighlights() {
  document.querySelectorAll(".item").forEach(i => {
    i.classList.remove("swap-hover");
  });
}

function clearAll() {
  placeholder.remove();
  clearHighlights();

  document.querySelectorAll(".item").forEach(i => {
    delete i.dataset.action;
  });
}