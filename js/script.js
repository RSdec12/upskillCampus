// Get the form
const studentForm = document.getElementById("studentForm");

// Run this function when the form is submitted
studentForm.addEventListener("submit", function (event) {

    // Stop the page from refreshing
    event.preventDefault();

    // Read values from the form
    let roll = document.getElementById("roll").value;
    let name = document.getElementById("name").value;
    let department = document.getElementById("department").value;
    let semester = document.getElementById("semester").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    // Check if any field is empty
    if (
        roll === "" ||
        name === "" ||
        department === "" ||
        semester === "" ||
        email === "" ||
        phone === "") {
        alert("Please fill all fields.");
        return;
    }

    // Find the table body
    let table = document.querySelector("#studentTable tbody");

    // Create a new row
    let newRow = table.insertRow();

    // Insert data into the row
    newRow.insertCell(0).innerHTML = roll;
    newRow.insertCell(1).innerHTML = name;
    newRow.insertCell(2).innerHTML = department;
    newRow.insertCell(3).innerHTML = semester;
    newRow.insertCell(4).innerHTML = email;
    newRow.insertCell(5).innerHTML = phone;
    // Create Delete button
    let deleteCell = newRow.insertCell(6);

    deleteCell.innerHTML = `
<button class="delete-btn">Delete</button>
`;

    deleteCell.querySelector("button").addEventListener("click", function () {

        if (confirm("Are you sure you want to delete this student?")) {

            newRow.remove();

        }

    });
    // Show success message
    alert("Student Added Successfully!");

    // Clear the form
    studentForm.reset();

});
