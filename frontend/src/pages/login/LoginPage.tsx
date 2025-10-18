import { useNavigate } from "react-router-dom";
import { TextInput } from "@/components";
import eyeIcon from "/images/icons/eye-icon.svg";

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    console.log("Username:", username);
    console.log("Password:", password);
    // After successful login logic, navigate to home
    navigate("/home");
  };

  return (
    <form
      className="form py-5 px-5 d-flex flex-column align-items-center rounded-4"
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
      <button className="btn btn-primary p-2" type="submit">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
