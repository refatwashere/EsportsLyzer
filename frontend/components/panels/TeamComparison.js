export default function TeamComparison({ teams }) {
  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
      <h3 className="font-semibold mb-4">Team Comparison</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teams.length === 0 ? (
          <p className="text-gray-500 text-sm col-span-2">No team data</p>
        ) : (
          teams.map((t, i) => (
            <div
              key={i}
              className={`rounded-lg p-4 border ${
                i === 0
                  ? 'border-blue-500/40 bg-blue-500/5'
                  : 'border-red-500/40 bg-red-500/5'
              }`}
            >
              <h4 className="text-lg font-bold mb-3">{t.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">ADR</span>
                  <span className="font-medium">{t.adr ?? '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Economy</span>
                  <span className="font-medium">
                    {t.economy == null ? '—' : `$${t.economy}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Utility</span>
                  <span className="font-medium">{t.utility ?? '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Team Rating</span>
                  <span className="font-medium">{t.rating ?? '—'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Map Win %</span>
                  <span className="font-medium">
                    {t.winRate == null ? '—' : `${(t.winRate * 100).toFixed(1)}%`}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
