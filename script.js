// AUTHENTICATION HANDLING

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("signup-username").value;
      const password = document.getElementById("signup-password").value;

      localStorage.setItem("user", JSON.stringify({ username, password }));
      alert("Signup successful!");
      window.location.href = "index.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (
        savedUser &&
        username === savedUser.username &&
        password === savedUser.password
      ) {
        localStorage.setItem("loggedInUser", username);
        alert("Login successful!");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials.");
      }
    });
  }

  // Dashboard authentication check
  if (window.location.pathname.includes("dashboard.html")) {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
      alert("Please login first.");
      window.location.href = "index.html";
    }
  }
});

// LOGOUT
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

// EXPENSE TRACKER LOGIC (only runs on dashboard)
document.addEventListener("DOMContentLoaded", function () {
  if (!window.location.pathname.includes("dashboard.html")) return;

  let expenses = [];
  let totalAmount = 0;

  const categorySelect = document.getElementById("category-select");
  const amountInput = document.getElementById("amount-input");
  const dateInput = document.getElementById("date-input");
  const addBtn = document.getElementById("add-btn");
  const expensesTableBody = document.getElementById("expense-table-body");
  const totalAmountCell = document.getElementById("total-amount");

  addBtn.addEventListener("click", function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (!category || isNaN(amount) || amount <= 0 || !date) {
      alert("Please fill all fields with valid data.");
      return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();
    newRow.innerHTML = `
      <td>${category}</td>
      <td>${amount}</td>
      <td>${date}</td>
      <td><button class="delete-btn">Delete</button></td>
    `;

    const deleteBtn = newRow.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      expensesTableBody.removeChild(newRow);
      expenses.splice(expenses.indexOf(expense), 1);
      totalAmount -= amount;
      totalAmountCell.textContent = totalAmount;
    });

    // Clear form
    amountInput.value = "";
    dateInput.value = "";
  });
});