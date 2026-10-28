import "./style.css";
const API_KEY = process.env.VISUAL_CROSSING_API_KEY;

async function getWeather() {
  const weatherResult = document.querySelector("#weather-result");
  weatherResult.style.display = "block";
  const searchButton = document.querySelector("#search-button");
  const cityNameElement = document.querySelector("#city-name");
const temperatureElement = document.querySelector("#temperature");
const conditionsElement = document.querySelector("#conditions");
const humidityElement = document.querySelector("#humidity");
const windSpeedElement = document.querySelector("#wind-speed");
const feelsLikeElement = document.querySelector("#feels-like");
const precipitationElement = document.querySelector("#precipitation");

  try {
    const locationInput = document.querySelector("#location-input");
    const city = locationInput.value.trim();

    if (!city) {
      throw new Error("Please enter a city name.");
    }
    searchButton.disabled = true; // will help avoid repeated clicks!

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&include=current&key=${API_KEY}&contentType=json`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Could not find weather for that city.");
    }

    const data = await response.json();
    const cityName = data.resolvedAddress;
const temperature = data.currentConditions.temp;
const conditions = data.currentConditions.conditions;
const humidity = data.currentConditions.humidity;
const windSpeed = data.currentConditions.windspeed;
const feelsLike = data.currentConditions.feelslike;
const precipitation = data.currentConditions.precip ?? 0;

cityNameElement.textContent = cityName;
temperatureElement.textContent = `${temperature}°C`;
conditionsElement.textContent = conditions;
humidityElement.textContent = `${humidity}%`;
windSpeedElement.textContent = `${windSpeed} km/h`;
feelsLikeElement.textContent = `${feelsLike}°C`;
precipitationElement.textContent = `${precipitation} mm`;
    

  } catch (error) {
    weatherResult.textContent = error.message;
  } finally {
    searchButton.disabled = false;
  }
}

const weatherForm = document.querySelector("#weather-form");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeather();
});