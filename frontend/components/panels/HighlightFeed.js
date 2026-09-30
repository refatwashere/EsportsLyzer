export default function HighlightFeed({ highlights }) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 h-full">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <span className="text-yellow-400">⚡</span> Live Highlights
      </h3>
      {highlights.length === 0 ? (
        <p className="text-gray-500 text-sm">Event-level data unavailable for this match.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {highlights.map((h, i) => (
            <li
              key={i}
              className="bg-gray-800/50 rounded-lg px-3 py-2 border-l-2 border-yellow-500"
            >
              {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
