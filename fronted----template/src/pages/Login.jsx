import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    // =========================
    // ADMIN LOGIN
    // =========================
    if (role === "Admin") {
      const adminEmail = "admin@quiz.com";
      const adminPassword = "admin123";

      if (email !== adminEmail || password !== adminPassword) {
        alert("Invalid admin email or password.");
        return;
      }

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          name: "Administrator",
          email: adminEmail,
          role: "Admin",
        })
      );

      localStorage.setItem("userRole", "Admin");

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      alert("Welcome, Administrator!");

      navigate("/admin/dashboard");
      return;
    }

    // =========================
    // STUDENT LOGIN
    // =========================
    const savedUser = localStorage.getItem("registeredUser");

    if (!savedUser) {
      alert("No student account found. Please create an account first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (email !== user.email || password !== user.password) {
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        name: user.name,
        email: user.email,
        role: "Student",
      })
    );

    localStorage.setItem("userRole", "Student");

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    }

    alert(`Welcome back, ${user.name}!`);

    navigate("/student/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo & Heading */}
        <div className="text-center mb-8">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600">
            <span className="text-2xl font-bold text-white">
              Q
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Quiz Management
          </h1>

          <p className="mt-2 text-slate-400">
            Online Assessment Platform
          </p>

        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

          <h2 className="text-2xl font-semibold text-white">
            Welcome back
          </h2>

          <p className="mt-1 mb-6 text-sm text-slate-400">
            Sign in to continue to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Login As
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
              >
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  role === "Admin"
                    ? "admin@quiz.com"
                    : "you@example.com"
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  role === "Admin"
                    ? "admin123"
                    : "Enter your password"
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
              />
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="h-4 w-4"
                />

                Remember me
              </label>

              <button
                type="button"
                onClick={() =>
                  alert("Password reset feature coming soon.")
                }
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </button>

            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500"
            >
              Sign In
            </button>

          </form>

          {/* Register - Student only */}
          {role === "Student" && (
            <p className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Create account
              </Link>
            </p>
          )}

          {/* Admin Demo Credentials */}
          {role === "Admin" && (
            <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800 p-4 text-center">

              <p className="text-xs text-slate-400 mb-2">
                Demo Admin Credentials
              </p>

              <p className="text-sm text-slate-300">
                Email:{" "}
                <span className="text-indigo-400">
                  admin@quiz.com
                </span>
              </p>

              <p className="text-sm text-slate-300">
                Password:{" "}
                <span className="text-indigo-400">
                  admin123
                </span>
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Login;