import { loadProfessionals, providerCard } from "./site.js";

const categoryList = document.querySelector("#category-list");
const featuredList = document.querySelector("#featured-list");

try {
  const providers = await loadProfessionals();
  const categories = [...new Set(providers.map((provider) => provider.category))].slice(0, 6);
  categoryList.replaceChildren(...categories.map((category) => {
    const link = document.createElement("a");
    link.className = "category-card";
    link.href = `professionals.html?category=${encodeURIComponent(category)}`;
    link.append(document.createElement("span"));
    link.lastElementChild.className = "category-symbol";
    link.lastElementChild.setAttribute("aria-hidden", "true");
    link.lastElementChild.textContent = category.slice(0, 1);
    const label = document.createElement("strong");
    label.textContent = category;
    link.append(label);
    link.append(Object.assign(document.createElement("span"), { className: "category-arrow", textContent: "→" }));
    return link;
  }));
  const featured = providers.filter((provider) => provider.rating >= 4.8).slice(0, 3);
  featuredList.replaceChildren(...featured.map((provider) => providerCard(provider)));
} catch {
  categoryList.innerHTML = '<p class="error-message">Services are temporarily unavailable. Please try again later.</p>';
  featuredList.replaceChildren();
}
