'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TennisMomentumChart({ data }) {
  if (!data || !data.points) {
    return <p className="text-gray-500 text-sm">No point data yet</p>;
  }

  const chartData = {
    labels: data.points.map((_, i) => `P${i + 1}`),
    datasets: [
      {
        label: data.playerA || 'Player A',
        data: data.playerAMomentum,
        borderColor: '#3b82f6',
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: data.playerB || 'Player B',
        data: data.playerBMomentum,
        borderColor: '#ef4444',
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top', labels: { color: '#d1d5db' } },
      title: {
        display: true,
        text: 'Point-by-Point Momentum',
        color: '#e5e7eb',
        font: { size: 14 },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
        title: { display: true, text: 'Momentum %', color: '#9ca3af' },
      },
      x: {
        ticks: { color: '#9ca3af', maxTicksLimit: 15 },
        grid: { color: 'rgba(75, 85, 99, 0.2)' },
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={chartData} options={options} />
    </div>
  );
}
