import React, { useState } from "react";

const RiddleGame = ({ riddle, answer, onComplete }) => {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleCheck = () => {
    if (input.trim().toLowerCase() === answer.toLowerCase()) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try again!");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-4">
      <h3 className="text-xl font-bold text-slate-800 mb-2">Riddle</h3>
      <p className="text-slate-600 text-base mb-4 text-center max-w-xs">{riddle}</p>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Your answer"
        />
        <button
          onClick={handleCheck}
          className="px-4 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600"
        >
          Check
        </button>
      </div>
      {feedback && (
        <div className={`mb-4 text-base font-semibold ${feedback === 'Correct!' ? 'text-emerald-600' : 'text-rose-500'}`}>{feedback}</div>
      )}
      <button
        onClick={onComplete}
        className="px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        disabled={feedback !== 'Correct!'}
      >
        Continue
      </button>
    </div>
  );
};

export default RiddleGame; 