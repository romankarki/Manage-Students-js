//Courses
class Course {
  constructor(name, price, duration, seats) {
    this.name = name;
    this.price = price;
    this.duration = duration;
    this.seats = seats;
  }
}
//UI elements for course
class CourseUI {
  addCourseToList(course) {
    const row = document.createElement("tr");
    const tbody = document.querySelector("#course-details");

    row.innerHTML = `
                      <td>${course.name}</td>
                      <td>${course.duration}</td>
                      <td>${course.price}</td>
                      <td>${course.seats}</td>
                      <td><a href="#" class="btn-remove">Remove</a></td>
                      `;
    tbody.appendChild(row);
  }
}

//commiting all data  in local storage
class Store {
  static getCourse() {
    let courses;
    if (localStorage.getItem("courses") === null) {
      courses = [];
    } else {
      courses = JSON.parse(localStorage.getItem("courses"));
    }
    return courses;
  }

  static displayCourse() {
    const courses = Store.getCourse();
    console.log("From LocalStorage", courses);
    courses.forEach((course) => {
      const ui = new CourseUI();
      ui.addCourseToList(course);
    });
  }

  static addCourse(course) {
    const courses = Store.getCourse();
    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));
  }

  static removeCourse(name) {
    const courses = Store.getCourse();
    courses.forEach((course, index) => {
      if (course.name === name) {
        courses.splice(index, 1);
      }
      localStorage.setItem("courses", JSON.stringify(courses));
    });
  }
}
//Dom Load even
document.addEventListener("DOMContentLoaded", Store.displayCourse());

//Course modal form submission

const courseBtn = document.querySelector("#course-submit");

courseBtn.onclick = (event) => {
  //take input from modal form
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const duration = document.querySelector("#duration").value;
  const seats = document.querySelector("#seats").value;
  if ((name === "") | (price === "") | (duration === "") | (seats === "")) {
    alert("Please Fill the form properly");
  } else {
    const course = new Course(name, price, duration, seats);

    const ui = new CourseUI();
    ui.addCourseToList(course);
    Store.addCourse(course);
    modal.style.display = "none";
  }

  event.preventDefault();
  //
};

window.onclick = (event) => {
  if (event.target.className === "btn-remove") {
    event.target.parentElement.parentElement.style.display = "none";
    Store.removeCourse(
      event.target.parentElement.parentElement.firstElementChild.innerHTML
    );
  }
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
