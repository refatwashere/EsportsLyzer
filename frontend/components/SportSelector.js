'use client';

export default function SportSelector({ sport, setSport }) {
  const options = [
    { id: 'esports', label: 'Esports (CS2)', color: 'bg-blue-600' },
    { id: 'football', label: 'Football', color: 'bg-green-600' },
    { id: 'tennis', label: 'Tennis', color: 'bg-red-600' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => setSport(o.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            sport === o.id
              ? `${o.color} text-white`
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
