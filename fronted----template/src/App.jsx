import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Students from "./pages/student";
import Quizzes from "./pages/Quizzes";
import Questions from "./pages/Questions";
import Results from "./pages/Result";
import Quiz from "./pages/Quiz";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Student */}
        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
        <Route
  path="/admin/students"
  element={<Students />}
/>

        <Route
          path="/admin/quizzes"
          element={<Quizzes />}
        />

        <Route
          path="/admin/questions"
          element={<Questions />}
        />

        <Route
          path="/admin/results"
          element={<Results />}
        />
        <Route
          path="/student/quiz"
          element={<Quiz />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;