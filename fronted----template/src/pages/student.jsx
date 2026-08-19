import { useState } from "react";

function Students() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      quizzes: 18,
      score: "86%",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Das",
      email: "priya@gmail.com",
      quizzes: 22,
      score: "91%",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@gmail.com",
      quizzes: 12,
      score: "74%",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Sneha Patra",
      email: "sneha@gmail.com",
      quizzes: 25,
      score: "94%",
      status: "Active",
    },
    {
      id: 5,
      name: "Rohan Jena",
      email: "rohan@gmail.com",
      quizzes: 15,
      score: "81%",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
  });

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const addStudent = () => {
    if (!newStudent.name || !newStudent.email) {
      alert("Please enter student name and email");
      return;
    }

    const student = {
      id: Date.now(),
      name: newStudent.name,
      email: newStudent.email,
      quizzes: 0,
      score: "0%",
      status: "Active",
    };

    setStudents([...students, student]);

    setNewStudent({
      name: "",
      email: "",
    });

    setShowAdd(false);
  };
const editStudent = (student) => {
  const name = window.prompt("Student Name:", student.name);
  if (name === null) return;

  const email = window.prompt("Email:", student.email);
  if (email === null) return;

  const quizzes = window.prompt("Quizzes:", student.quizzes);
  if (quizzes === null) return;

  const score = window.prompt("Score:", student.score);
  if (score === null) return;

  const status = window.prompt(
    "Status (Active/Inactive):",
    student.status
  );
  if (status === null) return;

  setStudents((prev) =>
    prev.map((s) =>
      s.id === student.id
        ? {
            ...s,
            name: name.trim(),
            email: email.trim(),
            quizzes: Number(quizzes),
            score: score.trim(),
            status:
              status.trim().toLowerCase() === "inactive"
                ? "Inactive"
                : "Active",
          }
        : s
    )
  );
};
  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Students
          </h1>

          <p className="mt-1 text-slate-400">
            Manage registered students
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
        >
          + Add Student
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid gap-5 sm:grid-cols-3">

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Total Students
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {students.length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Active Students
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {students.filter((s) => s.status === "Active").length}
          </h2>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Inactive Students
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-400">
            {students.filter((s) => s.status === "Inactive").length}
          </h2>
        </div>

      </div>

      {/* Search */}
      <div className="mb-6 rounded-xl border border-slate-700 bg-slate-900 p-5">
        <input
          type="text"
          placeholder="Search students by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900">

        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm">

            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Quizzes</th>
                <th className="px-5 py-4">Average Score</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-800 hover:bg-slate-800"
                >

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold">
                        {student.name.charAt(0)}
                      </div>

                      <span className="font-semibold">
                        {student.name}
                      </span>

                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    {student.email}
                  </td>

                  <td className="px-5 py-4">
                    {student.quizzes}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {student.score}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        student.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() => editStudent(student.id)}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteStudent(student.id)}
                        className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold hover:bg-red-700"
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
      </div>

      {/* Add Student Modal */}
      {showAdd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-4">

          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6">

            <h2 className="mb-1 text-2xl font-bold">
              Add Student
            </h2>

            <p className="mb-6 text-sm text-slate-400">
              Create a new student account
            </p>

            <input
              type="text"
              placeholder="Full Name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  name: e.target.value,
                })
              }
              className="mb-4 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={newStudent.email}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  email: e.target.value,
                })
              }
              className="mb-6 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 outline-none focus:border-blue-500"
            />

            <div className="flex gap-3">

              <button
                onClick={addStudent}
                className="flex-1 rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-700"
              >
                Add Student
              </button>

              <button
                onClick={() => setShowAdd(false)}
                className="flex-1 rounded-lg bg-slate-700 py-3 font-semibold hover:bg-slate-600"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Students;