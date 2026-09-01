const form = document.getElementById("forgotPasswordForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/forgot-password",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email
                })
            }
        );

        const data = await response.json();

        console.log("Server Response:", data);

        if (response.ok) {

            message.innerHTML = `
                <strong>${data.message}</strong>
                <br><br>

                <strong>Reset Token:</strong>
                <br>

                <span class="reset-token">
                    ${data.resetToken}
                </span>

                <br><br>

                <a hgref="reset-password.html">
                    Go to Reset Password
                </a>
            `;

        } else {

            message.textContent = data.message;

        }

    } catch (error) {

        console.error(error);

        message.textContent =
            "Something went wrong. Please try again.";

    }

});