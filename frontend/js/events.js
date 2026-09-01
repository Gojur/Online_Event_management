const EVENTS_API =
    "http://localhost:5000/api";


// ==========================================
// LOAD EVENTS
// ==========================================

async function loadEvents() {

    const container =
        document.getElementById(
            "eventsContainer"
        );

    if (!container) return;


    try {

        const response = await fetch(
            `${EVENTS_API}/events`
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load events"
            );

        }


        if (
            !data.events ||
            data.events.length === 0
        ) {

            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        No events available.
                    </div>
                </div>
            `;

            return;
        }


        container.innerHTML =
            data.events.map(event => `

                <div class="col-md-4">

                    <div class="card event-card shadow h-100">

                        <div class="card-body">

                            <h4 class="card-title">
                                ${event.title}
                            </h4>

                            <p class="card-text">
                                ${event.description}
                            </p>

                            <hr>

                            <p>
                                <strong>Date:</strong>
                                ${event.event_date}
                            </p>

                            <p>
                                <strong>Time:</strong>
                                ${event.event_time}
                            </p>

                            <p>
                                <strong>Location:</strong>
                                ${event.location}
                            </p>

                            <p>
                                <strong>Capacity:</strong>
                                ${event.capacity}
                            </p>


                            <a
                                href="event-details.html?id=${event.id}"
                                class="btn btn-outline-primary">

                                View Details

                            </a>


                            <button
                                onclick="registerForEvent(${event.id})"
                                class="btn btn-primary">

                                Register

                            </button>

                        </div>

                    </div>

                </div>

            `).join("");


    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="col-12">

                <div class="alert alert-danger">
                    Failed to load events.
                    Please make sure the backend
                    server is running.
                </div>

            </div>
        `;

    }
}


// ==========================================
// REGISTER FOR EVENT
// ==========================================

async function registerForEvent(eventId) {

    const token =
        localStorage.getItem("token");


    if (!token) {

        alert("Please login first.");

        window.location.href =
            "login.html";

        return;
    }


    try {

        const response = await fetch(
            `${EVENTS_API}/registrations`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    event_id: eventId
                })
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.message);

            return;
        }


        alert(data.message);


    } catch (error) {

        console.error(error);

        alert("Server connection error.");

    }
}


// ==========================================
// EVENT DETAILS
// ==========================================

async function loadEventDetails() {

    const container =
        document.getElementById(
            "eventDetails"
        );

    if (!container) return;


    const params =
        new URLSearchParams(
            window.location.search
        );


    const eventId =
        params.get("id");


    if (!eventId) {

        container.innerHTML = `
            <div class="alert alert-danger">
                Event ID is missing.
            </div>
        `;

        return;
    }


    try {

        const response = await fetch(
            `${EVENTS_API}/events/${eventId}`
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Event not found"
            );

        }


        const event =
            data.event || data;


        container.innerHTML = `

            <div class="col-md-8">

                <div class="card shadow event-details-card">

                    <div class="card-body p-4">

                        <h1>
                            ${event.title}
                        </h1>

                        <hr>

                        <p>
                            ${event.description}
                        </p>

                        <p>
                            <strong>Date:</strong>
                            ${event.event_date}
                        </p>

                        <p>
                            <strong>Time:</strong>
                            ${event.event_time}
                        </p>

                        <p>
                            <strong>Location:</strong>
                            ${event.location}
                        </p>

                        <p>
                            <strong>Capacity:</strong>
                            ${event.capacity}
                        </p>

                        <button
                            onclick="registerForEvent(${event.id})"
                            class="btn btn-primary">

                            Register for Event

                        </button>

                    </div>

                </div>

            </div>

        `;


    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="col-md-8">

                <div class="alert alert-danger">
                    ${error.message}
                </div>

            </div>
        `;

    }
}


// ==========================================
// ADMIN - LOAD EVENTS
// ==========================================

async function loadAdminEvents() {

    const container =
        document.getElementById(
            "adminEventsContainer"
        );

    if (!container) return;


    const token =
        localStorage.getItem("token");


    if (!token) {

        window.location.href =
            "admin-login.html";

        return;
    }


    try {

        const response = await fetch(
            `${EVENTS_API}/events`
        );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load events"
            );

        }


        if (
            !data.events ||
            data.events.length === 0
        ) {

            container.innerHTML = `
                <div class="alert alert-info">
                    No events available.
                </div>
            `;

            return;
        }


        container.innerHTML =
            data.events.map(event => `

                <div class="col-md-6">

                    <div class="card shadow h-100">

                        <div class="card-body">

                            <h4>
                                ${event.title}
                            </h4>

                            <p>
                                ${event.description}
                            </p>

                            <p>
                                <strong>Date:</strong>
                                ${event.event_date}
                            </p>

                            <p>
                                <strong>Location:</strong>
                                ${event.location}
                            </p>

                            <p>
                                <strong>Capacity:</strong>
                                ${event.capacity}
                            </p>


                            <button
                                onclick='editEvent(${JSON.stringify(event)})'
                                class="btn btn-warning">

                                Edit

                            </button>


                            <button
                                onclick="deleteEvent(${event.id})"
                                class="btn btn-danger">

                                Delete

                            </button>

                        </div>

                    </div>

                </div>

            `).join("");


    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="alert alert-danger">
                ${error.message}
            </div>
        `;

    }
}


// ==========================================
// ADMIN - ADD / UPDATE EVENT
// ==========================================

const eventForm =
    document.getElementById("eventForm");


if (eventForm) {

    eventForm.addEventListener(
        "submit",
        async function(e) {

            e.preventDefault();


            const token =
                localStorage.getItem("token");


            const eventId =
                document.getElementById(
                    "eventId"
                ).value;


            const eventData = {

                title:
                    document.getElementById(
                        "eventTitle"
                    ).value,

                description:
                    document.getElementById(
                        "eventDescription"
                    ).value,

                event_date:
                    document.getElementById(
                        "eventDate"
                    ).value,

                event_time:
                    document.getElementById(
                        "eventTime"
                    ).value,

                location:
                    document.getElementById(
                        "eventLocation"
                    ).value,

                capacity:
                    document.getElementById(
                        "eventCapacity"
                    ).value
            };


            const method =
                eventId ? "PUT" : "POST";


            const url =
                eventId
                    ? `${EVENTS_API}/events/${eventId}`
                    : `${EVENTS_API}/events`;


            try {

                const response =
                    await fetch(
                        url,
                        {
                            method,

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Authorization":
                                    `Bearer ${token}`
                            },

                            body:
                                JSON.stringify(eventData)
                        }
                    );


                const data =
                    await response.json();


                const message =
                    document.getElementById(
                        "adminMessage"
                    );


                if (!response.ok) {

                    showAdminMessage(
                        data.message,
                        "danger"
                    );

                    return;
                }


                showAdminMessage(
                    data.message ||
                    "Event saved successfully",
                    "success"
                );


                clearEventForm();

                loadAdminEvents();


            } catch (error) {

                console.error(error);

                showAdminMessage(
                    "Server connection error.",
                    "danger"
                );

            }

        }
    );
}


// ==========================================
// EDIT EVENT
// ==========================================

function editEvent(event) {

    document.getElementById(
        "eventId"
    ).value = event.id;


    document.getElementById(
        "eventTitle"
    ).value = event.title;


    document.getElementById(
        "eventDescription"
    ).value = event.description;


    document.getElementById(
        "eventDate"
    ).value = event.event_date;


    document.getElementById(
        "eventTime"
    ).value = event.event_time;


    document.getElementById(
        "eventLocation"
    ).value = event.location;


    document.getElementById(
        "eventCapacity"
    ).value = event.capacity;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// DELETE EVENT
// ==========================================

async function deleteEvent(eventId) {

    if (
        !confirm(
            "Are you sure you want to delete this event?"
        )
    ) {
        return;
    }


    const token =
        localStorage.getItem("token");


    try {

        const response =
            await fetch(
                `${EVENTS_API}/events/${eventId}`,
                {
                    method: "DELETE",

                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.message);

            return;
        }


        alert(data.message);

        loadAdminEvents();


    } catch (error) {

        console.error(error);

        alert("Server connection error.");

    }
}


// ==========================================
// CLEAR EVENT FORM
// ==========================================

function clearEventForm() {

    if (!eventForm) return;

    eventForm.reset();

    document.getElementById(
        "eventId"
    ).value = "";
}


// ==========================================
// ADMIN MESSAGE
// ==========================================

function showAdminMessage(
    message,
    type
) {

    const element =
        document.getElementById(
            "adminMessage"
        );

    if (!element) return;


    element.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
}


// ==========================================
// PAGE LOAD
// ==========================================

loadEvents();

loadEventDetails();

loadAdminEvents();