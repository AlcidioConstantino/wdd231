import { attractions } from "../data/attractions.mjs";

const container = document.querySelector("#attractions");
container.innerHTML = attractions.map((place, index) => `
  <article class="attraction-card attraction-${index + 1}">
    <h2>${place.name}</h2>
    <figure><img src="images/discover/${place.image}" alt="${place.alt}" width="300" height="200" loading="lazy"></figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button type="button" class="learn-more" aria-label="Learn more about ${place.name}">Learn more</button>
  </article>`).join("");

const message = document.querySelector("#visit-message");
const now = Date.now();
const lastVisit = Number(localStorage.getItem("inhambaneDiscoverLastVisit"));
if (!lastVisit) {
  message.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const elapsed = now - lastVisit;
  const day = 24 * 60 * 60 * 1000;
  if (elapsed < day) message.textContent = "Back so soon! Awesome!";
  else {
    const days = Math.floor(elapsed / day);
    message.textContent = `Your last visit was ${days} ${days === 1 ? "day" : "days"} ago.`;
  }
}
localStorage.setItem("inhambaneDiscoverLastVisit", String(now));

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-nav");
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close" : "Menu";
});
