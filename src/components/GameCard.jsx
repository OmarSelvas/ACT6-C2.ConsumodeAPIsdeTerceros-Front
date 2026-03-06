'use client';

import { useRouter } from 'next/navigation';

export default function GameCard({ game }) {
  const router = useRouter();
  const { id, name, coverImage, rating, genres = [], platforms = [], releaseDate } = game;

  const safeRating = typeof rating === 'number' && !isNaN(rating) ? Math.round(rating) : null;
  const ratingColor = safeRating >= 80 ? 'text-green-400' : safeRating >= 60 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div
      onClick={() => router.push(`/games/${id}`)}
      className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/30 flex flex-col group"
    >
      {/* Cover */}
      <div className="relative bg-gray-800 overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {coverImage
          ? <img src={coverImage} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          : <div className="w-full h-full flex items-center justify-center text-4xl">🎮</div>
        }
        {safeRating !== null && (
          <div className={`absolute top-2 right-2 bg-gray-900/90 backdrop-blur rounded-lg px-2 py-1 text-sm font-bold ${ratingColor}`}>
            {safeRating}
          </div>
        )}
        {/* hover overlay */}
        <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-colors duration-200 flex items-center justify-center">
          <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-3 py-1 rounded-full">
            Ver detalle →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-white text-sm leading-snug line-clamp-2">{name}</h3>

        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genres.slice(0, 3).map((g) => (
              <span key={g} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-300 rounded-full">{g}</span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
          <span>{platforms[0] || 'Multi-platform'}</span>
          {releaseDate && <span>{new Date(releaseDate).getFullYear()}</span>}
        </div>
      </div>
    </div>
  );
}
