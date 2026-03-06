'use client';

import { useState, useEffect, useCallback } from 'react';
import { getGames } from '@/services/gameService';
import GameCard from '@/components/GameCard';
import SearchBar from '@/components/SearchBar';
import LoadingGrid from '@/components/LoadingGrid';

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const fetchGames = useCallback(async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getGames({ query: searchQuery || '*', limit: 24 });
      setGames(result.data || []);
    } catch (err) {
      setError(err.message || 'No se pudo conectar con el servidor.');
      setGames([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchGames(''); }, [fetchGames]);

  const handleSearch = (q) => { setQuery(q); fetchGames(q); };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <h1 className="text-2xl font-bold text-green-400 whitespace-nowrap">Arcade</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        {query && (
          <p className="text-gray-400 mb-4 text-sm">
            Resultados para: <span className="text-white font-semibold">"{query}"</span>
          </p>
        )}

        {/* LOADING */}
        {loading && <LoadingGrid />}

        {/* ERROR */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="text-6xl">⚠️</div>
            <h2 className="text-xl font-bold text-red-400">Error de conexión</h2>
            <p className="text-gray-400 text-center max-w-md">{error}</p>
            <button
              onClick={() => fetchGames(query)}
              className="mt-2 px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && games.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="text-6xl">👌🏽</div>
            <p className="text-gray-400">No se encontraron juegos para "{query}"</p>
          </div>
        )}

        {/* SUCCESS */}
        {!loading && !error && games.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
