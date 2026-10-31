const WHATSAPP_NUMBER = "917451807053";
const form = document.getElementById("bookingForm");
const dateInput = document.getElementById("date");
const errorBox = document.getElementById("formError");
document.getElementById("year").textContent = new Date().getFullYear();

const now = new Date();
const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0,10);
dateInput.min = today;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorBox.textContent = "";
  if (!form.reportValidity()) return;
  const val = id => document.getElementById(id).value.trim();
  const message = [
    "Hello AS Tour and Travel! I would like to request a cab booking.",
    "",
    `Trip type: ${val("tripType")}`,
    `Pickup: ${val("pickup")}`,
    `Drop: ${val("drop")}`,
    `Date: ${val("date")}`,
    `Time: ${val("time")}`,
    `Passengers: ${val("passengers")}`,
    `Name: ${val("name")}`,
    `Phone: ${val("phone")}`,
    val("notes") ? `Additional notes: ${val("notes")}` : ""
  ].filter(Boolean).join("\\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const routeSets = {
  popular: [
    ["ONE WAY TRIP","LUCKNOW","DELHI / NOIDA"],
    ["ONE WAY TRIP","LUCKNOW","VARANASI"],
    ["ONE WAY TRIP","LUCKNOW","AGRA"],
    ["ONE WAY TRIP","LUCKNOW","PRAYAGRAJ"],
    ["FIXED PLAN • ONE WAY TRIP","AGRA","DELHI"]
  ],
  airport: [
    ["AIRPORT TRANSFER","LUCKNOW","LUCKNOW AIRPORT"],
    ["AIRPORT TRANSFER","KANPUR","DELHI AIRPORT"],
    ["AIRPORT TRANSFER","AGRA","DELHI AIRPORT"],
    ["AIRPORT TRANSFER","VARANASI","LAL BAHADUR SHASTRI AIRPORT"]
  ],
  pilgrimage: [
    ["PILGRIMAGE SPECIAL","LUCKNOW","AYODHYA"],
    ["PILGRIMAGE SPECIAL","LUCKNOW","VARANASI"],
    ["PILGRIMAGE SPECIAL","LUCKNOW","PRAYAGRAJ"],
    ["PILGRIMAGE SPECIAL","KANPUR","MATHURA / VRINDAVAN"]
  ]
};
const routeGrid = document.getElementById("routeGrid");
function renderRoutes(type) {
  routeGrid.innerHTML = routeSets[type].map(([meta,from,to]) => `
    <article class="route-card">
      <span class="route-meta">${meta}</span><span class="route-tag">AS TRAVEL</span>
      <h3>${from} <span>→</span> ${to}</h3>
      <div class="route-divider"></div>
      <div class="route-fare">☎ Call for fixed fare</div>
      <a class="btn yellow" href="tel:+917451807053">BOOK THIS ROUTE</a>
    </article>`).join("");
}
renderRoutes("popular");
document.querySelectorAll(".route-tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".route-tab").forEach(item => item.classList.remove("active"));
  tab.classList.add("active");
  renderRoutes(tab.dataset.route);
}));

// Navigation labels support a Hindi/English toggle. Main content remains English
// until Hindi copy is supplied and verified by the business.
document.querySelectorAll(".lang").forEach(button => button.addEventListener("click", () => {
  document.querySelectorAll(".lang").forEach(item => item.classList.toggle("active", item === button));
  const hindi = button.dataset.lang === "hi";
  document.documentElement.lang = hindi ? "hi" : "en";
  nav.querySelectorAll("a").forEach(link => link.textContent = link.dataset[hindi ? "hi" : "en"]);
}));
