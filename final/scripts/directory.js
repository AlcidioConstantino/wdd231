import { loadProfessionals, providerCard, readFavorites, saveFavorites, showProviderDialog } from "./site.js";

const list = document.querySelector("#provider-list");
const count = document.querySelector("#results-count");
const search = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const cityFilter = document.querySelector("#city-filter");
const favoritesButton = document.querySelector("#favorites-filter");
const dialog = document.querySelector("#provider-dialog");
const closeDialog = dialog.querySelector(".dialog-close");
let providers = [];
let favorites = readFavorites();
let favoritesOnly = false;

function render() {
  const query = search.value.trim().toLocaleLowerCase();
  const filtered = providers.filter((provider) => {
    const matchesQuery = `${provider.name} ${provider.category} ${provider.city} ${provider.description}`.toLocaleLowerCase().includes(query);
    const matchesCategory = categoryFilter.value === "all" || provider.category === categoryFilter.value;
    const matchesCity = cityFilter.value === "all" || provider.city === cityFilter.value;
    const matchesFavorite = !favoritesOnly || favorites.includes(provider.id);
    return matchesQuery && matchesCategory && matchesCity && matchesFavorite;
  });
  count.textContent = `${filtered.length} ${filtered.length === 1 ? "professional" : "professionals"} found`;
  if (!filtered.length) {
    list.innerHTML = '<p class="empty-message">No providers match those filters. Try changing your search.</p>';
    return;
  }
  list.replaceChildren(...filtered.map((provider) => providerCard(provider, {
    favorites,
    onDetails: (selected) => showProviderDialog(dialog, selected),
    onFavorite: toggleFavorite
  })));
}

function toggleFavorite(id) {
  favorites = favorites.includes(id) ? favorites.filter((favorite) => favorite !== id) : [...favorites, id];
  saveFavorites(favorites);
  render();
}

try {
  providers = await loadProfessionals();
  const categories = [...new Set(providers.map((provider) => provider.category))].sort();
  const cities = [...new Set(providers.map((provider) => provider.city))].sort();
  categories.forEach((category) => categoryFilter.add(new Option(category, category)));
  cities.forEach((city) => cityFilter.add(new Option(city, city)));
  const initialCategory = new URLSearchParams(location.search).get("category");
  if (categories.includes(initialCategory)) categoryFilter.value = initialCategory;
  search.addEventListener("input", render);
  categoryFilter.addEventListener("change", render);
  cityFilter.addEventListener("change", render);
  favoritesButton.addEventListener("click", () => {
    favoritesOnly = !favoritesOnly;
    favoritesButton.setAttribute("aria-pressed", String(favoritesOnly));
    favoritesButton.textContent = favoritesOnly ? "♥ Showing saved" : "♡ Saved only";
    render();
  });
  closeDialog.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  render();
} catch {
  count.textContent = "We could not load the directory.";
  list.innerHTML = '<p class="error-message">Please reload the page when the site data is available.</p>';
}
