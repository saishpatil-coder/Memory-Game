import React from "react";
import Circle from "./Circle";

const GameBoard = ({ phase, gridSize, sequence, showIndex, recallIndex, feedback, handleCircleClick, hintIndex }) => {
  const circles = Array.from({ length: 16 }).map((_, i) => {
    let isFilled = false;
    let isCorrect = false;
    let isWrong = false;
    let isHint = false;
    // Only show circles that are in the sequence
    const visible = sequence.includes(i);
    if (phase === 'memorize') {
      isFilled = i === sequence[showIndex];
    } else {
      isFilled = recallIndex > 0 && sequence.slice(0, recallIndex).includes(i);
      isCorrect = isFilled;
      isWrong = feedback === 'wrong' && i === sequence[recallIndex];
      isHint = hintIndex === i;
    }
    return (
      <Circle
        key={i}
        isFilled={isFilled}
        visible={visible}
        size="lg"
        accent={isHint ? 'yellow' : (phase === 'memorize' ? 'blue' : 'emerald')}
        onClick={phase === 'recall' ? () => handleCircleClick(i) : null}
        isCorrect={isCorrect}
        isWrong={isWrong}
        isHint={isHint}
      />
    );
  });
  return <div className={`flex flex-wrap gap-4 w-full max-w-xs mb-8`}>{circles}</div>;
};

export default GameBoard; 