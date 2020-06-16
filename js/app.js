//Modal Working mechanism
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];

if (btn) {
  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });
}
if (span) {
  span.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Change Theme
theme = document.getElementById("theme");
// content = document.querySelector("body");

document.addEventListener("DOMContentLoaded", () => {
  const mode = JSON.parse(localStorage.getItem("theme"));
  //document.getElementById("theme").checked = false;
  // console.log(typeof mode);
  // console.log(mode === true);

  if (mode === true) {
    document.getElementById("theme").checked = true;
    document.querySelector("body").className = "";
  } else {
    document.getElementById("theme").checked = false;

    document.querySelector("body").className = "light";
  }
});

//changes theme according to toggle switch
theme.addEventListener("click", function (event) {
  localStorage.setItem("theme", JSON.stringify(theme.checked));
  if (theme.checked === true) {
    document.querySelector("body").className = "";
  } else {
    document.querySelector("body").className = "light";
  }
});
