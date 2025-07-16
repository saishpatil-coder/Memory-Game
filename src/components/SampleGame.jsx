import React, { useMemo } from "react";
import OddOneOut from "./inbetweengames/OddOneOut";
import MathPuzzle from "./inbetweengames/MathPuzzle";
import PatternGame from "./inbetweengames/PatternGame";
import TrueFalseGame from "./inbetweengames/TrueFalseGame";
import EmojiMatch from "./inbetweengames/EmojiMatch";
import HiddenShapeFinder from "./inbetweengames/HiddenShapeFinder";

// Math puzzles
const mathPuzzles = [
  { question: "What is 7 + 6 × 2?", answer: 19 },
  { question: "What is 15 - 3 × 4?", answer: 3 },
  { question: "What is (8 + 2) × 5?", answer: 50 },
  { question: "What is 9 × 9?", answer: 81 },
  { question: "What is 100 ÷ 4?", answer: 25 },
];

// Pattern games
const patternGames = [
  { sequence: [2, 4, 8, 16], answer: 32 },
  { sequence: [1, 1, 2, 3, 5, 8], answer: 13 },
  { sequence: [5, 10, 20, 40], answer: 80 },
  { sequence: [3, 6, 12, 24], answer: 48 },
  { sequence: [10, 7, 4, 1], answer: -2 },
];

// True/False games
const trueFalseGames = [
  { statement: "The sum of the angles in a triangle is 180°.", answer: true },
  { statement: "The chemical symbol for gold is Au.", answer: true },
  { statement: "There are 30 days in February.", answer: false },
  { statement: "The capital of France is Berlin.", answer: false },
  { statement: "A square has four sides of equal length.", answer: true },
  { statement: "The boiling point of water is 100°C.", answer: true },
  { statement: "The sun rises in the west.", answer: false },
  { statement: "Python is a type of snake and a programming language.", answer: true },
];

// Flat array of all possible games
const games = [
  { component: OddOneOut, props: {} },
  { component: EmojiMatch, props: {} },
  { component: HiddenShapeFinder, props: {} },
  ...mathPuzzles.map(mp => ({ component: MathPuzzle, props: mp })),
  ...patternGames.map(pg => ({ component: PatternGame, props: pg })),
  ...trueFalseGames.map(tf => ({ component: TrueFalseGame, props: tf })),
];

const SampleGame = ({ onContinue }) => {
  // Pick a random game on mount
  const { component: GameComponent, props: gameProps } = useMemo(() => {
    const idx = Math.floor(Math.random() * games.length);
    return games[idx];
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-emerald-100 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-lg mx-4 border border-slate-200">
        <GameComponent {...gameProps} onComplete={onContinue} />
      </div>
    </div>
  );
};

export default SampleGame; 