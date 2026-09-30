'use client';

export default function PossessionBar({ home, away, homeName, awayName }) {
  const total = (home || 0) + (away || 0) || 1;
  const homePct = Math.round(((home || 0) / total) * 100);
  const awayPct = 100 - homePct;

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
      <h3 className="font-semibold mb-4">Possession</h3>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-green-400 font-medium">
          {homeName || 'Home'} {homePct}%
        </span>
        <span className="text-orange-400 font-medium">
          {awayPct}% {awayName || 'Away'}
        </span>
      </div>
      <div className="h-4 rounded-full overflow-hidden flex bg-gray-800">
        <div
          className="bg-green-500 transition-all duration-500"
          style={{ width: `${homePct}%` }}
        />
        <div
          className="bg-orange-500 transition-all duration-500"
          style={{ width: `${awayPct}%` }}
        />
      </div>
    </div>
  );
}
