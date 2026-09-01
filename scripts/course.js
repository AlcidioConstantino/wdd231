const courses = [
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: false
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    }
];

const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#total-credits");

const allCoursesButton = document.querySelector("#all-courses");
const wddCoursesButton = document.querySelector("#wdd-courses");
const cseCoursesButton = document.querySelector("#cse-courses");


function displayCourses(courseArray) {

    courseList.innerHTML = "";

    courseArray.forEach((course) => {

        const courseCard = document.createElement("div");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} credits</p>
            ${
                course.completed
                    ? "<strong>Completed ✓</strong>"
                    : "<span>Not Completed</span>"
            }
        `;

        courseList.appendChild(courseCard);
    });

    calculateCredits(courseArray);
}


function calculateCredits(courseArray) {

    const credits = courseArray.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = credits;
}


function setActiveButton(activeButton) {

    document
        .querySelectorAll(".filter-button")
        .forEach((button) => {
            button.classList.remove("active");
        });

    activeButton.classList.add("active");
}


allCoursesButton.addEventListener("click", () => {

    displayCourses(courses);
    setActiveButton(allCoursesButton);

});


wddCoursesButton.addEventListener("click", () => {

    const wddCourses = courses.filter(
        (course) => course.subject === "WDD"
    );

    displayCourses(wddCourses);
    setActiveButton(wddCoursesButton);

});


cseCoursesButton.addEventListener("click", () => {

    const cseCourses = courses.filter(
        (course) => course.subject === "CSE"
    );

    displayCourses(cseCourses);
    setActiveButton(cseCoursesButton);

});


displayCourses(courses);
