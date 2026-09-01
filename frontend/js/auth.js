const API_URL = "http://localhost:5000/api";


// ==========================================
// USER LOGIN
// ==========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const email =
                document.getElementById("loginEmail").value;

            const password =
                document.getElementById("loginPassword").value;


            try {

                const response = await fetch(
                    `${API_URL}/auth/login`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );


                const data = await response.json();


                if (!response.ok) {

                    showMessage(
                        "loginMessage",
                        data.message,
                        "danger"
                    );

                    return;
                }


                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                showMessage(
                    "loginMessage",
                    "Login successful!",
                    "success"
                );


                setTimeout(() => {

                    if (data.user &&
                        data.user.role === "admin") {

                        window.location.href =
                            "admin-dashboard.html";

                    } else {

                        window.location.href =
                            "events.html";

                    }

                }, 800);


            } catch (error) {

                console.error(error);

                showMessage(
                    "loginMessage",
                    "Unable to connect to server.",
                    "danger"
                );

            }

        }
    );
}


// ==========================================
// USER REGISTRATION
// ==========================================

const registerForm =
    document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value;

            const email =
                document.getElementById(
                    "registerEmail"
                ).value;

            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            try {

                const response = await fetch(
                    `${API_URL}/auth/register`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            name,
                            email,
                            password
                        })
                    }
                );


                const data =
                    await response.json();


                if (!response.ok) {

                    showMessage(
                        "registerMessage",
                        data.message,
                        "danger"
                    );

                    return;
                }


                showMessage(
                    "registerMessage",
                    data.message,
                    "success"
                );


                registerForm.reset();


            } catch (error) {

                console.error(error);

                showMessage(
                    "registerMessage",
                    "Unable to connect to server.",
                    "danger"
                );

            }

        }
    );
}


// ==========================================
// ADMIN LOGIN
// ==========================================

const adminLoginForm =
    document.getElementById("adminLoginForm");

if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const email =
                document.getElementById(
                    "adminEmail"
                ).value;

            const password =
                document.getElementById(
                    "adminPassword"
                ).value;


            try {

                const response = await fetch(
                    `${API_URL}/auth/login`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );


                const data =
                    await response.json();


                if (!response.ok) {

                    showMessage(
                        "adminLoginMessage",
                        data.message,
                        "danger"
                    );

                    return;
                }


                if (
                    !data.user ||
                    data.user.role !== "admin"
                ) {

                    showMessage(
                        "adminLoginMessage",
                        "Admin access required.",
                        "danger"
                    );

                    return;
                }


                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                showMessage(
                    "adminLoginMessage",
                    "Admin login successful!",
                    "success"
                );


                setTimeout(() => {

                    window.location.href =
                        "admin-dashboard.html";

                }, 800);


            } catch (error) {

                console.error(error);

                showMessage(
                    "adminLoginMessage",
                    "Unable to connect to server.",
                    "danger"
                );

            }

        }
    );
}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "index.html";
}


// ==========================================
// MESSAGE
// ==========================================

function showMessage(
    elementId,
    message,
    type
) {

    const element =
        document.getElementById(elementId);

    if (!element) return;


    element.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
}