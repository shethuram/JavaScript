const API_KEY = CONFIG.API_KEY;

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

    const data = await response.json(); 

    if (!response.ok) {
      // extract API error message
      throw new Error(data.message || "Something went wrong");
    }


    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].description;

    result.innerHTML = `
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Condition:</strong> ${condition}</p>
    `;

  } catch (error) {
    result.innerHTML = `<p>${error.message}</p>`;
  }
}

// Enter key support
document.getElementById("city").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});