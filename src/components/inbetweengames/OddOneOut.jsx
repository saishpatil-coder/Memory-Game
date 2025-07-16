import React, { useState, useMemo } from "react";

const EMOJI_SETS = [
  { main: "🍎", odd: "🍏" },
  { main: "🐶", odd: "🐱" },
  { main: "🌵", odd: "🌲" },
  { main: "⚽", odd: "🏀" },
  { main: "🚗", odd: "🚕" },
  { main: "🍕", odd: "🍔" },
  { main: "🎮", odd: "🎲" },
  { main: "🎧", odd: "🎤" },
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const GRID_SIZE = 4;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const OddOneOut = ({ onComplete }) => {
  // Pick a random emoji set and odd index on mount
  const { mainEmoji, oddEmoji, oddIndex } = useMemo(() => {
    const set = EMOJI_SETS[getRandomInt(EMOJI_SETS.length)];
    const oddIndex = getRandomInt(TOTAL_CELLS);
    return { mainEmoji: set.main, oddEmoji: set.odd, oddIndex };
  }, []);

  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleCellClick = (idx) => {
    setSelected(idx);
    if (idx === oddIndex) {
      setFeedback("Correct! You found the odd one out.");
      setTimeout(() => onComplete && onComplete(), 1000);
    } else {
      setFeedback("Try again!");
    }
  };

  const cells = Array.from({ length: TOTAL_CELLS }).map((_, idx) => (
    <button
      key={idx}
      onClick={() => handleCellClick(idx)}
      className={`w-14 h-14 text-3xl rounded-lg shadow flex items-center justify-center m-1 transition-all duration-200
        ${selected === idx && idx === oddIndex ? 'ring-4 ring-emerald-400 scale-110' : ''}
        ${selected === idx && idx !== oddIndex ? 'ring-4 ring-rose-400 scale-110' : ''}`}
      style={{ background: '#fff' }}
    >
      {idx === oddIndex ? oddEmoji : mainEmoji}
    </button>
  ));

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-4">
      <h3 className="text-xl font-bold text-slate-800 mb-2">Odd One Out</h3>
      <p className="text-slate-600 text-base mb-4 text-center max-w-xs">Spot the one emoji that doesn't match the rest!</p>
      <div
        className="grid gap-2 mb-4"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
        }}
      >
        {cells}
      </div>
      {feedback && (
        <div className={`mb-4 text-base font-semibold ${feedback.startsWith('Correct') ? 'text-emerald-600' : 'text-rose-500'}`}>{feedback}</div>
      )}
      {/* Continue button is not needed, auto-continue on correct */}
    </div>
  );
};

export default OddOneOut; 