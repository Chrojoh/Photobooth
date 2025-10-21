import React from 'react';
import type { BackdropOption } from '../types';

interface BackdropSelectorProps {
  options: BackdropOption[];
  selected: BackdropOption;
  onSelect: (option: BackdropOption) => void;
}

export function BackdropSelector({ options, selected, onSelect }: BackdropSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-300 mb-3">Choose a Backdrop</h3>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option)}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 text-center ${
              selected.id === option.id
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}