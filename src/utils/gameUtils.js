// Utility for generating a unique random sequence
export function getRandomSequence(length) {
  const seq = [];
  while (seq.length < length) {
    const idx = Math.floor(Math.random() * (12));
    if (!seq.includes(idx)) seq.push(idx);
  }
  return seq;
} 