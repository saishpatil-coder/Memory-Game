import React from "react";

const FeedbackMessage = ({ gameState, feedback, level, totalLevels }) => {
  if (gameState === 'transition') {
    return (
      <div className="text-blue-600 mt-4 text-base font-semibold animate-pulse">
        Get ready to recall the sequence!
      </div>
    );
  }
  if (feedback === 'completed') {
    return (
      <div className="text-emerald-600 mt-4 text-lg font-bold animate-bounce">
        {level < totalLevels - 1 ? '🎉 Level Complete! Moving to next level...' : '🎉 Game Complete!'}
      </div>
    );
  }
  if (feedback === 'wrong') {
    return (
      <div className="text-rose-500 mt-4 text-base font-semibold animate-shake">
        Wrong circle! Try again.
      </div>
    );
  }
  return null;
};

export default FeedbackMessage;
