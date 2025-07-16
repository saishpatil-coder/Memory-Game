import React, { useState, useCallback, useEffect, useRef } from "react";
import GameBoard from "./GameBoard";
import Controls from "./Controls";
import FeedbackMessage from "./FeedbackMessage";
import { getRandomSequence } from "../utils/gameUtils";
import SampleGame from "./SampleGame";

const CircleSection = () => {
  const LEVELS = [1,2,3,4,5,6,7,8,9,10];
  const GRID_SIZES = [1,2,3,4,5,6,7,8,9,10];
  // State
  const [level, setLevel] = useState(0);
  const [phase, setPhase] = useState('memorize'); // 'memorize' | 'recall'
  const [sequence, setSequence] = useState([]); // The full sequence for this level
  const [showIndex, setShowIndex] = useState(0); // Which index in the sequence is currently being shown
  const [recallIndex, setRecallIndex] = useState(0); // How many correct recalls so far
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | 'completed' 
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'transition' | 'levelUp'
  const [hintIndex, setHintIndex] = useState(null); // index of the circle to hint (glow)
  const [nextCountdown, setNextCountdown] = useState(null); // countdown for Next button
  const countdownTimeoutRef = useRef();
  const [showSamplePage, setShowSamplePage] = useState(false);
  const pendingNextRef = useRef(false);

  const totalCircles = LEVELS[level];
  const gridSize = GRID_SIZES[level];

  // On level start/reset, generate the sequence and reset state
  useEffect(() => {
    const seq = getRandomSequence(totalCircles);
    setSequence(seq);
    setShowIndex(0);
    setRecallIndex(0);
    setPhase('memorize');
    setFeedback(null);
    setGameState('playing');
  }, [level]);

  // Countdown effect for Next button (robust single setTimeout approach)
  useEffect(() => {
    if (phase === 'memorize' && gameState === 'playing' && showIndex < sequence.length && !showSamplePage) {
      setNextCountdown(3);
      if (countdownTimeoutRef.current) clearTimeout(countdownTimeoutRef.current);
      let count = 3;
      const tick = () => {
        count--;
        setNextCountdown(count);
        if (count > 0) {
          countdownTimeoutRef.current = setTimeout(tick, 1000);
        } else {
          countdownTimeoutRef.current = null;
          // Instead of handleNext, show sample page and mark pending next
          pendingNextRef.current = true;
          setShowSamplePage(true);
        }
      };
      countdownTimeoutRef.current = setTimeout(tick, 1000);
    } else {
      setNextCountdown(null);
      if (countdownTimeoutRef.current) {
        clearTimeout(countdownTimeoutRef.current);
        countdownTimeoutRef.current = null;
      }
    }
    // Cleanup on unmount
    return () => {
      if (countdownTimeoutRef.current) {
        clearTimeout(countdownTimeoutRef.current);
        countdownTimeoutRef.current = null;
      }
    };
  }, [phase, gameState, showIndex, sequence.length, showSamplePage]);

  // Next button: show sample page, then advance on continue
  const handleNext = useCallback(() => {
    if (countdownTimeoutRef.current) {
      clearTimeout(countdownTimeoutRef.current);
      countdownTimeoutRef.current = null;
    }
    setNextCountdown(null);
    // Show sample page and mark pending next
    pendingNextRef.current = true;
    setShowSamplePage(true);
  }, []);

  // When continue is clicked on sample page
  const handleContinueFromSample = useCallback(() => {
    setShowSamplePage(false);
    if (pendingNextRef.current) {
      pendingNextRef.current = false;
      // Actually advance the dot
      if (showIndex < sequence.length - 1) {
        setShowIndex((prev) => prev + 1);
      } else if (showIndex === sequence.length - 1) {
        setGameState('transition');
        setTimeout(() => {
          setPhase('recall');
          setGameState('playing');
        }, 1000);
      }
    }
  }, [showIndex, sequence.length]);

  // Recall phase: handle user click
  const handleCircleClick = useCallback((idx) => {
    if (phase !== 'recall' || recallIndex >= sequence.length || feedback === 'completed') return;
    if (idx === sequence[recallIndex]) {
      if (recallIndex + 1 === sequence.length) {
        // Show last circle as correct first
        setRecallIndex((prev) => prev + 1);
        setFeedback('correct');
        setTimeout(() => {
          setFeedback('completed');
          // No auto-advance here
        }, 300);
      } else {
        setRecallIndex((prev) => prev + 1);
        setFeedback('correct');
        setTimeout(() => setFeedback(null), 300);
      }
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  }, [phase, recallIndex, sequence, feedback, level]);

  // Hint button handler
  const handleHint = useCallback(() => {
    if (phase === 'recall' && recallIndex < sequence.length) {
      setHintIndex(sequence[recallIndex]);
      setTimeout(() => setHintIndex(null), 1000);
    }
  }, [phase, recallIndex, sequence]);

  // Reset button
  const handleReset = useCallback(() => {
    setLevel(0);
    const seq = getRandomSequence(LEVELS[0], GRID_SIZES[0]);
    setSequence(seq);
    setShowIndex(0);
    setRecallIndex(0);
    setPhase('memorize');
    setFeedback(null);
    setGameState('playing');
  }, []);

  // Level navigation handlers
  const handleNextLevel = useCallback(() => {
    if (level < LEVELS.length - 1) {
      setLevel((prev) => prev + 1);
    }
  }, [level, LEVELS.length]);

  const handlePrevLevel = useCallback(() => {
    if (level > 0) {
      setLevel((prev) => prev - 1);
    }
  }, [level]);

  // Render
  if (showSamplePage) {
    return <SampleGame onContinue={handleContinueFromSample} />;
  }
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-emerald-100 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center w-full max-w-lg mx-4 border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">Memory Circles</h1>
        <p className="text-slate-600 text-sm mb-6 text-center max-w-xs">
          {phase === 'memorize'
            ? `Memorize the order of the glowing circles. Press Next to advance.`
            : `Click the circles in the memorized order. Level ${level + 1} of ${LEVELS.length}.`}
        </p>
        <GameBoard
          phase={phase}
          gridSize={gridSize}
          sequence={sequence}
          showIndex={showIndex}
          recallIndex={recallIndex}
          feedback={feedback}
          handleCircleClick={handleCircleClick}
          hintIndex={hintIndex}
        />
        <Controls
          phase={phase}
          gameState={gameState}
          showIndex={showIndex}
          sequenceLength={sequence.length}
          handleNext={handleNext}
          handleReset={handleReset}
          handleHint={handleHint}
          nextCountdown={nextCountdown}
        />
        <div className="text-slate-700 text-sm font-medium mt-4">
          {phase === 'memorize'
            ? `Progress: ${showIndex + 1} / ${sequence.length}`
            : `Recall: ${recallIndex} / ${sequence.length}`}
        </div>
        <FeedbackMessage gameState={gameState} feedback={feedback} level={level} totalLevels={LEVELS.length} />
        {/* Level navigation buttons */}
        <div className="flex flex-row gap-4 mt-6">
          <button
            onClick={handlePrevLevel}
            className="px-4 py-2 rounded-lg font-semibold text-white bg-slate-500 hover:bg-slate-600"
            disabled={level === 0}
          >
            Previous Level
          </button>
          <button
            onClick={handleNextLevel}
            className="px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700"
            disabled={level === LEVELS.length - 1}
          >
            Next Level
          </button>
        </div>
      </div>
    </section>
  );
};

export default CircleSection;