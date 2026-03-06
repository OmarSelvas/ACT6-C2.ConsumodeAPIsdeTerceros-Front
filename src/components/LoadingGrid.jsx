export default function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 flex flex-col animate-pulse">
          <div className="bg-gray-800" style={{aspectRatio:'16/9'}} />
          <div className="p-3 flex flex-col gap-2">
            <div className="h-4 bg-gray-800 rounded w-3/4" />
            <div className="h-3 bg-gray-800 rounded w-1/2" />
            <div className="flex gap-1 mt-1">
              <div className="h-5 w-14 bg-gray-800 rounded-full" />
              <div className="h-5 w-16 bg-gray-800 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
