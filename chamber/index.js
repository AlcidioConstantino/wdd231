const membersURL = "data/members.json";

const membersContainer = document.querySelector("#spotlights");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

// OpenWeatherMap
const apiKey = "SUA_CHAVE_API_AQUI";
const lat = "-23.8647";
const lon = "35.3833";

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt&appid=${apiKey}`;

const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt&appid=${apiKey}`;


// ===============================
// MEMBERS - SPOTLIGHTS
// ===============================

async function getMembers() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();

        // Gold = 3 | Silver = 2
        const qualifiedMembers = members.filter(
            member => member.membership === 2 || member.membership === 3
        );

        // Shuffle eligible members
        qualifiedMembers.sort(() => Math.random() - 0.5);

        // Select up to three members
        const selectedMembers = qualifiedMembers.slice(0, 3);

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error("Error loading members:", error);

        membersContainer.innerHTML =
            "<p>Unable to load member information.</p>";
    }
}


function displaySpotlights(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name}"
                loading="lazy"
            >

            <h3>${member.name}</h3>

            <p>${member.description}</p>

            <p>
                <strong>Phone:</strong>
                ${member.phone}
            </p>

            <p>
                <strong>Address:</strong>
                ${member.address}
            </p>

            <p>
                <strong>Membership:</strong>
                ${member.membership === 3 ? "Gold" : "Silver"}
            </p>

            <a
                href="${member.website}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Visit Website
            </a>
        `;

        membersContainer.appendChild(card);
    });
}


// ===============================
// WEATHER - CURRENT
// ===============================

async function getCurrentWeather() {

    try {
        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        displayCurrentWeather(data);

    } catch (error) {
        console.error("Error loading current weather:", error);
    }
}


function displayCurrentWeather(data) {

    const weatherContainer =
        document.querySelector("#current-weather");

    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherContainer.innerHTML = `
        <img
            src="https://openweathermap.org/img/wn/${icon}@2x.png"
            alt="${description}"
        >

        <p>
            <strong>${temperature}°C</strong>
            ${description}
        </p>
    `;
}


// ===============================
// WEATHER - FORECAST
// ===============================

async function getForecast() {

    try {
        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        displayForecast(data);

    } catch (error) {
        console.error("Error loading forecast:", error);
    }
}


function displayForecast(data) {

    const forecastContainer =
        document.querySelector("#forecast");

    forecastContainer.innerHTML = "";

    const dailyForecasts = data.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    dailyForecasts.forEach(day => {

        const date = new Date(day.dt_txt);

        const dayName = date.toLocaleDateString("pt-PT", {
            weekday: "long"
        });

        const temperature = Math.round(day.main.temp);

        const forecastDay = document.createElement("div");

        forecastDay.classList.add("forecast-day");

        forecastDay.innerHTML = `
            <p>
                <strong>${dayName}:</strong>
                ${temperature}°C
            </p>
        `;

        forecastContainer.appendChild(forecastDay);
    });
}


// ===============================
// FOOTER
// ===============================

const today = new Date();

currentYear.textContent = today.getFullYear();

lastModified.textContent =
    `Last Modification: ${document.lastModified}`;


// ===============================
// RUN
// ===============================

getMembers();
getCurrentWeather();
getForecast();
