const API_KEY = "4302fed7e98aa01e59d11ab09f8b23df";

async function getWeather() {
  const input = document.getElementById("city");
  const city = input.value.trim();
  const result = document.getElementById("result");

  if (city === "") {
    result.innerHTML = "<p>Please enter a city name</p>";
    return;
  }

  result.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].description;

    result.innerHTML = `
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Condition:</strong> ${condition}</p>
    `;

  } catch (error) {
    result.innerHTML = "<p>City not found or error fetching data</p>";
  }
}

// Enter key support
document.getElementById("city").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});