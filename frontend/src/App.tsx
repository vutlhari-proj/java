import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/HomePage";
import { AuthProvider, ThemeProvider } from "./context";
import LoginForm from "./pages/login/LoginPage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
