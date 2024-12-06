import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { type DataPoint } from '../types/data';
import { formatDate, formatPercent } from '../utils/formatters';

interface BuffettChartProps {
  data: DataPoint[];
}

export function BuffettChart({ data }: BuffettChartProps) {
  return (
    <div className="w-full h-[400px] bg-white rounded-xl p-4 shadow-lg">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRatio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fill: '#6B7280' }}
          />
          <YAxis
            tickFormatter={value => formatPercent(value)}
            tick={{ fill: '#6B7280' }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const data = payload[0].payload as DataPoint;
              return (
                <div className="bg-white p-4 shadow-lg rounded-lg border">
                  <p className="font-medium">{formatDate(data.date)}</p>
                  <p className="text-blue-600">
                    Ratio: {formatPercent(data.ratio)}
                  </p>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="ratio"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorRatio)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}