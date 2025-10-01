document.querySelector("#login-form").addEventListener("submit", async (e) => {
  const loginRequest = {
    username: document.querySelector("#username").value,
    password: document.querySelector("#password").value
  };

  const response = await fetch("/api/auth/login", { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginRequest)
  });

  if (!response.ok) {
    alert("Login failed. Please check your credentials.");
    return;
  }

  const data = await response.json();
  if (data.message === "Login successful") {
    window.location.href = "../pages/home.html";
  }
  else {
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.style.display = "block";
    errorMessageDiv.textContent = data.message || "Login failed. Please try again.";
  }
});