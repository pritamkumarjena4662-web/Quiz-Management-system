import { useState } from "react";

function Results() {
  const [results, setResults] = useState([
    {
      id: 1,
      student: "Rahul Kumar",
      email: "rahul@gmail.com",
      quiz: "JavaScript Basics",
      score: 18,
      total: 20,
      percentage: 90,
      status: "Passed",
    },
    {
      id: 2,
      student: "Priya Das",
      email: "priya@gmail.com",
      quiz: "React Fundamentals",
      score: 21,
      total: 25,
      percentage: 84,
      status: "Passed",
    },
    {
      id: 3,
      student: "Amit Singh",
      email: "amit@gmail.com",
      quiz: "Database & SQL",
      score: 12,
      total: 30,
      percentage: 40,
      status: "Failed",
    },
    {
      id: 4,
      student: "Sneha Patra",
      email: "sneha@gmail.com",
      quiz: "React Fundamentals",
      score: 23,
      total: 25,
      percentage: 92,
      status: "Passed",
    },
    {
      id: 5,
      student: "Rohan Jena",
      email: "rohan@gmail.com",
      quiz: "JavaScript Basics",
      score: 14,
      total: 20,
      percentage: 70,
      status: "Passed",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.student.toLowerCase().includes(search.toLowerCase()) ||
      result.email.toLowerCase().includes(search.toLowerCase()) ||
      result.quiz.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || result.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const deleteResult = (id) => {
    setResults((prev) => prev.filter((result) => result.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Results
        </h1>

        <p className="mt-1 text-slate-400">
          View and manage student quiz results
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">
            Total Attempts
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {results.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">
            Passed
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {results.filter((r) => r.status === "Passed").length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">
            Failed
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-400">
            {results.filter((r) => r.status === "Failed").length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">
            Average Score
          </p>

          <h2 className="mt-2 text-3xl font-bold text-sky-400">
            {results.length
              ? Math.round(
                  results.reduce(
                    (sum, result) => sum + result.percentage,
                    0
                  ) / results.length
                )
              : 0}
            %
          </h2>
        </div>

      </div>

      {/* Search & Filter */}
      <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800 p-5">

        <div className="flex flex-col gap-4 md:flex-row">

          <input
            type="text"
            placeholder="Search student, email or quiz..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-sky-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 outline-none"
          >
            <option value="All">All Results</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </select>

        </div>
      </div>

      {/* Results Table */}
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-slate-900">
              <tr>
                <th className="px-5 py-4 text-slate-300">
                  Student
                </th>

                <th className="px-5 py-4 text-slate-300">
                  Quiz
                </th>

                <th className="px-5 py-4 text-slate-300">
                  Score
                </th>

                <th className="px-5 py-4 text-slate-300">
                  Percentage
                </th>

                <th className="px-5 py-4 text-slate-300">
                  Status
                </th>

                <th className="px-5 py-4 text-slate-300">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredResults.map((result) => (
                <tr
                  key={result.id}
                  className="border-t border-slate-700 hover:bg-slate-700/40"
                >

                  <td className="px-5 py-5">
                    <p className="font-semibold">
                      {result.student}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {result.email}
                    </p>
                  </td>

                  <td className="px-5 py-5 text-slate-300">
                    {result.quiz}
                  </td>

                  <td className="px-5 py-5">
                    {result.score}/{result.total}
                  </td>

                  <td className="px-5 py-5 font-semibold">
                    {result.percentage}%
                  </td>

                  <td className="px-5 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        result.status === "Passed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {result.status}
                    </span>
                  </td>

                  <td className="px-5 py-5">
                    <button
                      onClick={() => deleteResult(result.id)}
                      className="rounded-lg bg-red-500 px-3 py-2 text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {filteredResults.length === 0 && (
          <div className="py-10 text-center text-slate-400">
            No results found.
          </div>
        )}

      </div>

    </div>
  );
}

export default Results;