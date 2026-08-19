import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const quizQuestions = [
  {
    question: "Which language is mainly used to create interactive web pages?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: "JavaScript",
  },
  {
    question: "Which library is used for building user interfaces?",
    options: ["React", "MySQL", "Node.js", "MongoDB"],
    answer: "React",
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: "const",
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useState", "useNavigate", "useFetch"],
    answer: "useState",
  },
  {
    question: "Which method is used to render a list in React?",
    options: ["filter()", "map()", "reduce()", "find()"],
    answer: "map()",
  },
];

function Quiz() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [submitted, setSubmitted] = useState(false);

  // Timer
  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      setSubmitted(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const question = quizQuestions[currentQuestion];

  const selectedAnswer = answers[currentQuestion] || "";

  const handleOptionSelect = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;

    quizQuestions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        score++;
      }
    });

    return score;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  // RESULT PAGE
  if (submitted) {
    const score = calculateScore();

    const percentage = Math.round(
      (score / quizQuestions.length) * 100
    );

    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-xl">

          <h1 className="text-3xl font-bold mb-3">
            Quiz Completed!
          </h1>

          <p className="text-slate-400 mb-6">
            Here is your final result
          </p>

          <div className="bg-slate-900 rounded-xl p-6 mb-6">
            <p className="text-slate-400">
              Your Score
            </p>

            <h2 className="text-5xl font-bold text-sky-400 mt-2">
              {score}/{quizQuestions.length}
            </h2>

            <p className="text-2xl font-semibold mt-3">
              {percentage}%
            </p>
          </div>

          <button
            onClick={() => navigate("/student/dashboard")}
            className="w-full bg-sky-500 hover:bg-sky-600 px-5 py-3 rounded-lg font-semibold"
          >
            Back to Dashboard
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold">
              JavaScript Basics
            </h1>

            <p className="text-slate-400 mt-1">
              Test your JavaScript knowledge
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 px-5 py-3 rounded-xl">
            <p className="text-xs text-slate-400">
              Time Remaining
            </p>

            <p className="text-xl font-bold text-sky-400">
              {formatTime(timeLeft)}
            </p>
          </div>

        </div>

      </div>

      {/* PROGRESS */}
      <div className="max-w-4xl mx-auto mb-6">

        <div className="flex justify-between text-sm text-slate-400 mb-2">

          <span>
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>

          <span>
            {Math.round(
              ((currentQuestion + 1) / quizQuestions.length) * 100
            )}
            %
          </span>

        </div>

        <div className="w-full bg-slate-800 rounded-full h-2">

          <div
            className="bg-sky-500 h-2 rounded-full transition-all"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  quizQuestions.length) *
                100
              }%`,
            }}
          />

        </div>

      </div>

      {/* QUESTION */}
      <div className="max-w-4xl mx-auto">

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8">

          <h2 className="text-xl md:text-2xl font-semibold mb-7">
            {question.question}
          </h2>

          {/* OPTIONS */}
          <div className="space-y-4">

            {question.options.map((option, index) => (

              <button
                key={option}
                type="button"
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-4 rounded-xl border transition ${
                  selectedAnswer === option
                    ? "border-sky-500 bg-sky-500/20"
                    : "border-slate-700 bg-slate-900 hover:border-sky-500"
                }`}
              >

                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 mr-3 text-sm">
                  {String.fromCharCode(65 + index)}
                </span>

                {option}

              </button>

            ))}

          </div>

          {/* NAVIGATION */}
          <div className="flex flex-col md:flex-row justify-between gap-3 mt-8">

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-5 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentQuestion === quizQuestions.length - 1 ? (

              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 font-semibold"
              >
                Submit Quiz
              </button>

            ) : (

              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 font-semibold"
              >
                Next
              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Quiz;