import React, { useState } from "react";

const TrueFalseGame = ({ statement, answer, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleSelect = (val) => {
    setSelected(val);
    if (val === answer) {
      setFeedback("Correct!");
    } else {
      setFeedback("Try again!");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-4">
      <h3 className="text-xl font-bold text-slate-800 mb-2">True or False?</h3>
      <p className="text-slate-600 text-base mb-4 text-center max-w-xs">{statement}</p>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleSelect(true)}
          className={`px-4 py-2 rounded-lg font-semibold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${selected === true ? (answer === true ? 'bg-emerald-500 text-white' : 'bg-rose-400 text-white') : 'bg-slate-100 text-slate-800 hover:bg-blue-100'}`}
        >
          True
        </button>
        <button
          onClick={() => handleSelect(false)}
          className={`px-4 py-2 rounded-lg font-semibold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${selected === false ? (answer === false ? 'bg-emerald-500 text-white' : 'bg-rose-400 text-white') : 'bg-slate-100 text-slate-800 hover:bg-blue-100'}`}
        >
          False
        </button>
      </div>
      {feedback && (
        <div className={`mb-4 text-base font-semibold ${feedback === 'Correct!' ? 'text-emerald-600' : 'text-rose-500'}`}>{feedback}</div>
      )}
      <button
        onClick={onComplete}
        className="px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        disabled={selected !== answer}
      >
        Continue
      </button>
    </div>
  );
};

export default TrueFalseGame; 