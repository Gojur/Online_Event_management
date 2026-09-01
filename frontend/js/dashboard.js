const DASHBOARD_API =
    "http://localhost:5000/api";


// ==========================================
// USER DASHBOARD
// ==========================================

async function loadMyRegistrations() {

    const table =
        document.getElementById(
            "registrationTable"
        );

    if (!table) return;


    const token =
        localStorage.getItem("token");


    if (!token) {

        window.location.href =
            "login.html";

        return;
    }


    const user =
        JSON.parse(
            localStorage.getItem("user") || "{}"
        );


    const userName =
        document.getElementById("userName");


    if (userName && user.name) {

        userName.textContent =
            user.name;

    }


    try {

        const response =
            await fetch(
                `${DASHBOARD_API}/registrations/my`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load registrations"
            );

        }


        if (
            !data.registrations ||
            data.registrations.length === 0
        ) {

            table.innerHTML = `
                <tr>

                    <td
                        colspan="5"
                        class="text-center">

                        You have not registered
                        for any events yet.

                    </td>

                </tr>
            `;

            return;
        }


        table.innerHTML =
            data.registrations.map(
                registration => `

                <tr>

                    <td>
                        ${registration.title}
                    </td>

                    <td>
                        ${registration.event_date}
                    </td>

                    <td>
                        ${registration.event_time}
                    </td>

                    <td>
                        ${registration.location}
                    </td>

                    <td>
                        ${new Date(
                            registration.registered_at
                        ).toLocaleString()}
                    </td>

                </tr>

            `
            ).join("");


    } catch (error) {

        console.error(error);

        table.innerHTML = `
            <tr>

                <td
                    colspan="5"
                    class="text-center text-danger">

                    ${error.message}

                </td>

            </tr>
        `;

    }
}


// ==========================================
// ADMIN - REGISTERED USERS
// ==========================================

async function loadRegisteredUsers() {

    const table =
        document.getElementById(
            "registeredUsersTable"
        );

    if (!table) return;


    const token =
        localStorage.getItem("token");


    if (!token) {

        window.location.href =
            "admin-login.html";

        return;
    }


    try {

        const response =
            await fetch(
                `${DASHBOARD_API}/registrations`,
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to load registered users"
            );

        }


        if (
            !data.registrations ||
            data.registrations.length === 0
        ) {

            table.innerHTML = `
                <tr>

                    <td
                        colspan="8"
                        class="text-center">

                        No registrations found.

                    </td>

                </tr>
            `;

            return;
        }


        table.innerHTML =
            data.registrations.map(
                registration => `

                <tr>

                    <td>
                        ${registration.registration_id}
                    </td>

                    <td>
                        ${registration.user_name}
                    </td>

                    <td>
                        ${registration.user_email}
                    </td>

                    <td>
                        ${registration.event_title}
                    </td>

                    <td>
                        ${registration.event_date}
                    </td>

                    <td>
                        ${registration.event_time}
                    </td>

                    <td>
                        ${registration.location}
                    </td>

                    <td>
                        ${new Date(
                            registration.registered_at
                        ).toLocaleString()}
                    </td>

                </tr>

            `
            ).join("");


    } catch (error) {

        console.error(error);

        table.innerHTML = `
            <tr>

                <td
                    colspan="8"
                    class="text-center text-danger">

                    ${error.message}

                </td>

            </tr>
        `;

    }
}


// ==========================================
// PAGE LOAD
// ==========================================

loadMyRegistrations();

loadRegisteredUsers();