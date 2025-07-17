import React from "react";
import { motion } from "framer-motion";

const GAME_NAME = "Memory Circles";

const HOW_TO_PLAY = [
  {
    icon: "👀",
    title: "Watch the Pattern",
    desc: "Circles will light up in a special order."
  },
  {
    icon: "🧠",
    title: "Remember the Order",
    desc: "Keep the sequence in your mind."
  },
  {
    icon: "👆",
    title: "Tap to Recall!",
    desc: "Tap the circles in the same order to win."
  }
];

const LandingPage = ({ onStart }) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-br from-blue-200 via-emerald-100 to-emerald-200 font-sans relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-300 opacity-30 rounded-full blur-2xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-300 opacity-20 rounded-full blur-2xl z-0" />

      {/* Hero Section */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-12 z-10"
      >
        <div className="text-6xl mb-2 drop-shadow-lg">🧩</div>
        <h1 className="text-4xl font-extrabold text-emerald-700 tracking-tight drop-shadow mb-1">
          {GAME_NAME}
        </h1>
        <p className="text-slate-600 text-base mt-1 font-medium">Train your memory. Challenge your mind. Have fun!</p>
      </motion.div>

      {/* How to Play Section */}
      <motion.div
        className="px-6 flex-1 flex flex-col justify-center z-10"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.18
            }
          }
        }}
      >
        <h2 className="text-xl font-semibold text-slate-700 text-center mb-5 mt-2">How to Play</h2>
        <div className="flex flex-col gap-5 max-w-xs mx-auto">
          {HOW_TO_PLAY.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 bg-white/80 rounded-xl shadow p-3"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <span className="text-3xl sm:text-4xl">{step.icon}</span>
              <div>
                <div className="font-bold text-slate-800 text-base mb-0.5">{step.title}</div>
                <div className="text-slate-600 text-xs sm:text-sm leading-tight">{step.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="p-6 w-full z-10"
      >
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-lg sm:text-xl font-bold py-4 rounded-2xl shadow-xl transition duration-200 active:scale-95 tracking-wide drop-shadow-lg"
        >
          🚀 Start Playing
        </button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
