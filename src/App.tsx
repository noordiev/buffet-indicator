import { useState } from 'react';
import { BuffettChart } from './components/BuffettChart';
import { Description } from './components/Description';
import { TimeRangeSelector } from './components/TimeRangeSelector';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useBuffettData } from './hooks/useBuffettData';
import { type TimeRange } from './types/data';

function App() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1Y');
  const { data, loading, error } = useBuffettData();

  // Filter data based on selected time range
  const getFilteredData = () => {
    const now = new Date();
    const monthsToSubtract = {
      '1M': 1,
      '1Y': 12,
      '5Y': 60,
      '10Y': 120,
      'ALL': Infinity,
    }[timeRange];

    const cutoffDate = new Date(now.setMonth(now.getMonth() - monthsToSubtract));
    return data.filter(d => new Date(d.date) >= cutoffDate);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Buffett Indicator
        </h1>
        
        <TimeRangeSelector
          selectedRange={timeRange}
          onRangeChange={setTimeRange}
        />
        
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <BuffettChart data={getFilteredData()} />
        )}
        
        <Description />
      </div>
    </div>
  );
}

export default App;