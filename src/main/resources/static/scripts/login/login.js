import { auth } from "../Auth/auth.js";
document.querySelector(".login-btn").addEventListener("click", async (e) => {
  alert("Login button clicked"); // <-- This will show the alert
  e.preventDefault();
  const loginRequest = {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value
  };

  try {
    await auth.login(loginRequest);
  } catch (error) {
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.style.display = "block";
    errorMessageDiv.textContent = error.message || "Login failed. Please try again.";
  }
});