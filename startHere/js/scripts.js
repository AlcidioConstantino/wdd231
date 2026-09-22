const params = new URLSearchParams(window.location.search);
const firstName = params.get("first");
const lastName = params.get("last");
const phone = params.get("phone");
const email = params.get("email");
const ordinance = params.get("ordinance");
const date = params.get("date");
const location = params.get("location");
const results = document.querySelector("#results");

const appointmentDetails = [
  ["First Name", firstName],
  ["Last Name", lastName],
  ["Cell Phone", phone],
  ["Email", email],
  ["Ordinance", ordinance],
  ["Date", date],
  ["Location", location]
];

appointmentDetails.forEach(([label, value]) => {
  const detail = document.createElement("p");
  detail.textContent = `${label}: ${value || "Not provided"}`;
  results.append(detail);
});
