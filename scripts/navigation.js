const navButton = document.querySelector(".nav-toggle");
const navBar = document.querySelector(".site-nav");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navBar.classList.toggle("show");

    const isOpen = navBar.classList.contains("show");

    navButton.setAttribute("aria-expanded", isOpen);
    navButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
    );
});
