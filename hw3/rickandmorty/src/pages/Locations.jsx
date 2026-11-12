import { useEffect, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/location';

const checkResponse = (res) => {
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetch(API_URL)
      .then(checkResponse)
      .then((firstPage) => {
        
        const ids = Array.from(
          { length: firstPage.info.count },
          (_, i) => i + 1,
        ).join(',');
        return fetch(`${API_URL}/${ids}`);
      })
      .then(checkResponse)
      .then((data) => setLocations(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  
  const typeCounts = locations.reduce((counts, location) => {
    const type = location.type || 'Unknown';
    return { ...counts, [type]: (counts[type] || 0) + 1 };
  }, {});

  const sortedTypes = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <h1>Locations by Type</h1>
      <p>Total locations: {locations.length}</p>
      <ul>
        {sortedTypes.map(([type, count]) => (
          <li key={type}>
            {type}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
}