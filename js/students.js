//Students
class Student {
  constructor(id, name, course) {
    this.id = id;
    this.name = name;
    this.course = course;
  }
}

//UI components fro Student
class StudentUI {
  addStudentToList(student) {
    const row = document.createElement("tr");
    const tbody = document.querySelector("#student-list");
    row.innerHTML = `
          <td>${student.id}</td>
          <td>${student.name}</td>
          <td>${student.course}</td>
          <td>
          <a href="details.html" class="btn show-detail">Details</a>
          <a href="#" class="btn-remove">Remove</a>
        </td>
          `;
    tbody.appendChild(row);
  }
}

class Store {
  static getStudents() {
    let students;
    if (localStorage.getItem("students") === null) {
      students = [];
    } else {
      students = JSON.parse(localStorage.getItem("students"));
    }
    return students;
  }

  static displayStudents() {
    const students = Store.getStudents();
    students.forEach((student) => {
      const ui = new StudentUI();
      ui.addStudentToList(student);
    });
  }
  static addStudent(student) {
    const students = Store.getStudents();
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
  }

  static removeStudent(id) {
    const students = Store.getStudents();
    students.forEach((student, index) => {
      if (student.id === id) {
        students.splice(index, 1);
      }
      localStorage.setItem("students", JSON.stringify(students));
    });
  }
}

//Dom Load event
document.addEventListener("DOMContentLoaded", Store.displayStudents());

// // Student modal form submission
const studentBtn = document.querySelector("#student-submit");

studentBtn.onclick = (e) => {
  const id = document.querySelector("#id").value;
  const name = document.querySelector("#sname").value;
  const course = document.querySelector("#course").value;
  const student = new Student(id, name, course);
  const ui = new StudentUI();
  ui.addStudentToList(student);
  Store.addStudent(student);
  modal.style.display = "none";
  e.preventDefault();
};

window.onclick = (event) => {
  if (event.target.className === "btn-remove") {
    event.target.parentElement.parentElement.style.display = "none";
    Store.removeStudent(
      event.target.parentElement.parentElement.firstElementChild.innerHTML
    );
  } else if (event.target.className === "btn show-detail") {
    const id =
      event.target.parentElement.parentElement.firstElementChild.innerHTML;
    localStorage.setItem("details-id", JSON.stringify(id));
  }
};
