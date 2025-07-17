import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EMOJI_POOL = [
  "🍕", "🚀", "🐶", "🍎", "🎲", "🎸", "🏀", "🌟", "🦄", "🍔",
  "🎧", "🐱", "🍩", "🎮", "🚗", "🐟", "🍦", "🦋", "🍉", "🎤"
];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function EmojiMatch({ onComplete }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    // Select 2-5 unique emojis from the pool
    const numEmojis = getRandomInt(2, 5);
    const selectedEmojis = shuffleArray(EMOJI_POOL).slice(0, numEmojis);
    const doubleEmojis = shuffleArray([...selectedEmojis, ...selectedEmojis]);
    const cardSet = doubleEmojis.map((emoji, idx) => ({ id: idx, emoji }));
    setCards(cardSet);
  }, []);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0 && onComplete) {
      // Call onComplete after a short delay so user sees the win message
      setTimeout(() => onComplete(), 1200);
    }
  }, [matched, cards, onComplete]);

  const handleFlip = (id) => {
    if (lock || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLock(true);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched((prev) => [...prev, first, second]);
      }
      setTimeout(() => {
        setFlipped([]);
        setLock(false);
      }, 1000);
    }
  };

  // Calculate grid columns based on number of cards
  const gridCols = Math.min(5, Math.ceil(Math.sqrt(cards.length)));

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-emerald-100 to-emerald-200 font-sans p-0 m-0">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center p-4 w-full max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-emerald-700">🎯 Emoji Match Game</h1>
        <div className={`grid gap-4 mb-4`} style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}>
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index) || matched.includes(index);
            return (
              <motion.div
                key={index}
                className={`w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl cursor-pointer hover:scale-105 transition border-2
                  ${matched.includes(index) ? 'border-emerald-400' : isFlipped ? 'border-blue-400' : 'border-slate-200'}`}
                onClick={() => handleFlip(index)}
                whileTap={{ scale: 0.9 }}
              >
                {isFlipped ? card.emoji : "❓"}
              </motion.div>
            );
          })}
        </div>
        {matched.length === cards.length && (
          <div className="mt-6 text-lg font-semibold text-emerald-700 animate-bounce bg-white/90 rounded-xl px-4 py-2 shadow">
            ✅ You Matched All!
          </div>
        )}
      </div>
    </div>
  );
} 