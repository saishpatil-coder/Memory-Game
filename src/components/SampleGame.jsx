import React, { useMemo } from "react";
import OddOneOut from "./inbetweengames/OddOneOut";
import EmojiMatch from "./inbetweengames/EmojiMatch";
import SymmetryGame from "./inbetweengames/SymmetryGame";

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
  { component: SymmetryGame, props: {} },
];

const SampleGame = ({ onContinue }) => {
  // Pick a random game on mount
  const { component: GameComponent, props: gameProps } = useMemo(() => {
    const idx = Math.floor(Math.random() * games.length);
    return games[idx];
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-emerald-100 to-emerald-200 font-sans p-0 m-0">
      <div className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-center w-full h-full sm:p-8 sm:shadow-none sm:bg-white">
        <GameComponent {...gameProps} onComplete={onContinue} />
      </div>
    </div>
  );
};

export default SampleGame; 