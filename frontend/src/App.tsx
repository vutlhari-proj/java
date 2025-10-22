import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/HomePage";
import { AuthProvider, ThemeProvider } from "./context";
import LoginForm from "./pages/login/LoginPage";
import { CoursesPage } from "./pages/courses/CoursesPage";
import { ModulesPage } from "./pages/modules/ModulesPage";
import { ModulePage } from "./pages/modules/ModulePage";
import { PrivateRoute } from "./services";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/courses" element={<PrivateRoute><CoursesPage /></PrivateRoute>} />
          <Route path="/modules" element={<PrivateRoute><ModulesPage /></PrivateRoute>} />
          <Route path="/modules/module" element={<PrivateRoute><ModulePage /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
