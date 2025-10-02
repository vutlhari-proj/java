export const auth ={
  async login(loginRequest){
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginRequest)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  },

  async register_step1(registerRequest){
    try {
      const response = await fetch("/api/auth/register-step1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerRequest)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const message = await response.text();
      console.log("Step 1 registration successful:", message);
    } catch (error) {
      console.error("Step 1 registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  },

  async register_step2(passwordRequest){
    try {
      const response = await fetch("/api/auth/register-step2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(passwordRequest)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const message = await response.text();
      console.log(message)
    } catch (error) {
      console.error("Step 2 registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  }
}