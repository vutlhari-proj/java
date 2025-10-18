import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/HomePage";
import LoginForm from "./pages/login/LoginPage";

function App() {
  return (
    <Routes>
      <Route index element={<LoginForm />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
