import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const startQuiz = (quizName) => {
    navigate("/student/quiz", {
      state: { quizName },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div className="flex items-center justify-between">

          <h1 className="text-xl font-bold">
            Quiz Management
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Student
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500"
            >
              Logout
            </button>
          </div>

        </div>
      </nav>

      {/* Main */}
      <main className="p-6">

        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Student Dashboard
          </h2>

          <p className="mt-2 text-slate-400">
            Welcome back! Ready to test your knowledge?
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-5 md:grid-cols-3">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Available Quizzes
            </p>
            <h3 className="mt-2 text-3xl font-bold">
              12
            </h3>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Quizzes Completed
            </p>
            <h3 className="mt-2 text-3xl font-bold">
              8
            </h3>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Average Score
            </p>
            <h3 className="mt-2 text-3xl font-bold">
              82%
            </h3>
          </div>

        </div>

        {/* Available Quizzes */}
        <section className="mt-8">

          <h3 className="mb-4 text-xl font-semibold">
            Available Quizzes
          </h3>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {/* JavaScript */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h4 className="text-lg font-semibold">
                JavaScript Basics
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                20 Questions • 15 Minutes
              </p>

              <button
                onClick={() => startQuiz("JavaScript Basics")}
                className="mt-5 w-full rounded-lg bg-indigo-600 py-2.5 font-medium hover:bg-indigo-500"
              >
                Start Quiz
              </button>
            </div>

            {/* React */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h4 className="text-lg font-semibold">
                React Fundamentals
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                25 Questions • 20 Minutes
              </p>

              <button
                onClick={() => startQuiz("React Fundamentals")}
                className="mt-5 w-full rounded-lg bg-indigo-600 py-2.5 font-medium hover:bg-indigo-500"
              >
                Start Quiz
              </button>
            </div>

            {/* Database */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h4 className="text-lg font-semibold">
                Database & SQL
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                30 Questions • 25 Minutes
              </p>

              <button
                onClick={() => startQuiz("Database & SQL")}
                className="mt-5 w-full rounded-lg bg-indigo-600 py-2.5 font-medium hover:bg-indigo-500"
              >
                Start Quiz
              </button>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default StudentDashboard;