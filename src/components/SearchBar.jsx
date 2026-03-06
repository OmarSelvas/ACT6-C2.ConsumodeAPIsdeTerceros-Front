'use client';

import { useState, useRef } from 'react';

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(v), 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Buscar juegos... (ej: RPG, action, FIFA)"
        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg text-sm transition-colors"
      >
        Buscar
      </button>
    </form>
  );
}
