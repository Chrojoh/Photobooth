import React from 'react';
import type { StyleOption } from '../types';

interface StyleSelectorProps {
  options: StyleOption[];
  selected: StyleOption;
  onSelect: (option: StyleOption) => void;
}

export function StyleSelector({ options, selected, onSelect }: StyleSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-300 mb-3">Choose a Style</h3>
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