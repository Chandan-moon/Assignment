const form = document.querySelector("#formParent");
const studentList = document.querySelector(".TableBody");

let editIndex = null;

let stud = JSON.parse(localStorage.getItem('stud')) || [];

renderTable();

form.addEventListener('submit', addStudent);

function addStudent(e) {

    e.preventDefault();

    const name = document.getElementById('studentName').value;
    const id = document.getElementById('studentID').value;
    const email = document.getElementById('email-Id').value;
    const contact = document.getElementById('contactNumber').value;

    /* Validation */

    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("Name must contain only letters.");
        return;
    }

    if (isNaN(id) || isNaN(contact)) {
        alert("Student ID and Contact must be numbers.");
        return;
    }

    if (contact.length < 10) {
        alert("Contact must be at least 10 digits.");
        return;
    }

    /* Duplicate ID Check  */

    const duplicate = stud.find(
        (student, index) => student.id === id && index !== editIndex
    );

    if (duplicate) {
        alert("Student ID already exists! Please use a different ID.");
        
        return;
    }

    const studentData = { name, id, email, contact };

    if (editIndex === null) {

        stud.push(studentData);

    } else {

        stud[editIndex] = studentData;
        editIndex = null;
        document.getElementById('submit-btn').innerText = "Add Student";

    }

    localStorage.setItem('stud', JSON.stringify(stud));

    form.reset();

    renderTable();
}

function renderTable() {

    studentList.innerHTML = '';

    stud.forEach((student, index) => {

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" onclick="editRecord(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteRecord(${index})">Delete</button>
            </td>
        `;

        studentList.appendChild(row);
    });
}

function editRecord(index) {

    const s = stud[index];

    document.getElementById('studentName').value = s.name;
    document.getElementById('studentID').value = s.id;
    document.getElementById('email-Id').value = s.email;
    document.getElementById('contactNumber').value = s.contact;

    editIndex = index;

    document.getElementById('submit-btn').innerText = "Update Student";
}

function deleteRecord(index) {

    if (confirm("Are you sure you want to delete this student?")) {

        stud.splice(index, 1);

        localStorage.setItem('stud', JSON.stringify(stud));

        renderTable();
    }
}