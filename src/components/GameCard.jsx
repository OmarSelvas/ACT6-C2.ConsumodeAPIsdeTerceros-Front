'use client';

export default function GameCard({ game }) {
  const { name, coverImage, rating, genres = [], platforms = [], releaseDate } = game;

  const safeRating = typeof rating === 'number' && !isNaN(rating) ? Math.round(rating) : null;
  const ratingColor = safeRating >= 80 ? 'text-green-400' : safeRating >= 60 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/30 flex flex-col">
      {/* Cover */}
      <div className="relative bg-gray-800" style={{aspectRatio:'16/9'}}>
        {coverImage ? (
          <img src={coverImage} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🎮</div>
        )}
        {safeRating !== null && (
          <div className={`absolute top-2 right-2 bg-gray-900/90 backdrop-blur rounded-lg px-2 py-1 text-sm font-bold ${ratingColor}`}>
            {safeRating}
          </div>
        )}
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
