import React, { useState, useMemo } from "react";

// Example grid patterns for symmetry
const SYMMETRY_PATTERNS = [
  {
    grid: [
      [1,0,0,0,0,1],
      [1,1,0,0,1,1],
      [1,0,1,1,0,1],
      [1,1,1,1,1,1],
      [1,0,1,1,0,1],
      [1,1,0,0,1,1],
      [1,0,0,0,0,1],
    ],
    isSymmetrical: true
  },
  {
    grid: [
      [1,0,0,0,0,1],
      [1,1,0,0,1,1],
      [1,0,1,1,0,1],
      [1,1,1,0,1,1],
      [1,0,1,1,0,1],
      [1,1,0,0,1,1],
      [1,0,0,0,0,1],
    ],
    isSymmetrical: false
  },
  {
    grid: [
      [0,1,1,1,1,0],
      [1,0,0,0,0,1],
      [1,0,1,1,0,1],
      [1,1,1,1,1,1],
      [1,0,1,1,0,1],
      [1,0,0,0,0,1],
      [0,1,1,1,1,0],
    ],
    isSymmetrical: true
  },
  {
    grid: [
      [0,1,1,1,1,0],
      [1,0,0,0,0,1],
      [1,0,1,1,0,1],
      [1,1,1,0,1,1],
      [1,0,1,1,0,1],
      [1,0,0,0,0,1],
      [0,1,1,1,1,0],
    ],
    isSymmetrical: false
  },
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function PatternDisplay({ grid }) {
  const rows = grid.length;
  const cols = grid[0].length;
  const mid = Math.floor(cols / 2);
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 22px)`,
      gap: '7px',
      background: '#2eccb6',
      padding: '24px 18px',
      borderRadius: '12px',
      position: 'relative',
      margin: '0 auto',
      minWidth: cols * 22 + (cols-1)*7 + 36,
      boxShadow: '0 2px 16px 0 #0002',
    }}>
      {grid.map((row, rIdx) =>
        row.map((cell, cIdx) => (
          <div key={rIdx + '-' + cIdx} style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: cell ? '#fff' : 'transparent',
            zIndex: 2,
          }} />
        ))
      )}
      {/* Vertical symmetry line */}
      <div style={{
        position: 'absolute',
        left: `calc(50% - 1px)`,
        top: 10,
        bottom: 10,
        width: 2,
        background: '#2228',
        borderRadius: 1,
        zIndex: 1,
      }} />
    </div>
  );
}

const SymmetryGame = ({ onComplete }) => {
  // Pick a random pattern on mount
  const pattern = useMemo(() => {
    return SYMMETRY_PATTERNS[getRandomInt(SYMMETRY_PATTERNS.length)];
  }, []);

  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleAnswer = (answer) => {
    setSelected(answer);
    if (answer === pattern.isSymmetrical) {
      setFeedback("Correct! This is " + (pattern.isSymmetrical ? "symmetrical." : "not symmetrical."));
        setTimeout(() => onComplete && onComplete(), 1000);
      } else {
        setFeedback("Try again!");
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen mx-0 px-0 py-0 bg-white">
      <h3 className="text-xl font-bold text-slate-800 mb-2 text-center w-full">Symmetry Game</h3>
      <p className="text-slate-600 text-base mb-4 text-center w-full">Is this symmetrical?</p>
      <div className="mb-4">
        <PatternDisplay grid={pattern.grid} />
          </div>
      <div className="flex gap-4 mb-4 w-full justify-center">
        <button
          onClick={() => handleAnswer(true)}
          className={`px-6 py-3 rounded-none font-semibold text-white bg-green-600 shadow-md transition-all duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 w-1/2` + (selected === true ? ' ring-4 ring-green-300' : '')}
        >
          YES
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className={`px-6 py-3 rounded-none font-semibold text-white bg-rose-500 shadow-md transition-all duration-200 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 w-1/2` + (selected === false ? ' ring-4 ring-rose-300' : '')}
        >
          NO
        </button>
      </div>
      {feedback && (
        <div className={`mb-4 text-base font-semibold ${feedback.startsWith('Correct') ? 'text-emerald-600' : 'text-rose-500'} w-full text-center`}>{feedback}</div>
      )}
    </div>
  );
};

export default SymmetryGame; 