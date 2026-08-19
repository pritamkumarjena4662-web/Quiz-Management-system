import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Dashboard");

  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      icon: "👨‍🎓",
      change: "+12%",
    },
    {
      title: "Total Quizzes",
      value: "48",
      icon: "📄",
      change: "+12%",
    },
    {
      title: "Total Questions",
      value: "856",
      icon: "❓",
      change: "+12%",
    },
    {
      title: "Total Attempts",
      value: "3,642",
      icon: "📊",
      change: "+12%",
    },
  ];

  const quizzes = [
    {
      name: "JavaScript Basics",
      questions: 20,
      attempts: 342,
      status: "Active",
    },
    {
      name: "React Fundamentals",
      questions: 25,
      attempts: 286,
      status: "Active",
    },
    {
      name: "Database & SQL",
      questions: 30,
      attempts: 198,
      status: "Active",
    },
    {
      name: "Web Development",
      questions: 25,
      attempts: 164,
      status: "Draft",
    },
  ];

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");

    navigate("/login");
  };

  // Navigation functions
  const goToQuizzes = () => {
    setActiveTab("Quizzes");
    navigate("/admin/quizzes");
  };

  const goToQuestions = () => {
    setActiveTab("Questions");
    navigate("/admin/questions");
  };

  const goToStudents = () => {
    setActiveTab("Students");
    navigate("/admin/students");
  };

  const goToResults = () => {
    setActiveTab("Results");
    navigate("/admin/results");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= NAVBAR ================= */}
      <nav className="border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div>
            <h1 className="text-xl font-bold">
              Quiz Management
            </h1>

            <p className="text-xs text-slate-400">
              Admin Panel
            </p>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            <span className="text-sm text-slate-400">
              Admin
            </span>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
      <main className="p-6">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-1 text-slate-400">
            Manage students, quizzes, questions and results.
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-700 bg-slate-800 p-5 transition hover:border-sky-500"
            >

              <div className="mb-4 flex items-center justify-between">

                <span className="text-3xl">
                  {stat.icon}
                </span>

                <span className="text-sm font-semibold text-green-400">
                  {stat.change}
                </span>

              </div>

              <p className="text-sm text-slate-400">
                {stat.title}
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                {stat.value}
              </h2>

            </div>
          ))}

        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="mb-8 rounded-xl border border-slate-700 bg-slate-800 p-6">

          <h2 className="text-2xl font-bold">
            Quick Actions
          </h2>

          <p className="mb-5 mt-1 text-sm text-slate-400">
            Quickly manage your quiz platform.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

            {/* Create Quiz */}
            <button
              onClick={goToQuizzes}
              className="rounded-lg bg-sky-500 px-5 py-4 font-semibold text-white transition hover:bg-sky-600"
            >
              + Create Quiz
            </button>

            {/* Add Question */}
            <button
              onClick={goToQuestions}
              className="rounded-lg bg-cyan-500 px-5 py-4 font-semibold text-white transition hover:bg-cyan-600"
            >
              + Add Question
            </button>

            {/* View Students */}
            <button
              onClick={goToStudents}
              className="rounded-lg bg-indigo-500 px-5 py-4 font-semibold text-white transition hover:bg-indigo-600"
            >
              View Students
            </button>

            {/* View Results */}
            <button
              onClick={goToResults}
              className="rounded-lg bg-blue-500 px-5 py-4 font-semibold text-white transition hover:bg-blue-600"
            >
              View Results
            </button>

          </div>
        </div>

        {/* ================= RECENT QUIZZES ================= */}
        <div className="rounded-xl border border-slate-700 bg-slate-800">

          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-slate-700 p-6 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                Recent Quizzes
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Recently created quizzes
              </p>
            </div>

            <button
              onClick={goToQuizzes}
              className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-500 hover:text-sky-400"
            >
              View All
            </button>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-900">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Quiz
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Questions
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Attempts
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {quizzes.map((quiz, index) => (

                  <tr
                    key={index}
                    className="border-t border-slate-700 transition hover:bg-slate-750"
                  >

                    <td className="px-6 py-5 font-semibold">
                      {quiz.name}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {quiz.questions}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {quiz.attempts}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          quiz.status === "Active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {quiz.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* ================= MANAGEMENT CARDS ================= */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* Students */}
          <button
            onClick={goToStudents}
            className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-left transition hover:border-indigo-500 hover:bg-slate-750"
          >
            <div className="mb-3 text-3xl">
              👨‍🎓
            </div>

            <h3 className="text-lg font-bold">
              Student Management
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              View and manage registered students.
            </p>
          </button>

          {/* Questions */}
          <button
            onClick={goToQuestions}
            className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-left transition hover:border-cyan-500 hover:bg-slate-750"
          >
            <div className="mb-3 text-3xl">
              ❓
            </div>

            <h3 className="text-lg font-bold">
              Question Management
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Add, edit and manage quiz questions.
            </p>
          </button>

          {/* Results */}
          <button
            onClick={goToResults}
            className="rounded-xl border border-slate-700 bg-slate-800 p-6 text-left transition hover:border-blue-500 hover:bg-slate-750"
          >
            <div className="mb-3 text-3xl">
              📊
            </div>

            <h3 className="text-lg font-bold">
              Results & Reports
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Check quiz attempts and student results.
            </p>
          </button>

        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;