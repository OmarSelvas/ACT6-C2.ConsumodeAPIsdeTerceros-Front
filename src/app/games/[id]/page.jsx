'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getGameById, getSimilarGames } from '@/services/gameService';

// ── Skeleton loader ───────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full h-72 bg-gray-800" />
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-5">
        <div className="h-10 bg-gray-800 rounded w-2/3" />
        <div className="flex gap-2">
          {[1,2,3].map(i => <div key={i} className="h-6 w-20 bg-gray-800 rounded-full" />)}
        </div>
        <div className="h-4 bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-800 rounded w-5/6" />
        <div className="h-4 bg-gray-800 rounded w-4/6" />
      </div>
    </div>
  );
}

// ── Rating ring ───────────────────────────────────────────────
function RatingRing({ value }) {
  if (value === null || value === undefined || isNaN(value)) return null;
  const score = Math.round(value);
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444';
  const pct = Math.min(score, 100) / 100;
  const r = 28, circ = 2 * Math.PI * r;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" className="-rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#1f2937" strokeWidth="6" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-2xl font-black -mt-12" style={{ color }}>{score}</span>
      <span className="text-xs text-gray-500 mt-6">Score</span>
    </div>
  );
}

// ── Similar game card ─────────────────────────────────────────
function SimilarCard({ game, onClick }) {
  const safeRating = typeof game.rating === 'number' && !isNaN(game.rating) ? Math.round(game.rating) : null;
  return (
    <div
      onClick={() => onClick(game.id)}
      className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/20 flex flex-col"
    >
      <div className="bg-gray-800 relative" style={{ aspectRatio: '16/9' }}>
        {game.coverImage
          ? <img src={game.coverImage} alt={game.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-3xl">🎮</div>
        }
        {safeRating !== null && (
          <div className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-md bg-black/70 ${safeRating >= 80 ? 'text-green-400' : safeRating >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
            {safeRating}
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-white line-clamp-2 leading-snug">{game.name}</p>
        {game.genres?.[0] && (
          <p className="text-xs text-gray-500 mt-1">{game.genres[0]}</p>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function GameDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [game, setGame]       = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [gameRes, simRes] = await Promise.all([
          getGameById(id),
          getSimilarGames(id).catch(() => ({ data: [] })),
        ]);
        setGame(gameRes.data);
        setSimilar(simRes.data || []);
      } catch (err) {
        setError(err.message || 'No se pudo cargar el juego.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // ── LOADING ──────────────────────────────────────────────
  if (loading) return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm mb-4">
          ← Volver
        </button>
      </div>
      <DetailSkeleton />
    </main>
  );

  // ── ERROR ────────────────────────────────────────────────
  if (error) return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-4">
      <div className="text-6xl">⚠️</div>
      <h2 className="text-xl font-bold text-red-400">Error al cargar el juego</h2>
      <p className="text-gray-400">{error}</p>
      <button onClick={() => router.back()} className="px-6 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors">
        ← Volver
      </button>
    </main>
  );

  if (!game) return null;

  const safeRating = typeof game.rating === 'number' && !isNaN(game.rating) ? game.rating : null;

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* ── HERO ──────────────────────────────────────────── */}
      <div className="relative w-full h-80 overflow-hidden">
        {game.coverImage
          ? <img src={game.coverImage} alt={game.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full bg-gray-800 flex items-center justify-center text-8xl">🎮</div>
        }
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

        {/* back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 flex items-center gap-2 bg-black/50 hover:bg-black/80 backdrop-blur px-4 py-2 rounded-full text-sm text-white transition-all"
        >
          ← Volver
        </button>
      </div>

      {/* ── CONTENT ───────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 -mt-20 relative z-10">

        {/* Title row */}
        <div className="flex items-end gap-6 mb-6">
          <div className="flex-1">
            <h1 className="text-4xl font-black text-white leading-tight drop-shadow-lg">
              {game.name}
            </h1>
            {game.releaseDate && (
              <p className="text-gray-400 text-sm mt-1">
                {new Date(game.releaseDate).getFullYear()}
                {game.developer && <span> · {game.developer}</span>}
              </p>
            )}
          </div>
          <RatingRing value={safeRating} />
        </div>

        {/* Genres */}
        {game.genres?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {game.genres.map(g => (
              <span key={g} className="px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded-full font-medium">
                {g}
              </span>
            ))}
          </div>
        )}

        {/* Platforms */}
        {game.platforms?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {game.platforms.map(p => (
              <span key={p} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                {p}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        {game.description && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Descripción</h2>
            <p className="text-gray-300 leading-relaxed text-sm max-w-3xl">
              {game.description}
            </p>
          </div>
        )}

        {/* Info grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: 'Año', value: game.releaseDate ? new Date(game.releaseDate).getFullYear() : '—' },
            { label: 'Plataformas', value: game.platforms?.length > 0 ? game.platforms.length + ' plataformas' : '—' },
            { label: 'Géneros', value: game.genres?.length > 0 ? game.genres.length + ' géneros' : '—' },
            { label: 'Score', value: safeRating !== null ? Math.round(safeRating) + ' / 100' : '—' },
          ].map(item => (
            <div key={item.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-white font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Similar games */}
        {similar.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
              Juegos similares
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {similar.slice(0, 10).map(s => (
                <SimilarCard key={s.id} game={s} onClick={(newId) => router.push(`/games/${newId}`)} />
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
