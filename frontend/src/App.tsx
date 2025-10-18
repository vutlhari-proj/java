import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/HomePage";
import { ThemeProvider } from "./context";
import LoginForm from "./pages/login/LoginPage";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route index element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
