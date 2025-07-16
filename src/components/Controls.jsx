import React from "react";

const Controls = ({ phase, gameState, showIndex, sequenceLength, handleNext, handleReset, handleHint, nextCountdown }) => (
  <div className="flex flex-col items-center gap-4 w-full">
    {phase === 'memorize' && gameState === 'playing' && (
      <button
        onClick={handleNext}
        className="px-6 py-3 rounded-lg font-semibold text-white bg-blue-600 shadow-md transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={showIndex >= sequenceLength}
      >
        {showIndex == sequenceLength - 1
          ? `Start Recalling${nextCountdown !== null ? ` (${nextCountdown})` : ''}`
          : `Next${nextCountdown !== null ? ` (${nextCountdown})` : ''}`}
      </button>
    )}
    {phase === 'recall' && (
      <button
        onClick={handleHint}
        className="px-6 py-3 rounded-lg font-semibold text-white bg-yellow-500 shadow-md transition-all duration-200 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        Hint
      </button>
    )}
    <button
      onClick={handleReset}
      className="px-6 py-3 rounded-lg font-semibold text-white bg-emerald-600 shadow-md transition-all duration-200 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
    >
      Reset
    </button>
  </div>
);

export default Controls; 