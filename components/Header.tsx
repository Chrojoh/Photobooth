
import React from 'react';

export function Header() {
  return (
    <header className="text-center p-6 border-b border-gray-700/50">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
        Pet Portrait AI
      </h1>
      <p className="mt-2 text-lg text-gray-400">Turn your pet's photo into a masterpiece.</p>
    </header>
  );
}
