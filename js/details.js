//get id from local storage
const id = JSON.parse(localStorage.getItem("details-id"));
// console.log(id);

const stdDetail = document.querySelector("#detail-of-student");

const ul = document.createElement("ul");

const stdInfos = JSON.parse(localStorage.getItem("students"));
// console.log(stdInfos);
let i = "",
  name = "",
  course = "";
stdInfos.forEach((std) => {
  if (std.id === id) {
    i = std.id;
    name = std.name;
    course = std.course;
  }
});

ul.innerHTML = `
<li>ID number: ${i}</li>
<li>Name:  ${name}</li>
<li>Course: ${course}</li>
<li>
  <br /><br />
  <a href="#" class="btn" id="add-payment">Add a Payment</a>

</li>

`;

stdDetail.appendChild(ul);
const addPay = document.querySelector("#add-payment");

// console.log(addPay);
if (addPay) {
  addPay.onclick = () => {
    modal.style.display = "block";
  };
}

class Payment {
  constructor(title, amount) {
    this.id = JSON.parse(localStorage.getItem("details-id"));
    this.title = title;
    this.amount = amount;
    var today = new Date();
    this.date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
  }
}

class PaymentUI {
  addToPaymentList(payment) {
    const row = document.createElement("tr");
    const tbody = document.querySelector("#payment-list");
    row.innerHTML = `
          <td>${payment.id}</td>
          <td>${payment.amount}</td>
          <td>${payment.title}</td>
          <td>${payment.date}</td>
        
          `;
    tbody.appendChild(row);
  }
}

class StorePayment {
  static getPayments() {
    let payments;
    if (localStorage.getItem("payments") === null) {
      payments = [];
    } else {
      payments = JSON.parse(localStorage.getItem("payments"));
      //let studentPayment = [];
      console.log(payments);

      // payments.forEach((p) => {
      //   console.log(p);
      // });
      // // payments.forEach((payment) => {
      //   console.log(payment.id);
      //   if (payment.id === id) {
      //     studentPayment += payment;
      //   }
      //   return studentPayment;
      // });
    }
    return payments;
  }

  static displayPayments(id) {
    const payments = StorePayment.getPayments();

    payments.forEach((payment) => {
      if (payment.id == id) {
        const ui = new PaymentUI();
        ui.addToPaymentList(payment);
      }
    });
  }

  static addPayment(payment) {
    const payments = StorePayment.getPayments();
    payments.push(payment);
    localStorage.setItem("payments", JSON.stringify(payments));
  }
}

document.addEventListener(
  "DOMContentLoaded",
  StorePayment.displayPayments(JSON.parse(localStorage.getItem("details-id")))
);

const makePay = document.querySelector("#payment-submit");

makePay.onclick = (e) => {
  const title = document.querySelector("#payment").value;
  const amount = document.querySelector("#amount").value;
  if ((title === "") | (amount === "")) {
    alert("Fill the form properly!!");
  } else {
    const payment = new Payment(title, amount);
    const ui = new PaymentUI();
    console.log(payment);
    ui.addToPaymentList(payment);
    StorePayment.addPayment(payment);
    modal.style.display = "none";
  }

  e.preventDefault();
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
