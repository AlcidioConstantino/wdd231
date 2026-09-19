const membersURL = "data/members.json";

const membersContainer = document.querySelector("#spotlights");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// Open-Meteo is a public weather API and does not require exposing an API key.
const weatherURL = "https://api.open-meteo.com/v1/forecast?latitude=-23.8647&longitude=35.3833&current=temperature_2m,weather_code&timezone=auto";
const forecastURL = "https://api.open-meteo.com/v1/forecast?latitude=-23.8647&longitude=35.3833&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=3";

async function getMembers() {
  try {
    const response = await fetch(membersURL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const members = await response.json();
    const qualifiedMembers = members
      .filter((member) => member.membership === 2 || member.membership === 3)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    displaySpotlights(qualifiedMembers);
  } catch (error) {
    console.error("Error loading members:", error);
    membersContainer.innerHTML = "<p>Unable to load member information.</p>";
  }
}

function displaySpotlights(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("spotlight-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.description}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Membership:</strong> ${member.membership === 3 ? "Gold" : "Silver"}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
    `;
    membersContainer.appendChild(card);
  });
}

async function getCurrentWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    displayCurrentWeather(await response.json());
  } catch (error) {
    console.error("Error loading current weather:", error);
  }
}

function displayCurrentWeather(data) {
  const weatherContainer = document.querySelector("#current-weather");
  const temperature = Math.round(data.current.temperature_2m);
  const code = data.current.weather_code;
  const descriptions = { 0: "Clear sky", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast", 45: "Fog", 48: "Fog", 51: "Light drizzle", 53: "Drizzle", 55: "Heavy drizzle", 61: "Light rain", 63: "Moderate rain", 65: "Heavy rain", 80: "Rain showers", 81: "Rain showers", 82: "Heavy showers", 95: "Thunderstorm" };
  const icon = code <= 1 ? "☀️" : code <= 3 ? "⛅" : code <= 48 ? "🌫️" : code <= 67 ? "🌧️" : "⛈️";
  weatherContainer.innerHTML = `<p class="weather-now"><span aria-hidden="true">${icon}</span><strong>${temperature}°C</strong> ${descriptions[code] || "Local conditions"}</p>`;
}

async function getForecast() {
  try {
    const response = await fetch(forecastURL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    displayForecast(await response.json());
  } catch (error) {
    console.error("Error loading forecast:", error);
  }
}

function displayForecast(data) {
  const forecastContainer = document.querySelector("#forecast");
  forecastContainer.innerHTML = "";

  data.daily.time.forEach((date, index) => {
      const dayName = new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long" });
      const forecastDay = document.createElement("div");
      forecastDay.classList.add("forecast-day");
      forecastDay.innerHTML = `<strong>${dayName}:</strong><span>${Math.round(data.daily.temperature_2m_max[index])}° / ${Math.round(data.daily.temperature_2m_min[index])}°C</span>`;
      forecastContainer.appendChild(forecastDay);
  });
}

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector(".site-nav");
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close" : "Menu";
});

getMembers();
getCurrentWeather();
getForecast();
