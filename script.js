const apiKey = '553e71c1f00f386837410f1d8b39748e'; // Replace with your own API key

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  const weatherBox = document.getElementById('weather');

  errorMsg.innerText = "";
  weatherBox.style.display = "none";

  if (!city) {
    errorMsg.innerText = "⚠️ Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temperature').innerText = `🌡 Temperature: ${data.main.temp}°C`;
    document.getElementById('description').innerText = `☁️ ${data.weather[0].description}`;
    document.getElementById('icon').src = iconUrl;

    weatherBox.style.display = 'block';
  } catch (error) {
    errorMsg.innerText = "❌ " + error.message;
  }
}
