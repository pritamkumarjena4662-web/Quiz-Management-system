import React, { useState } from "react";

function Quizzes() {
  const [showAddQuiz, setShowAddQuiz] = useState(false);

const [newQuiz, setNewQuiz] = useState({
  title: "",
  category: "",
  questions: "",
  attempts: "",
  status: "Active",
});

const handleAddQuiz = (e) => {
  e.preventDefault();

  if (!newQuiz.title || !newQuiz.category || !newQuiz.questions) {
    alert("Please fill all required fields.");
    return;
  }

  const quizToAdd = {
    id: Date.now(),
    title: newQuiz.title,
    category: newQuiz.category,
    questions: Number(newQuiz.questions),
    attempts: Number(newQuiz.attempts) || 0,
    status: newQuiz.status,
  };

  setQuizzes((prev) => [...prev, quizToAdd]);

  setNewQuiz({
    title: "",
    category: "",
    questions: "",
    attempts: "",
    status: "Active",
  });

  setShowAddQuiz(false);
};
const editQuiz = (quiz) => {
  const title = window.prompt("Quiz Title:", quiz.title);
  if (title === null) return;

  const category = window.prompt("Category:", quiz.category);
  if (category === null) return;

  const questions = window.prompt(
    "Number of Questions:",
    quiz.questions
  );
  if (questions === null) return;

  const status = window.prompt(
    "Status (Active/Inactive):",
    quiz.status
  );
  if (status === null) return;

  setQuizzes((prev) =>
    prev.map((q) =>
      q.id === quiz.id
        ? {
            ...q,
            title: title.trim(),
            category: category.trim(),
            questions: Number(questions),
            status:
              status.trim().toLowerCase() === "inactive"
                ? "Inactive"
                : "Active",
          }
        : q
    )
  );
};
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "JavaScript Basics",
      category: "Programming",
      questions: 20,
      attempts: 156,
      status: "Active",
    },
    {
      id: 2,
      title: "React Fundamentals",
      category: "Programming",
      questions: 25,
      attempts: 132,
      status: "Active",
    },
    {
      id: 3,
      title: "Database & SQL",
      category: "Database",
      questions: 30,
      attempts: 98,
      status: "Active",
    },
    {
      id: 4,
      title: "Computer Networks",
      category: "Networking",
      questions: 20,
      attempts: 76,
      status: "Inactive",
    },
    {
      id: 5,
      title: "Operating Systems",
      category: "Operating System",
      questions: 25,
      attempts: 64,
      status: "Active",
    },
  ]);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(search.toLowerCase()) ||
      quiz.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || quiz.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const deleteQuiz = (id) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
  };

  const toggleStatus = (id) => {
    setQuizzes(
      quizzes.map((quiz) =>
        quiz.id === id
          ? {
              ...quiz,
              status: quiz.status === "Active" ? "Inactive" : "Active",
            }
          : quiz
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <p className="text-slate-400 mt-1">
            Create and manage your quizzes
          </p>
        </div>

        <button
  onClick={() => setShowAddQuiz(true)}
  className="bg-sky-500 hover:bg-sky-600 px-5 py-3 rounded-lg font-semibold transition"
>
  + Add Quiz
</button>
      </div>
{showAddQuiz && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 w-full max-w-md">
      
      <h2 className="text-2xl font-bold mb-5">
        Add New Quiz
      </h2>

      <form onSubmit={handleAddQuiz} className="space-y-4">

        <input
          type="text"
          placeholder="Quiz Title"
          value={newQuiz.title}
          onChange={(e) =>
            setNewQuiz({ ...newQuiz, title: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none"
        />

        <input
          type="text"
          placeholder="Category"
          value={newQuiz.category}
          onChange={(e) =>
            setNewQuiz({ ...newQuiz, category: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none"
        />

        <input
          type="number"
          placeholder="Number of Questions"
          value={newQuiz.questions}
          onChange={(e) =>
            setNewQuiz({ ...newQuiz, questions: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none"
        />

        <input
          type="number"
          placeholder="Attempts"
          value={newQuiz.attempts}
          onChange={(e) =>
            setNewQuiz({ ...newQuiz, attempts: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none"
        />

        <select
          value={newQuiz.status}
          onChange={(e) =>
            setNewQuiz({ ...newQuiz, status: e.target.value })
          }
          className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowAddQuiz(false)}
            className="flex-1 bg-slate-600 hover:bg-slate-500 px-4 py-3 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 bg-sky-500 hover:bg-sky-600 px-4 py-3 rounded-lg font-semibold"
          >
            Add Quiz
          </button>
        </div>

      </form>
    </div>
  </div>
)}
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Total Quizzes</p>
          <h2 className="text-3xl font-bold mt-2">
            {quizzes.length}
          </h2>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Active Quizzes</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {quizzes.filter((q) => q.status === "Active").length}
          </h2>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Total Questions</p>
          <h2 className="text-3xl font-bold text-sky-400 mt-2">
            {quizzes.reduce((total, q) => total + q.questions, 0)}
          </h2>
        </div>

      </div>

      {/* Search + Filter */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 mb-6">

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search quizzes by title or category..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none focus:border-sky-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 outline-none"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>
      </div>

      {/* Quiz Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-900">
              <tr>
                <th className="text-left px-6 py-4 text-slate-300">
                  Quiz
                </th>

                <th className="text-left px-6 py-4 text-slate-300">
                  Category
                </th>

                <th className="text-left px-6 py-4 text-slate-300">
                  Questions
                </th>

                <th className="text-left px-6 py-4 text-slate-300">
                  Attempts
                </th>

                <th className="text-left px-6 py-4 text-slate-300">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredQuizzes.map((quiz) => (
                <tr
                  key={quiz.id}
                  className="border-t border-slate-700 hover:bg-slate-750"
                >

                  <td className="px-6 py-5 font-semibold">
                    {quiz.title}
                  </td>

                  <td className="px-6 py-5 text-slate-400">
                    {quiz.category}
                  </td>

                  <td className="px-6 py-5">
                    {quiz.questions}
                  </td>

                  <td className="px-6 py-5">
                    {quiz.attempts}
                  </td>

                  <td className="px-6 py-5">

                    <button
                      onClick={() => toggleStatus(quiz.id)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        quiz.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {quiz.status}
                    </button>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex gap-2">

                      <button
                      onClick={() => editQuiz(quiz)}
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteQuiz(quiz.id)}
                        className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-sm"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            No quizzes found.
          </div>
        )}

      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">

        <p className="text-slate-400 text-sm">
          Showing {filteredQuizzes.length} quizzes
        </p>

        <div className="flex gap-2">

          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg"
          >
            Previous
          </button>

          <button
            className="px-4 py-2 bg-sky-500 rounded-lg"
          >
            {currentPage}
          </button>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default Quizzes;