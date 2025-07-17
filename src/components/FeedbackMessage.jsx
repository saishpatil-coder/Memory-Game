import React from "react";

const FeedbackMessage = ({ gameState, feedback, level, totalLevels }) => {
  if (gameState === 'transition') {
    return (
      <div className="bg-white/90 rounded-xl shadow px-4 py-2 mt-4 text-blue-700 text-base font-semibold animate-pulse text-center max-w-xs mx-auto">
        Get ready to recall the sequence!
      </div>
    );
  }
  if (feedback === 'completed') {
    return (
      <div className="bg-white/90 rounded-xl shadow px-4 py-2 mt-4 text-emerald-700 text-lg font-bold animate-bounce text-center max-w-xs mx-auto">
        {level < totalLevels - 1 ? '🎉 Level Complete! Moving to next level...' : '🎉 Game Complete!'}
      </div>
    );
  }
  if (feedback === 'wrong') {
    return (
      <div className="bg-white/90 rounded-xl shadow px-4 py-2 mt-4 text-rose-500 text-base font-semibold animate-shake text-center max-w-xs mx-auto">
        Wrong circle! Try again.
      </div>
    );
  }
  return null;
};

export default FeedbackMessage;
