// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

btn.addEventListener("click", () => {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", () => {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Course modal form submission

const courseBtn = document.querySelector("#course-submit");

if (courseBtn) {
  courseBtn.onclick = (event) => {
    //take input from modal form
    // console.log("HEllo");
    const name = document.querySelector("#name").value;
    const price = document.querySelector("#price").value;
    const duration = document.querySelector("#duration").value;
    const seats = document.querySelector("#seats").value;

    const row = document.createElement("tr");
    const tbody = document.querySelector("#course-details");

    row.innerHTML = `
                <td>${name}</td>
                <td>${duration}</td>
                <td>${price}</td>
                <td>${seats}</td>
              
                `;
    tbody.appendChild(row);
    modal.style.display = "none";
    event.preventDefault();
    //
  };
}

// // Student modal form submission
const studentBtn = document.querySelector("#student-submit");
if (studentBtn) {
  studentBtn.onclick = (e) => {
    const id = document.querySelector("#id").value;
    const name = document.querySelector("#sname").value;
    const course = document.querySelector("#course").value;

    const row = document.createElement("tr");
    const tbody = document.querySelector("#student-list");
    row.innerHTML = `
    <td>${id}</td>
    <td>${name}</td>
    <td>${course}</td>
    <td>
    <a href="details.html" class="btn">Details</a>
    <a href="#" class="btn-remove">Remove</a>
  </td>
    `;
    tbody.appendChild(row);
    modal.style.display = "none";
    e.preventDefault();
  };
}

//remove a item in a list ---both course and student list

window.onclick = (event) => {
  if (event.target.className === "btn-remove") {
    event.target.parentElement.parentElement.style.display = "none";
  }
};
