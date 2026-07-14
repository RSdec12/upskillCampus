const username = localStorage.getItem("loggedInUser") || "Administrator";

const displayName =
    username.charAt(0).toUpperCase() + username.slice(1);

document.getElementById("welcomeMessage").textContent =
    `Welcome, ${displayName} 👋`;
document.addEventListener("DOMContentLoaded", function () {

    // Login Protection
    if (localStorage.getItem("isLoggedIn") !== "true") {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

    // Load Students and Results
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const results = JSON.parse(localStorage.getItem("results")) || [];

    // Statistics
    const totalStudents = students.length;
    const totalResults = results.length;

    const passed = results.filter(result => result.status === "Pass").length;
    const failed = results.filter(result => result.status === "Fail").length;

    // Display Statistics
    document.getElementById("totalStudents").textContent = totalStudents;
    document.getElementById("totalResults").textContent = totalResults;
    document.getElementById("passStudents").textContent = passed;
    document.getElementById("failStudents").textContent = failed;

    // Logout
    const logoutBtn = document.querySelector(".logout");

    logoutBtn.addEventListener("click", function (event) {

        event.preventDefault();

        localStorage.removeItem("isLoggedIn");

        window.location.href = "index.html";

    });

});
function logout() {

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isLoggedIn");

    window.location.href = "index.html";

}