export default function RoundTimeline({ timeline, teams = [] }) {
  const firstTeamName = teams[0]?.name;
  const secondTeamName = teams[1]?.name;

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
      <h3 className="font-semibold mb-4">Round Timeline</h3>
      <div className="flex overflow-x-auto gap-2 pb-2">
        {timeline.length === 0 ? (
          <p className="text-gray-500 text-sm">Round-level data unavailable for this match.</p>
        ) : (
          timeline.map((round) => (
            <div
              key={round.round}
              title={
                round.isPistol
                  ? `R${round.round}: ${round.winner} (Pistol)`
                  : round.clutch
                  ? `R${round.round}: ${round.clutch}`
                  : `R${round.round}: ${round.winner}`
              }
              className={`
                flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                text-xs font-bold cursor-default transition
                ${
                  round.winner === firstTeamName
                    ? 'bg-blue-500/80 text-white'
                    : 'bg-red-500/80 text-white'
                }
                ${round.isPistol ? 'ring-2 ring-yellow-400' : ''}
                ${round.clutch ? 'ring-2 ring-purple-400' : ''}
              `}
            >
              {round.round}
            </div>
          ))
        )}
      </div>
      <div className="mt-3 flex gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-500" /> {firstTeamName || 'Team 1'}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-500" /> {secondTeamName || 'Team 2'}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full ring-2 ring-yellow-400 bg-gray-700" /> Pistol
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full ring-2 ring-purple-400 bg-gray-700" /> Clutch
        </span>
      </div>
    </div>
  );
}
