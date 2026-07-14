// Load students from localStorage
const students = JSON.parse(localStorage.getItem("students")) || [];

// Dropdown
const studentSelect = document.getElementById("studentSelect");

// Load students into dropdown
function loadStudents() {

    students.forEach((student, index) => {

        const option = document.createElement("option");

        option.value = index;
        option.textContent = `${student.roll} - ${student.name}`;

        studentSelect.appendChild(option);

    });

}

// Show selected student details
studentSelect.addEventListener("change", function () {

    if (this.value === "") {

        document.getElementById("roll").textContent = "-";
        document.getElementById("department").textContent = "-";
        document.getElementById("semester").textContent = "-";

        return;
    }

    const student = students[this.value];

    document.getElementById("roll").textContent = student.roll;
    document.getElementById("department").textContent = student.department;
    document.getElementById("semester").textContent = student.semester;

});

function searchStudent() {

    const roll = document.getElementById("rollSearch").value.trim();

    const student = students.find(s => s.roll === roll);

    if (!student) {
        alert("Student not found!");

        document.getElementById("roll").textContent = "-";
        document.getElementById("department").textContent = "-";
        document.getElementById("semester").textContent = "-";

        return;
    }

    document.getElementById("roll").textContent = student.roll;
    document.getElementById("department").textContent = student.department;
    document.getElementById("semester").textContent = student.semester;

    // Store the selected student index
    studentSelect.value = students.indexOf(student);
}
// Calculate Result
function calculateResult() {

    if (studentSelect.value === "") {

        alert("Please select a student.");

        return;

    }

    const student = students[studentSelect.value];

    const s1 = Number(document.getElementById("sub1").value);
    const s2 = Number(document.getElementById("sub2").value);
    const s3 = Number(document.getElementById("sub3").value);
    const s4 = Number(document.getElementById("sub4").value);
    const s5 = Number(document.getElementById("sub5").value);

    const marks = [s1, s2, s3, s4, s5];

    for (let mark of marks) {

        if (mark < 0 || mark > 100 || isNaN(mark)) {

            alert("Enter valid marks (0-100)");

            return;

        }

    }

    const total = s1 + s2 + s3 + s4 + s5;

    const percentage = (total / 500) * 100;

    let grade = "";
    let status = "Pass";

    if (marks.some(mark => mark < 40)) {

        status = "Fail";
        grade = "F";

    } else if (percentage >= 90) {

        grade = "A+";

    } else if (percentage >= 80) {

        grade = "A";

    } else if (percentage >= 70) {

        grade = "B";

    } else if (percentage >= 60) {

        grade = "C";

    } else if (percentage >= 50) {

        grade = "D";

    } else {

        grade = "F";

    }

    // Show Result
    document.getElementById("resultName").textContent = student.name;
    document.getElementById("resultRoll").textContent = student.roll;
    document.getElementById("resultDepartment").textContent = student.department;

    document.getElementById("resultSemester").textContent = student.semester;

    document.getElementById("mathMarks").textContent = s1;

    document.getElementById("scienceMarks").textContent = s2;

    document.getElementById("englishMarks").textContent = s3;

    document.getElementById("computerMarks").textContent = s4;

    document.getElementById("socialMarks").textContent = s5;
    document.getElementById("total").textContent = total;
    document.getElementById("percentage").textContent = percentage.toFixed(2);
    document.getElementById("grade").textContent = grade;
    document.getElementById("status").textContent = status;

    document.getElementById("status").style.color =
        status === "Pass" ? "green" : "red";

    // Save Result
    const results = JSON.parse(localStorage.getItem("results")) || [];

    // Check whether the student's result already exists
    const existingIndex = results.findIndex(result => result.roll === student.roll);

    const resultData = {

        roll: student.roll,
        name: student.name,
        department: student.department,
        semester: student.semester,

        marks: {

            mathematics: s1,
            science: s2,
            english: s3,
            computer: s4,
            socialScience: s5

        },

        total: total,
        percentage: percentage.toFixed(2),
        grade: grade,
        status: status

    };

    // Update existing result or add a new one
    if (existingIndex !== -1) {

        results[existingIndex] = resultData;

    } else {

        results.push(resultData);

    }

    localStorage.setItem("results", JSON.stringify(results));

    alert("Result saved successfully!");

}

// Print
function printResult() {

    window.print();

}

loadStudents();
async function downloadPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Student Result Management System", 20, 20);

    doc.setFontSize(12);

    doc.text("Name: " + document.getElementById("resultName").textContent, 20, 40);
    doc.text("Roll No: " + document.getElementById("resultRoll").textContent, 20, 50);
    doc.text("Department: " + document.getElementById("resultDepartment").textContent, 20, 60);
    doc.text("Semester: " + document.getElementById("resultSemester").textContent, 20, 70);

    doc.text("Mathematics: " + document.getElementById("mathMarks").textContent, 20, 90);
    doc.text("Science: " + document.getElementById("scienceMarks").textContent, 20, 100);
    doc.text("English: " + document.getElementById("englishMarks").textContent, 20, 110);
    doc.text("Computer: " + document.getElementById("computerMarks").textContent, 20, 120);
    doc.text("Social Science: " + document.getElementById("socialMarks").textContent, 20, 130);

    doc.text("Total: " + document.getElementById("total").textContent + " / 500", 20, 150);
    doc.text("Percentage: " + document.getElementById("percentage").textContent + "%", 20, 160);
    doc.text("Grade: " + document.getElementById("grade").textContent, 20, 170);
    doc.text("Status: " + document.getElementById("status").textContent, 20, 180);

    doc.save(document.getElementById("resultRoll").textContent + "_Result.pdf");

}
document.getElementById("currentDate").textContent =
    new Date().toLocaleDateString();