import "./site.js";
document.querySelector('[data-year]').textContent = new Date().getFullYear();
const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "friend";
document.querySelector("#submitted-name").textContent = name;
const summary = document.querySelector("#submission-summary");
const fields = [["Email", "email"], ["Phone", "phone"], ["Service", "service"], ["City", "city"], ["Description", "description"]];
fields.forEach(([label, key]) => {
  const term = document.createElement("dt");
  const value = document.createElement("dd");
  term.textContent = label;
  value.textContent = params.get(key) || "Not provided";
  summary.append(term, value);
});
