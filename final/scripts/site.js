export const DATA_URL = "data/professionals.json";

export async function loadProfessionals() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Request failed (${response.status})`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("The provider data is not a list.");
    return data;
  } catch (error) {
    console.error("Unable to load provider data:", error);
    throw error;
  }
}

export function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

export function providerCard(provider, { onDetails, favorites = [], onFavorite } = {}) {
  const article = makeElement("article", "provider-card");
  const top = makeElement("div", "provider-card-top");
  top.append(makeElement("span", "category-pill", provider.category));
  const favoriteButton = makeElement("button", "favorite-button", favorites.includes(provider.id) ? "♥ Saved" : "♡ Save");
  favoriteButton.type = "button";
  favoriteButton.setAttribute("aria-pressed", String(favorites.includes(provider.id)));
  favoriteButton.setAttribute("aria-label", `${favorites.includes(provider.id) ? "Remove" : "Save"} ${provider.name} ${favorites.includes(provider.id) ? "from" : "to"} favorites`);
  favoriteButton.addEventListener("click", () => onFavorite?.(provider.id));
  top.append(favoriteButton);
  article.append(top);
  article.append(makeElement("h3", "provider-name", provider.name));
  article.append(makeElement("p", "provider-location", `⌖ ${provider.city}`));
  article.append(makeElement("p", "provider-description", provider.description));
  const meta = makeElement("div", "provider-meta");
  meta.append(makeElement("span", "rating", `★ ${provider.rating.toFixed(1)}`));
  meta.append(makeElement("span", "availability", provider.availability));
  article.append(meta);
  const details = makeElement("button", "text-link details-button", "View details →");
  details.type = "button";
  details.addEventListener("click", () => onDetails?.(provider));
  article.append(details);
  return article;
}

export function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("is-open", open);
  });
}

export function setupFooter() {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
}

export function readFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem("mozhub-favorites") || "[]");
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.warn("Favorites could not be read from local storage:", error);
    return [];
  }
}

export function saveFavorites(favorites) {
  try {
    localStorage.setItem("mozhub-favorites", JSON.stringify(favorites));
  } catch (error) {
    console.warn("Favorites could not be saved:", error);
  }
}

export function showProviderDialog(dialog, provider) {
  const title = dialog.querySelector("#dialog-name");
  const content = dialog.querySelector("#dialog-content");
  title.textContent = provider.name;
  content.replaceChildren();
  const details = [
    ["Service", provider.category], ["City", provider.city], ["Rating", `★ ${provider.rating.toFixed(1)} / 5`],
    ["Availability", provider.availability], ["Phone", provider.phone], ["About", provider.description]
  ];
  details.forEach(([label, value]) => {
    const row = makeElement("p", "dialog-row");
    row.append(makeElement("strong", "", `${label}: `), document.createTextNode(value));
    content.append(row);
  });
  const call = makeElement("a", "button button-dark", "Call this provider");
  call.href = `tel:${provider.phone.replace(/[^+\d]/g, "")}`;
  content.append(call);
  dialog.showModal();
}

setupNavigation();
setupFooter();
