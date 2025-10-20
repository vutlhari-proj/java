import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextInput } from "@/components";
import eyeIcon from "/images/icons/eye-icon.svg";
import "./loginPage.css";
import { Form } from "react-bootstrap";
import { useAuth } from "@/context";
import { userStorage } from "@/config";

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    axios
      .post("/api/auth/login", { username, password })
      .then((response) => {
        console.log("Login successful:", response.data);
        
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
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error("Invalid credentials:", error.response.data.error);
        } else {
          console.error("Login failed:", error);
        }
      });
  };

  return (
    <div className="login_page d-flex justify-content-center align-items-center vh-100">
      <Form
        className="form py-5 px-5 rounded-4 d-flex flex-column gap-3 justify-content-center"
        onSubmit={handleSubmit}
      >
        <TextInput label={true} name="username" type="text" required={true} />
        <TextInput
          label={true}
          name="password"
          type="password"
          image={{ src: eyeIcon, alt: "eye icon" }}
          required={true}
        />
        <button className="btn btn-primary py-2 px-3" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
}

export default LoginForm;
