import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#22c55e', '#eab308', '#ef4444']; // green, yellow, red

export default function SentimentPieChart({ data }: { data: { bullish: number; neutral: number; bearish: number } }) {
  if (!data) return null;
  const chartData = [
    { name: 'Bullish', value: data.bullish },
    { name: 'Neutral', value: data.neutral },
    { name: 'Bearish', value: data.bearish },
  ];
  return (
    <ResponsiveContainer width={120} height={120}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={55}
          fill="#8884d8"
          dataKey="value"
          label={({ name }) => name}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
} 