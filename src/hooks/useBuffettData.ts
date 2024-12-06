import { useState, useEffect } from 'react';
import { type DataPoint } from '../types/data';
import { fetchBuffettData } from '../services/dataService';

export function useBuffettData() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchBuffettData();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { data, loading, error };
}