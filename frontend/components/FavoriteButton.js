'use client';

export default function FavoriteButton({ isFav, onToggle, size = 'md' }) {
  const sizeClass = size === 'sm' ? 'text-sm px-2 py-1' : 'text-base px-3 py-1.5';

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
      className={`
        rounded-lg font-medium transition flex items-center gap-1
        ${sizeClass}
        ${
          isFav
            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 hover:bg-yellow-500/30'
            : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-yellow-400'
        }
      `}
    >
      <span>{isFav ? '★' : '☆'}</span>
      {size !== 'sm' && <span>{isFav ? 'Favorited' : 'Favorite'}</span>}
    </button>
  );
}
