import { type TimeRange } from '../types/data';
import { cn } from '../utils/cn';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

const ranges: { label: string; value: TimeRange }[] = [
  { label: '1M', value: '1M' },
  { label: '1Y', value: '1Y' },
  { label: '5Y', value: '5Y' },
  { label: '10Y', value: '10Y' },
  { label: 'ALL', value: 'ALL' },
];

export function TimeRangeSelector({ selectedRange, onRangeChange }: TimeRangeSelectorProps) {
  return (
    <div className="flex gap-2 mb-4">
      {ranges.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onRangeChange(value)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-colors',
            selectedRange === value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}