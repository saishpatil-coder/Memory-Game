import React from "react";

const sizeMap = {
  lg: "w-14 h-14 md:w-16 md:h-16",
  sm: "w-8 h-8",
};

const accentMap = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  yellow: "bg-yellow-400",
};

const Circle = ({ isFilled, visible = true, size = "lg", accent = "blue", onClick, isCorrect, isWrong, isHint }) => (
  <div
    onClick={onClick}
    className={`rounded-full flex items-center justify-center transition-all duration-300 select-none
      ${sizeMap[size]}
      ${!visible ? 'bg-transparent border-0 shadow-none' : ''}
      ${visible && isFilled ? `${accentMap[accent]} border-2 border-white shadow-lg` : ''}
      ${visible && !isFilled ? 'bg-slate-200 border-2 border-white' : ''}
      ${isCorrect ? 'scale-110 ring-2 ring-emerald-400' : ''}
      ${isWrong ? 'animate-shake bg-rose-500' : ''}
      ${isHint ? 'ring-4 ring-yellow-300 animate-pulse' : ''}
      ${onClick && visible ? 'cursor-pointer hover:scale-105' : ''}`}
  />
);

export default Circle;