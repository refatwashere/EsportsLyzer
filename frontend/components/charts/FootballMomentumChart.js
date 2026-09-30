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
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function FootballMomentumChart({ data }) {
  if (!data || !data.minutes) {
    return <p className="text-gray-500 text-sm">No momentum data yet</p>;
  }

  const chartData = {
    labels: data.minutes.map((m) => `${m}'`),
    datasets: [
      {
        label: data.homeName || 'Home',
        data: data.homeMomentum,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
      },
      {
        label: data.awayName || 'Away',
        data: data.awayMomentum,
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.15)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
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
        text: 'Attack Momentum',
        color: '#e5e7eb',
        font: { size: 14 },
      },
    },
    scales: {
      y: {
        min: -100,
        max: 100,
        ticks: { color: '#9ca3af' },
        grid: { color: 'rgba(75, 85, 99, 0.3)' },
        title: { display: true, text: 'Momentum', color: '#9ca3af' },
      },
      x: {
        ticks: { color: '#9ca3af', maxTicksLimit: 12 },
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
