import React from "react";
import Circle from "./Circle";

const CIRCLE_COUNT = 12;
const CIRCLE_RADIUS = 32; // px (half of 64px diameter)
const CIRCLE_PADDING = 8; // px
const CONTAINER_W = 340; // px (responsive max)
const CONTAINER_H = 340; // px

// Module-level cache for positions by level
const positionsCache = {};

function generateRandomPositions(count, containerW, containerH, radius, padding) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    let placed = false;
    for (let attempt = 0; attempt < 5000; attempt++) {
      const x = Math.random() * (containerW - 2 * radius - padding) + radius + padding / 2;
      const y = Math.random() * (containerH - 2 * radius - padding) + radius + padding / 2;
      let overlap = false;
      for (const pos of positions) {
        const dx = pos.x - x;
        const dy = pos.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < 2 * radius + padding) {
          overlap = true;
          break;
        }
      }
      if (!overlap) {
        positions.push({ x, y });
        placed = true;
        break;
      }
    }
    if (!placed) {
      // Could not place this circle after all attempts, stop placing more
      break;
    }
  }
  return positions;
}

const RandomCircleBoard = ({ phase, gridSize, sequence, showIndex, recallIndex, feedback, handleCircleClick, hintIndex, level }) => {
  // Use module-level cache for positions
  if (!positionsCache[level]) {
    positionsCache[level] = generateRandomPositions(CIRCLE_COUNT, CONTAINER_W, CONTAINER_H, CIRCLE_RADIUS, CIRCLE_PADDING);
  }
  const positions = positionsCache[level];

  return (
    <div
      className="relative mb-8 mx-auto"
      style={{ width: CONTAINER_W, height: CONTAINER_H, maxWidth: '95vw', maxHeight: '60vw' }}
    >
      {positions.map((pos, i) => {
        let isFilled = false;
        let isCorrect = false;
        let isWrong = false;
        let isHint = false;
        if (phase === 'memorize') {
          isFilled = i === sequence[showIndex];
        } else {
          isFilled = recallIndex > 0 && sequence.slice(0, recallIndex).includes(i);
          isCorrect = isFilled;
          isWrong = feedback === 'wrong' && i === sequence[recallIndex];
          isHint = hintIndex === i;
        }
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: pos.x - CIRCLE_RADIUS,
              top: pos.y - CIRCLE_RADIUS,
              zIndex: 2,
              transition: 'left 0.5s, top 0.5s',
            }}
          >
            <Circle
              isFilled={isFilled}
              size="lg"
              accent={isHint ? 'yellow' : (phase === 'memorize' ? 'blue' : 'emerald')}
              onClick={phase === 'recall' ? () => handleCircleClick(i) : null}
              isCorrect={isCorrect}
              isWrong={isWrong}
              isHint={isHint}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RandomCircleBoard; 