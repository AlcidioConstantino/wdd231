document.addEventListener("DOMContentLoaded", () => {
    const formData = new URLSearchParams(window.location.search);

    const resultsElement = document.getElementById("results");

    if (resultsElement && formData.has("fname")) {
        const rawDate = formData.get("timestamp");
        let formattedDate = rawDate;

        if (rawDate) {
            const dateObj = new Date(rawDate);
            formattedDate = dateObj.toLocaleString("pt-PT", {
                dateStyle: "medium",
                timeStyle: "short"
            });
        }

        resultsElement.innerHTML = `
            <p><strong>Nome:</strong> ${formData.get("fname")} ${formData.get("lname")}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${formData.get("email")}">${formData.get("email")}</a></p>
            <p><strong>Telemóvel/Celular:</strong> ${formData.get("phone")}</p>
            <p><strong>Empresa/Organização:</strong> ${formData.get("organization")}</p>

            <p><strong>Data de Envio:</strong> ${formattedDate}</p>
        `;
    }

    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector(".site-nav");

    menuButton?.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.textContent = isOpen ? "Close" : "Menu";
    });
});
