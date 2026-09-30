'use client';

export default function SportStatsPanel({ sport, stats }) {
  if (!stats) return null;

  if (sport === 'football') {
    return (
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="font-semibold mb-4">Key Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Shots</p>
            <p className="text-lg font-bold">
              {stats.shots?.home ?? '-'} – {stats.shots?.away ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Shots on Target</p>
            <p className="text-lg font-bold">
              {stats.shotsOnTarget?.home ?? '-'} –{' '}
              {stats.shotsOnTarget?.away ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Corners</p>
            <p className="text-lg font-bold">
              {stats.corners?.home ?? '-'} – {stats.corners?.away ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Fouls</p>
            <p className="text-lg font-bold">
              {stats.fouls?.home ?? '-'} – {stats.fouls?.away ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">xG</p>
            <p className="text-lg font-bold text-yellow-400">
              {stats.xg?.home?.toFixed?.(2) ?? '-'} –{' '}
              {stats.xg?.away?.toFixed?.(2) ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Dangerous Attacks</p>
            <p className="text-lg font-bold">
              {stats.dangerousAttacks?.home ?? '-'} –{' '}
              {stats.dangerousAttacks?.away ?? '-'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (sport === 'tennis') {
    return (
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
        <h3 className="font-semibold mb-4">Match Stats</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Aces</p>
            <p className="text-lg font-bold">
              {stats.aces?.a ?? '-'} – {stats.aces?.b ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Double Faults</p>
            <p className="text-lg font-bold">
              {stats.doubleFaults?.a ?? '-'} – {stats.doubleFaults?.b ?? '-'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">1st Serve %</p>
            <p className="text-lg font-bold">
              {stats.firstServePct?.a ?? '-'}% – {stats.firstServePct?.b ?? '-'}%
            </p>
          </div>
          <div>
            <p className="text-gray-500">Break Points Won</p>
            <p className="text-lg font-bold">
              {stats.breakPoints?.a ?? '-'} – {stats.breakPoints?.b ?? '-'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
