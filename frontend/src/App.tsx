import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/HomePage";
import { AuthProvider, ThemeProvider } from "./context";
import LoginForm from "./pages/login/LoginPage";
import { CoursesPage } from "./pages/courses/CoursesPage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
