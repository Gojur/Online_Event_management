// ==========================================
// MAIN FRONTEND SCRIPT
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateNavigation();

    }
);


// ==========================================
// UPDATE NAVIGATION
// ==========================================

function updateNavigation() {

    const token =
        localStorage.getItem("token");


    const user =
        JSON.parse(
            localStorage.getItem("user") || "null"
        );


    const loginNav =
        document.getElementById("loginNav");

    const registerNav =
        document.getElementById("registerNav");

    const dashboardNav =
        document.getElementById("dashboardNav");


    if (token && user) {

        if (loginNav) {

            loginNav.style.display =
                "none";

        }


        if (registerNav) {

            registerNav.style.display =
                "none";

        }


        if (dashboardNav) {

            dashboardNav.style.display =
                "block";

        }

    }

}