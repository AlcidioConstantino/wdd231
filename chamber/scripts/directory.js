const membersURL = "data/members.json";

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");


async function getMembers() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Error loading members:", error);

        membersContainer.innerHTML =
            "<p>Unable to load member information.</p>";
    }
}


function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("section");

        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name}"
                loading="lazy"
            >

            <h2>${member.name}</h2>

            <p>${member.description}</p>

            <p>
                <strong>Address:</strong>
                ${member.address}
            </p>

            <p>
                <strong>Phone:</strong>
                ${member.phone}
            </p>

            <p>
                <strong>Membership:</strong>
                Level ${member.membership}
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


/* Grid View */

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");

});


/* List View */

listButton.addEventListener("click", () => {

    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");

});


/* Current Year */

const today = new Date();

currentYear.textContent = today.getFullYear();


/* Last Modified */

lastModified.textContent =
    `Last Modification: ${document.lastModified}`;


/* Load Members */

getMembers();
