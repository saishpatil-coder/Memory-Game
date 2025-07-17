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
  const { mainEmoji, oddEmoji, oddIndex, shuffledIndices } = useMemo(() => {
    const set = EMOJI_SETS[getRandomInt(EMOJI_SETS.length)];
    const oddIndex = getRandomInt(TOTAL_CELLS);
    // Shuffle indices for random placement
    const indices = Array.from({ length: TOTAL_CELLS }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return { mainEmoji: set.main, oddEmoji: set.odd, oddIndex, shuffledIndices: indices };
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

  // Map shuffled indices to cell positions, odd one is at shuffledIndices[oddIndex]
  const cells = shuffledIndices.map((cellIdx, gridIdx) => (
    <button
      key={gridIdx}
      onClick={() => handleCellClick(gridIdx)}
      className={`w-14 h-14 text-3xl rounded-xl shadow flex items-center justify-center m-1 transition-all duration-200 bg-white
        ${selected === gridIdx && gridIdx === oddIndex ? 'ring-4 ring-emerald-400 scale-110' : ''}
        ${selected === gridIdx && gridIdx !== oddIndex ? 'ring-4 ring-blue-400 scale-110' : ''}`}
    >
      {gridIdx === oddIndex ? oddEmoji : mainEmoji}
    </button>
  ));

  return (
    <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-lg mx-4 py-6 px-2">
      <h3 className="text-xl font-bold text-emerald-700 mb-2">Odd One Out</h3>
      <p className="text-blue-700 text-base mb-4 text-center max-w-xs">Spot the one emoji that doesn't match the rest!</p>
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
        <div className={`mb-4 text-base font-semibold ${feedback.startsWith('Correct') ? 'text-emerald-700' : 'text-blue-700'}`}>{feedback}</div>
      )}
    </div>
  );
};

export default OddOneOut; 