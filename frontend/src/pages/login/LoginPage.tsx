import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from "@/components";
import eyeIcon from "/images/icons/eye-icon.svg";
import "./loginPage.css";
import { Form, Spinner } from "react-bootstrap";
import { userStorage } from "@/config";
import { AuthContext } from "@/context";

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
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
      const response = await axios.post("http://10.2.40.218:8081/api/auth/login", { username, password }, { withCredentials: true });
      console.log("Login successful:", response.data);

      /* Validate response structure
      if (!response.data?.userExpanded) {
        throw new Error("Invalid response from server");
      }*/

      // Store user in context and session storage
      const userData = response.data;
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
      setError("Login failed");
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

        <TextInput label={true} name="username" type="text" required={true} onchange={() => { setError(null) }} />
        <TextInput
          label={true}
          name="password"
          type="password"
          image={{ src: eyeIcon, alt: "eye icon" }}
          required={true}
          onchange={() => { setError(null)}}
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

        {error && (<span className="me-2 text-danger">{error}</span>)}
      </Form>
    </div>
  );
}

export default LoginForm;
