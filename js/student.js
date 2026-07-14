// Array to store all students
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

// Get the form
const studentForm = document.getElementById("studentForm");

// Run this when the Save Student button is clicked
studentForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Read all input values
    const student = {

        roll: document.getElementById("roll").value,
        name: document.getElementById("name").value,
        department: document.getElementById("department").value,
        semester: document.getElementById("semester").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value

    };
    // Check for duplicate roll number
    const duplicate = students.find((s, index) => {

        return s.roll === student.roll && index !== editIndex;

    });

    if (duplicate) {

        alert("Roll Number already exists!");

        return;

    }

    // Validate phone number
    if (!/^[0-9]{10}$/.test(student.phone)) {

        alert("Phone number must contain exactly 10 digits.");

        return;

    }
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(student.email)) {

        alert("Please enter a valid email address.");

        return;

    }
    // Check if we are editing or adding
    if (editIndex === -1) {

        // Add new student
        students.push(student);

    } else {

        // Store old roll before updating
        const oldRoll = students[editIndex].roll;

        // Update student
        students[editIndex] = student;

        // Update student details in saved results
        let results = JSON.parse(localStorage.getItem("results")) || [];

        results.forEach(result => {

            if (result.roll === oldRoll) {

                result.roll = student.roll;
                result.name = student.name;
                result.department = student.department;
                result.semester = student.semester;

            }

        });

        localStorage.setItem("results", JSON.stringify(results));

        // Reset edit mode
        editIndex = -1;

        // Change button text back
        document.getElementById("saveBtn").innerHTML = "Save Student";

    }

    // Save changes
    saveStudents();

    // Refresh the table
    displayStudents();

    // Clear the form
    studentForm.reset();

});   // <-- The event listener ends here

// =========================================
// Paste Step 8 BELOW this line
// =========================================

function displayStudents() {

    const tableBody = document.querySelector("#studentTable tbody");

    tableBody.innerHTML = "";

    students.forEach(function (student, index) {

        let row = tableBody.insertRow();

        row.insertCell(0).innerHTML = student.roll;
        row.insertCell(1).innerHTML = student.name;
        row.insertCell(2).innerHTML = student.department;
        row.insertCell(3).innerHTML = student.semester;
        row.insertCell(4).innerHTML = student.email;
        row.insertCell(5).innerHTML = student.phone;

        // Action column
        let actionCell = row.insertCell(6);

        actionCell.innerHTML = `
    <button class="edit-btn" onclick="editStudent(${index})">
        Edit
    </button>

    <button class="delete-btn" onclick="deleteStudent(${index})">
        Delete
    </button>
`;

    });

}
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function deleteStudent(index) {

    let confirmDelete = confirm("Do you want to delete this student?");

    if (confirmDelete) {

        // Store the student before deleting
        const deletedStudent = students[index];

        // Delete student
        students.splice(index, 1);

        saveStudents();

        // Delete corresponding result
        let results = JSON.parse(localStorage.getItem("results")) || [];

        results = results.filter(result => result.roll !== deletedStudent.roll);

        localStorage.setItem("results", JSON.stringify(results));

        displayStudents();

        alert("Student and corresponding result deleted successfully.");

    }

}
function editStudent(index) {

    let student = students[index];

    document.getElementById("roll").value = student.roll;
    document.getElementById("name").value = student.name;
    document.getElementById("department").value = student.department;
    document.getElementById("semester").value = student.semester;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;

    editIndex = index;

    document.getElementById("saveBtn").innerHTML = "Update Student";

}
function searchStudent() {

    let input = document.getElementById("searchInput").value.toLowerCase();

    let rows = document.querySelectorAll("#studentTable tbody tr");

    rows.forEach(function (row) {

        let roll = row.cells[0].textContent.toLowerCase();
        let name = row.cells[1].textContent.toLowerCase();

        if (roll.includes(input) || name.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}
displayStudents();