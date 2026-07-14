document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        const adminUsername = "admin";
        const adminPassword = "admin123";

        if (username === adminUsername && password === adminPassword) {

            alert("Login Successful!");

            // Store login status
            localStorage.setItem("isLoggedIn", "true");

            // Store logged-in username
            localStorage.setItem("loggedInUser", username);

            // Go to dashboard
            window.location.href = "dashboard.html";

        } else {

            alert("Invalid Username or Password");

        }

    });

});