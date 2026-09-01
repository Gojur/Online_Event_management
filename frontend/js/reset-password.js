const form =
    document.getElementById("resetPasswordForm");

const message =
    document.getElementById("message");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const token =
        document.getElementById("token").value;

    const password =
        document.getElementById("password").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/reset-password",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    token,
                    password
                })
            }
        );

        const data =
            await response.json();

        message.textContent =
            data.message;

        if (response.ok) {

            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 2000);

        }

    } catch (error) {

        console.error(error);

        message.textContent =
            "Something went wrong";

    }

});