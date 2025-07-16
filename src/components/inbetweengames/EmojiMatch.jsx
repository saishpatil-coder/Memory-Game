import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const emojis = ["🍕", "🚀", "🐶", "🎮", "🍩", "🎧"];

function shuffleArray(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default function EmojiMatch({ onComplete }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    const doubleEmojis = shuffleArray([...emojis, ...emojis]);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">🎯 Emoji Match Game</h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <motion.div
              key={index}
              className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl cursor-pointer hover:scale-105 transition"
              onClick={() => handleFlip(index)}
              whileTap={{ scale: 0.9 }}
            >
              {isFlipped ? card.emoji : "❓"}
            </motion.div>
          );
        })}
      </div>
      {matched.length === cards.length && (
        <div className="mt-6 text-xl font-semibold text-green-700 animate-bounce">
          ✅ You Matched All!
        </div>
      )}
    </div>
  );
} 