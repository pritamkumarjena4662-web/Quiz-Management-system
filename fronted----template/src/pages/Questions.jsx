import { useState } from "react";

function Questions() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What does HTML stand for?",
      quiz: "Web Development",
      difficulty: "Easy",
      marks: 1,
      answer: "Hyper Text Markup Language",
    },
    {
      id: 2,
      question: "Which method converts JSON to a JavaScript object?",
      quiz: "JavaScript Basics",
      difficulty: "Medium",
      marks: 2,
      answer: "JSON.parse()",
    },
    {
      id: 3,
      question: "Which hook is used to manage state in React?",
      quiz: "React Fundamentals",
      difficulty: "Easy",
      marks: 2,
      answer: "useState",
    },
    {
      id: 4,
      question: "Which SQL command is used to retrieve data?",
      quiz: "Database & SQL",
      difficulty: "Easy",
      marks: 1,
      answer: "SELECT",
    },
    {
      id: 5,
      question: "What is the purpose of an operating system?",
      quiz: "Operating Systems",
      difficulty: "Medium",
      marks: 2,
      answer: "Manage computer resources",
    },
  ]);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [showAdd, setShowAdd] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    quiz: "",
    difficulty: "Easy",
    marks: 1,
    answer: "",
  });

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.quiz.toLowerCase().includes(search.toLowerCase());

    const matchesDifficulty =
      difficulty === "All" || q.difficulty === difficulty;

    return matchesSearch && matchesDifficulty;
  });

  const addQuestion = (e) => {
    e.preventDefault();

    if (
      !newQuestion.question ||
      !newQuestion.quiz ||
      !newQuestion.answer
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const question = {
      id: Date.now(),
      ...newQuestion,
      marks: Number(newQuestion.marks),
    };

    setQuestions((prev) => [...prev, question]);

    setNewQuestion({
      question: "",
      quiz: "",
      difficulty: "Easy",
      marks: 1,
      answer: "",
    });

    setShowAdd(false);
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };
const editQuestion = (question) => {
  const text = window.prompt("Question:", question.question);
  if (text === null) return;

  const answer = window.prompt("Answer:", question.answer);
  if (answer === null) return;

  const marks = window.prompt("Marks:", question.marks);
  if (marks === null) return;

  const difficulty = window.prompt(
    "Difficulty (Easy/Medium/Hard):",
    question.difficulty
  );
  if (difficulty === null) return;

  setQuestions((prev) =>
    prev.map((q) =>
      q.id === question.id
        ? {
            ...q,
            question: text.trim(),
            answer: answer.trim(),
            marks: Number(marks),
            difficulty:
              difficulty.trim().toLowerCase() === "hard"
                ? "Hard"
                : difficulty.trim().toLowerCase() === "medium"
                ? "Medium"
                : "Easy",
          }
        : q
    )
  );
};
 return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Questions
          </h1>

          <p className="mt-1 text-slate-400">
            Manage quiz questions and answers
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="rounded-lg bg-sky-500 px-5 py-3 font-semibold hover:bg-sky-600"
        >
          + Add Question
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-7 grid gap-5 md:grid-cols-3">

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">
            Total Questions
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {questions.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">
            Easy Questions
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {questions.filter((q) => q.difficulty === "Easy").length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">
            Medium Questions
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-400">
            {questions.filter((q) => q.difficulty === "Medium").length}
          </h2>
        </div>

      </div>

      {/* Search & Filter */}
      <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800 p-5">

        <div className="flex flex-col gap-4 md:flex-row">

          <input
            type="text"
            placeholder="Search questions or quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-sky-500"
          />

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 outline-none"
          >
            <option value="All">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

        </div>
      </div>

      {/* Questions Table */}
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-slate-900">
              <tr>
                <th className="px-5 py-4 text-slate-300">
                  Question
                </th>

                <th className="px-5 py-4 text-slate-300">
                  Quiz
                </th>

                <th className="px-5 py-4 text-slate-300">
                  Difficulty
                </th>

                <th className="px-5 py-4 text-slate-300">
                  Marks
                </th>

                <th className="px-5 py-4 text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredQuestions.map((q) => (
                <tr
                  key={q.id}
                  className="border-t border-slate-700 hover:bg-slate-700/40"
                >

                  <td className="max-w-md px-5 py-5">
                    <p className="font-medium">
                      {q.question}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Answer: {q.answer}
                    </p>
                  </td>

                  <td className="px-5 py-5 text-slate-300">
                    {q.quiz}
                  </td>

                  <td className="px-5 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        q.difficulty === "Easy"
                          ? "bg-green-500/20 text-green-400"
                          : q.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    {q.marks}
                  </td>

                  <td className="px-5 py-5">

                    <div className="flex gap-2">

                      <button
  onClick={() => editQuestion(q)}
  className="rounded-lg bg-blue-500 px-3 py-2 text-sm hover:bg-blue-600"
>
  Edit
</button>

                      <button
                        onClick={() => deleteQuestion(q.id)}
                        className="rounded-lg bg-red-500 px-3 py-2 text-sm hover:bg-red-600"
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

        {filteredQuestions.length === 0 && (
          <div className="py-10 text-center text-slate-400">
            No questions found.
          </div>
        )}

      </div>

      {/* Add Question Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

          <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Add Question
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Create a new quiz question
                </p>
              </div>

              <button
                onClick={() => setShowAdd(false)}
                className="text-2xl text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={addQuestion}
              className="space-y-4"
            >

              <textarea
                placeholder="Enter question text"
                value={newQuestion.question}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    question: e.target.value,
                  })
                }
                rows="3"
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 outline-none focus:border-sky-500"
              />

              <input
                type="text"
                placeholder="Quiz name"
                value={newQuestion.quiz}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    quiz: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 outline-none focus:border-sky-500"
              />

              <div className="grid grid-cols-2 gap-4">

                <select
                  value={newQuestion.difficulty}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      difficulty: e.target.value,
                    })
                  }
                  className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                <input
                  type="number"
                  min="1"
                  placeholder="Marks"
                  value={newQuestion.marks}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      marks: e.target.value,
                    })
                  }
                  className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 outline-none"
                />

              </div>

              <input
                type="text"
                placeholder="Correct answer"
                value={newQuestion.answer}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    answer: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 outline-none focus:border-sky-500"
              />

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="flex-1 rounded-lg bg-slate-700 py-3 font-semibold hover:bg-slate-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-sky-500 py-3 font-semibold hover:bg-sky-600"
                >
                  Add Question
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Questions;