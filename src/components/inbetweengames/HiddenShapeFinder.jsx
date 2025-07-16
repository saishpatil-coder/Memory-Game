import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

const SHAPES = ["🔵", "🔺", "⬛", "🟪", "🟩", "🟧", "🟨", "🟥"];
const GRID_SIZE = 8;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default function HiddenShapeFinder({ onComplete }) {
  // Pick a random target and background shape, and odd index
  const { targetShape, backgroundShape, oddIndex } = useMemo(() => {
    let tIdx = getRandomInt(SHAPES.length);
    let bIdx;
    do {
      bIdx = getRandomInt(SHAPES.length);
    } while (bIdx === tIdx);
    const oddIndex = getRandomInt(TOTAL_CELLS);
    return { targetShape: SHAPES[tIdx], backgroundShape: SHAPES[bIdx], oddIndex };
  }, []);

  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [gameKey, setGameKey] = useState(0); // for replay

  const handleCellClick = (idx) => {
    setSelected(idx);
    if (idx === oddIndex) {
      setFeedback("🎉 Correct! You found the hidden shape!");
      if (onComplete) {
        setTimeout(() => onComplete(), 1000);
      }
    } else {
      setFeedback("❌ Try again!");
    }
  };

  const handleReplay = () => {
    setSelected(null);
    setFeedback(null);
    setGameKey((k) => k + 1);
  };

  // Regenerate grid on replay
  const grid = useMemo(() => {
    return Array.from({ length: TOTAL_CELLS }).map((_, idx) => (
      <motion.div
        key={idx + gameKey * 1000}
        className={`w-12 h-12 rounded-lg shadow flex items-center justify-center text-2xl cursor-pointer transition
          ${selected === idx && idx === oddIndex ? "ring-4 ring-emerald-400 scale-110 bg-white" : ""}
          ${selected === idx && idx !== oddIndex ? "ring-4 ring-rose-400 scale-110 bg-white" : ""}
        `}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleCellClick(idx)}
        style={{ background: '#f9fafb' }}
      >
        {idx === oddIndex ? targetShape : backgroundShape}
      </motion.div>
    ));
  }, [oddIndex, targetShape, backgroundShape, selected, gameKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">🔍 Hidden Shape Finder</h1>
      <p className="mb-2 text-lg">
        Find the hidden shape: <span className="font-semibold text-xl">{targetShape}</span>
      </p>
      <div
        className="grid gap-2 mb-4"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
        }}
      >
        {grid}
      </div>
      {feedback && (
        <div className={`mb-4 text-xl font-semibold ${feedback.startsWith("🎉") ? "text-emerald-600 animate-bounce" : "text-rose-500 animate-shake"}`}>{feedback}</div>
      )}
      {feedback && !onComplete && (
        <button
          onClick={handleReplay}
          className="px-6 py-2 rounded-lg font-semibold text-white bg-blue-600 shadow-md hover:bg-blue-700 mt-2"
        >
          Play Again
        </button>
      )}
    </div>
  );
}
