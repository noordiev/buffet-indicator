import { type DataPoint } from '../types/data';

export async function fetchBuffettData(): Promise<DataPoint[]> {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Buffett data:', error);
    return [];
  }
}