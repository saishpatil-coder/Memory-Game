import React from "react";
import { MdArrowBack, MdArrowForward, MdLightbulb, MdRefresh, MdNavigateNext } from "react-icons/md";

const controls = [
  {
    key: 'prev',
    icon: <span className="text-blue-500"><MdArrowBack size={32} /></span>,
    label: 'Prev',
    show: ({ phase, gameState, level }) => phase === 'recall' && level > 0,
    handler: 'handlePrevLevel',
    gradient: 'from-blue-400 to-blue-600',
    disabled: ({ level }) => level <= 0,
  },
  {
    key: 'next',
    icon: <span className="text-blue-500"><MdArrowForward size={32} /></span>,
    label: 'Next',
    show: ({ phase, gameState, level, maxLevel }) => phase === 'recall' && level < maxLevel,
    handler: 'handleNextLevel',
    gradient: 'from-blue-400 to-blue-600',
    disabled: ({ level, maxLevel }) => level >= maxLevel,
  },
  {
    key: 'hint',
    icon: <span className="text-yellow-400"><MdLightbulb size={32} /></span>,
    label: 'Hint',
    show: ({ phase }) => phase === 'recall',
    handler: 'handleHint',
    gradient: 'from-yellow-400 to-yellow-500',
    disabled: () => false,
  },
  {
    key: 'reset',
    icon: <span className="text-emerald-500"><MdRefresh size={32} /></span>,
    label: 'Reset',
    show: () => true,
    handler: 'handleReset',
    gradient: 'from-emerald-500 to-blue-500',
    disabled: () => false,
  },
  {
    key: 'memorize-next',
    icon: <span className="text-blue-500"><MdNavigateNext size={32} /></span>,
    label: 'Next',
    show: ({ phase, gameState }) => phase === 'memorize' && gameState === 'playing',
    handler: 'handleNext',
    gradient: 'from-blue-500 to-emerald-500',
    disabled: ({ showIndex, sequenceLength }) => showIndex >= sequenceLength,
  },
];

const Controls = ({ phase, gameState, showIndex, sequenceLength, handleNext, handleReset, handleHint, handlePrevLevel, handleNextLevel, level, maxLevel, nextCountdown }) => {
  const handlers = { handleNext, handleReset, handleHint, handlePrevLevel, handleNextLevel };
  return (
    <div className="flex flex-row items-end justify-center gap-5 w-full mt-2">
      {controls.map(ctrl => {
        if (!ctrl.show({ phase, gameState, level, maxLevel })) return null;
        const isDisabled = ctrl.disabled({ showIndex, sequenceLength, level, maxLevel });
        let label = ctrl.label;
        if (ctrl.key === 'memorize-next' && (nextCountdown !== null)) {
          label += ` (${nextCountdown})`;
        }
        return (
          <div key={ctrl.key} className="flex flex-col items-center">
            <button
              onClick={handlers[ctrl.handler]}
              className={`w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-lg text-3xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={isDisabled}
            >
              <span className={`drop-shadow-sm`}>{ctrl.icon}</span>
            </button>
            <span className="mt-1 text-sm font-semibold text-slate-700 select-none text-center" style={{lineHeight:'1.1'}}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Controls; 