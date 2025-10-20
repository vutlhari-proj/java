import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "@/components";
import eyeIcon from "/images/icons/eye-icon.svg";
import "./loginPage.css";
import { Form, Alert, Spinner } from "react-bootstrap";
import { useAuth } from "@/context";
import { userStorage } from "@/config";

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)?.value?.trim();
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;

    // Input validation
    if (!username || !password) {
      setError("Username and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/login", { username, password });
      console.log("Login successful:", response.data);
      
      // Validate response structure
      if (!response.data?.userExpanded) {
        throw new Error("Invalid response from server");
      }
      
      // Store user in context and session storage
      const userData = response.data.userExpanded;
      setUser(userData);
      
      // Also store using userStorage for additional functionality
      userStorage.setUser({
        username: userData.username,
        name: userData.name,
        surname: userData.surname,
        role: userData.role
      });
      
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      
      // Enhanced error handling
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("Invalid username or password");
        } else if (error.response?.status === 403) {
          setError("Access forbidden - please contact administrator");
        } else if (error.response?.status && error.response.status >= 500) {
          setError("Server error - please try again later");
        } else if (error.code === 'NETWORK_ERROR' || !error.response) {
          setError("Network error - please check your connection");
        } else {
          setError("Login failed - please try again");
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login_page d-flex justify-content-center align-items-center vh-100">
      <Form
        className="form py-5 px-5 rounded-4 d-flex flex-column gap-3 justify-content-center"
        onSubmit={handleSubmit}
        style={{ minWidth: '320px' }}
      >
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}
        
        <TextInput label={true} name="username" type="text" required={true} />
        <TextInput
          label={true}
          name="password"
          type="password"
          image={{ src: eyeIcon, alt: "eye icon" }}
          required={true}
        />
        
        <button 
          className="btn btn-primary py-2 px-3 d-flex align-items-center justify-content-center" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </Form>
    </div>
  );
}

export default LoginForm;
