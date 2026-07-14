let results = JSON.parse(localStorage.getItem("results")) || [];

function displayResults() {

    const tbody = document.querySelector("#resultTable tbody");

    tbody.innerHTML = "";

    results.forEach((student, index) => {

        tbody.innerHTML += `
        <tr>

            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td>${student.total}</td>
            <td>${student.percentage}%</td>
            <td>${student.grade}</td>
            <td>${student.status}</td>

            <td>
                <button onclick="printResult(${index})">🖨 Print</button>
                <button onclick="deleteResult(${index})">🗑 Delete</button>
            </td>

        </tr>
        `;

    });

}

function deleteResult(index) {

    if (confirm("Delete this result?")) {

        results.splice(index, 1);

        localStorage.setItem("results", JSON.stringify(results));

        displayResults();

    }

}

function searchResults() {

    let input = document.getElementById("searchResult").value.toLowerCase();

    let rows = document.querySelectorAll("#resultTable tbody tr");

    rows.forEach(row => {

        let roll = row.cells[0].textContent.toLowerCase();

        let name = row.cells[1].textContent.toLowerCase();

        row.style.display = (roll.includes(input) || name.includes(input)) ? "" : "none";

    });

}

function printResult(index) {

    const result = results[index];

    const printWindow = window.open("", "", "width=800,height=700");

    printWindow.document.write(`
    <html>

    <head>

        <title>Student Result</title>

        <style>

            body{
                font-family:Arial;
                margin:30px;
            }

            table{
                width:100%;
                border-collapse:collapse;
                margin-top:20px;
            }

            table,th,td{
                border:1px solid black;
            }

            th,td{
                padding:10px;
                text-align:center;
            }

            h2{
                text-align:center;
            }

        </style>

    </head>

    <body>

        <h2>Student Result Management System</h2>

        <p><strong>Name:</strong> ${result.name}</p>
        <p><strong>Roll No:</strong> ${result.roll}</p>
        <p><strong>Department:</strong> ${result.department}</p>
        <p><strong>Semester:</strong> ${result.semester}</p>

        <table>

            <tr>
                <th>Subject</th>
                <th>Marks</th>
            </tr>

            <tr>
                <td>Mathematics</td>
                <td>${result.marks.mathematics}</td>
            </tr>

            <tr>
                <td>Science</td>
                <td>${result.marks.science}</td>
            </tr>

            <tr>
                <td>English</td>
                <td>${result.marks.english}</td>
            </tr>

            <tr>
                <td>Computer</td>
                <td>${result.marks.computer}</td>
            </tr>

            <tr>
                <td>Social Science</td>
                <td>${result.marks.socialScience}</td>
            </tr>

            <tr>
                <th>Total</th>
                <th>${result.total}</th>
            </tr>

            <tr>
                <th>Percentage</th>
                <th>${result.percentage}%</th>
            </tr>

            <tr>
                <th>Grade</th>
                <th>${result.grade}</th>
            </tr>

            <tr>
                <th>Status</th>
                <th>${result.status}</th>
            </tr>

        </table>

    </body>

    </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

displayResults();
