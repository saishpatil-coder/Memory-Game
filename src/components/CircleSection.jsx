import React, { useState, useCallback, useEffect, useRef } from "react";
import GameBoard from "./GameBoard";
import Controls from "./Controls";
import FeedbackMessage from "./FeedbackMessage";
import { getRandomSequence } from "../utils/gameUtils";
import SampleGame from "./SampleGame";
import { MdArrowBack, MdArrowForward, MdHome } from "react-icons/md";
import RandomCircleBoard from "./RandomCircleBoard";

const CircleSection = ({ onHome }) => {
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
    <section className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 via-emerald-100 to-emerald-200 font-sans p-0 m-0 relative">
      {/* Home button */}
  
      <div className="bg-white shadow-2xl flex flex-col items-center w-full h-screen justify-evenly sm:shadow-none sm:bg-white">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-500 to-emerald-400 drop-shadow mb-1 tracking-tight text-center w-full font-sans" style={{fontFamily: 'inherit, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif'}}>Memory Circles</h1>
        <div className="flex flex-row items-center align-center justify-around w-full mb-2 gap-6">
          {/* Level label and number */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-blue-500 tracking-widest mb-1">LEVEL</span>
            <div className="rounded-full bg-gradient-to-r from-blue-500 to-emerald-400 shadow-lg px-8 py-2 flex items-center justify-center min-w-[80px]">
              <span className="text-3xl font-extrabold text-white drop-shadow">{level + 1}</span>
            </div>
          </div>
          {/* Home button */}
          <button
            onClick={onHome}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg text-blue-500 text-3xl hover:bg-blue-50 hover:scale-110 transition-all border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-2"
            title="Home"
          >
            <MdHome size={32} />
          </button>
        </div>
        <p className="text-blue-700 text-xs sm:text-sm mb-6 text-center max-w-xs mx-auto">
          {phase === 'memorize'
            ? `Memorize the order of the glowing circles. Press Next to advance.`
            : `Click the circles in the memorized order. Level ${level + 1} of ${LEVELS.length}.`}
        </p>
        <RandomCircleBoard
          phase={phase}
          gridSize={gridSize}
          sequence={sequence}
          showIndex={showIndex}
          recallIndex={recallIndex}
          feedback={feedback}
          handleCircleClick={handleCircleClick}
          hintIndex={hintIndex}
          level={level}
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
        <div className="text-emerald-700 text-xs sm:text-sm font-medium mt-4 text-center w-full">
          {phase === 'memorize'
            ? `Progress: ${showIndex + 1} / ${sequence.length}`
            : `Recall: ${recallIndex} / ${sequence.length}`}
        </div>
        <FeedbackMessage gameState={gameState} feedback={feedback} level={level} totalLevels={LEVELS.length} />
        {/* Level navigation buttons */}
        <div className="flex flex-row gap-8 mt-6 w-full justify-center">
          <div className="flex flex-col items-center">
            <button
              onClick={handlePrevLevel}
              className={`w-16 h-16 flex items-center justify-center rounded-full bg-white border-4 border-blue-400 shadow-lg text-3xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={level === 0}
            >
              <MdArrowBack size={36} />
            </button>
            <span className="mt-1 text-sm font-semibold text-slate-700 select-none text-center" style={{lineHeight:'1.1'}}>
              Previous
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={handleNextLevel}
              className={`w-16 h-16 flex items-center justify-center rounded-full bg-white border-4 border-blue-400 shadow-lg text-3xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={level === LEVELS.length - 1}
            >
              <MdArrowForward size={36} />
            </button>
            <span className="mt-1 text-sm font-semibold text-slate-700 select-none text-center" style={{lineHeight:'1.1'}}>
              Next
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircleSection;