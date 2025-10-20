import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/HomePage";
import { AuthProvider, ThemeProvider } from "./context";
import LoginForm from "./pages/login/LoginPage";
import { CoursesPage } from "./pages/courses/CoursesPage";
import { ModulesPage } from "./pages/modules/ModulesPage";
import { ModulePage } from "./pages/modules/ModulePage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route index element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/modules/module" element={<ModulePage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
