// ==========================================
// JavaScript Basics & Setup
// ==========================================

console.log("Welcome to the Community Portal");

window.onload = function () {

    alert("Community Portal Loaded Successfully");
};

// ==========================================
// Syntax, Data Types, and Operators
// ==========================================

const portalName = "Community Portal";

const eventDate = "10 June 2026";

let availableSeats = 50;

let eventInfo =
    `${portalName} - ${eventDate} - Seats: ${availableSeats}`;

console.log(eventInfo);

// ==========================================
// Objects and Prototypes
// ==========================================

class Event {

    constructor(name, category, seats, date) {

        this.name = name;

        this.category = category;

        this.seats = seats;

        this.date = new Date(date);
    }
}

// Prototype Method
Event.prototype.checkAvailability = function () {

    return this.seats > 0;
};

// ==========================================
// Arrays and Methods
// ==========================================

let events = [

    new Event(
        "Music Fiesta",
        "Music",
        20,
        "2026-06-10"
    ),

    new Event(
        "Baking Workshop",
        "Workshop",
        10,
        "2026-06-15"
    ),

    new Event(
        "Football Match",
        "Sports",
        0,
        "2025-01-01"
    )
];

// Add new event using push()
events.push(
    new Event(
        "Dance Night",
        "Music",
        15,
        "2026-07-20"
    )
);

// Filter music events
let musicEvents = events.filter(
    event => event.category === "Music"
);

console.log(musicEvents);

// Map method
let formattedEvents = events.map(
    event => `Workshop on ${event.name}`
);

console.log(formattedEvents);

// ==========================================
// Functions and Closures
// ==========================================

function addEvent(event) {

    events.push(event);
}

function registerUser(eventName) {

    try {

        let selectedEvent =
            events.find(event => event.name === eventName);

        if (!selectedEvent) {

            throw new Error("Event Not Found");
        }

        if (selectedEvent.seats <= 0) {

            throw new Error("No Seats Available");
        }

        selectedEvent.seats--;

        displayEvents();

        alert("Registration Successful");

    } catch (error) {

        console.error(error.message);

        alert(error.message);
    }
}

// Closure Example
function registrationTracker(category) {

    let totalRegistrations = 0;

    return function () {

        totalRegistrations++;

        console.log(
            `${category} registrations:
            ${totalRegistrations}`
        );
    };
}

const musicRegistrationCounter =
    registrationTracker("Music");

// Higher Order Function
function filterEventsByCategory(category, callback) {

    let filtered = events.filter(
        event => event.category === category
    );

    callback(filtered);
}

// ==========================================
// DOM Manipulation
// ==========================================

const eventContainer =
    document.querySelector("#eventContainer");

function displayEvents(eventList = events) {

    eventContainer.innerHTML = "";

    eventList.forEach(event => {

        // Conditionals
        if (
            event.date < new Date()
            || event.seats <= 0
        ) {

            return;
        }

        let card =
            document.createElement("div");

        card.classList.add("eventCard");

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p>Category: ${event.category}</p>
            <p>Seats Left: ${event.seats}</p>

            <button onclick=
            "registerUser('${event.name}')">

            Register

            </button>
        `;

        eventContainer.appendChild(card);
    });
}

displayEvents();

// ==========================================
// Event Handling
// ==========================================

// Filter Events
document
    .querySelector("#categoryFilter")

    .onchange = function () {

        let category = this.value;

        if (category === "All") {

            displayEvents();

        } else {

            filterEventsByCategory(
                category,
                displayEvents
            );
        }
    };

// Search using keydown
document
    .querySelector("#searchBox")

    .addEventListener("keydown", function () {

        let searchText =
            this.value.toLowerCase();

        let filteredEvents =
            events.filter(event =>
                event.name
                    .toLowerCase()
                    .includes(searchText)
            );

        displayEvents(filteredEvents);
    });

// ==========================================
// Async JS, Promises, Async/Await
// ==========================================

const loading =
    document.querySelector("#loading");

// Using Promise
function fetchEvents() {

    loading.style.display = "block";

    return fetch(
        "https://jsonplaceholder.typicode.com/posts"
    )

        .then(response => response.json())

        .then(data => {

            console.log("Events Fetched", data);

            loading.style.display = "none";
        })

        .catch(error => {

            console.error(error);

            loading.style.display = "none";
        });
}

fetchEvents();

// Async Await
async function fetchEventsAsync() {

    try {

        loading.style.display = "block";

        let response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
        );

        let data = await response.json();

        console.log("Async Events", data);

    } catch (error) {

        console.error(error);

    } finally {

        loading.style.display = "none";
    }
}

fetchEventsAsync();

// ==========================================
// Modern JavaScript Features
// ==========================================

function showEventDetails(
    {
        name,
        category,
        seats
    } = {}
) {

    console.log(
        `${name} - ${category} - ${seats}`
    );
}

showEventDetails(events[0]);

// Spread Operator
let clonedEvents = [...events];

console.log(clonedEvents);

// ==========================================
// Working with Forms
// ==========================================

const form =
    document.querySelector("#registrationForm");

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        console.log("Form Submission Started");

        let username =
            form.elements["username"].value;

        let email =
            form.elements["email"].value;

        let selectedEvent =
            form.elements["eventName"].value;

        let valid = true;

        // Validation
        if (username === "") {

            document
                .querySelector("#nameError")
                .innerText =
                "Name is required";

            valid = false;

        } else {

            document
                .querySelector("#nameError")
                .innerText = "";
        }

        if (email === "") {

            document
                .querySelector("#emailError")
                .innerText =
                "Email is required";

            valid = false;

        } else {

            document
                .querySelector("#emailError")
                .innerText = "";
        }

        if (!valid) {

            return;
        }

        // AJAX POST Request
        sendRegistration({
            username,
            email,
            selectedEvent
        });
    }
);

// ==========================================
// AJAX & Fetch API
// ==========================================

function sendRegistration(userData) {

    console.log("Sending Data:", userData);

    setTimeout(() => {

        fetch(
            "https://jsonplaceholder.typicode.com/posts",

            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(userData)
            }
        )

            .then(response => response.json())

            .then(data => {

                console.log("Success:", data);

                document
                    .querySelector("#message")
                    .innerText =
                    "Registration Successful";
            })

            .catch(error => {

                console.error(error);

                document
                    .querySelector("#message")
                    .innerText =
                    "Registration Failed";
            });

    }, 2000);
}

// ==========================================
// Object.entries()
// ==========================================

Object.entries(events[0]).forEach(
    ([key, value]) => {

        console.log(key, value);
    }
);

// ==========================================
// jQuery
// ==========================================

$("#registerBtn").click(function () {

    $(".eventCard").fadeOut(1000)
        .fadeIn(1000);
});

// ==========================================
// Benefit of React or Vue
// ==========================================

console.log(
    "Frameworks like React or Vue provide \
better component-based architecture \
and faster UI updates."
);