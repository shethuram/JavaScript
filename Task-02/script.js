let display = document.getElementById("display");

// Add input to display
function press(value) {
  display.value += value;
}

// Calculate result
function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

// Clear display
function clearDisplay() {
  display.value = "";
}