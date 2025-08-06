import { useState, useEffect } from 'react';
import Chart from './components/Chart';
import type { ChartData } from './components/Chart';

function App() {
  const [charts, setCharts] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setCharts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Chart Visualization</h1>
      <div className="space-y-8">
        {charts.map((chart, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <Chart chartData={chart} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;