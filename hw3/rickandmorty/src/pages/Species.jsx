import { useEffect, useState } from 'react';

const ids = Array.from({ length: 100 }, (_, i) => i + 1).join(',');

export default function Species() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${ids}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => setCharacters(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  const speciesGroups = characters.reduce((groups, character) => {
    const species = character.species || 'Unknown';
    return {
      ...groups,
      [species]: [...(groups[species] || []), character.name],
    };
  }, {});

  // Sort so the species with the most characters come first
  const sortedSpecies = Object.entries(speciesGroups)
    .sort((a, b) => b[1].length - a[1].length);

  return (
    <div>
      <h1>Characters by Species</h1>
      <p>Based on the first 100 characters.</p>
      {sortedSpecies.map(([species, names]) => (
        <div key={species} className="card">
          <h2>
            {species} ({names.length})
          </h2>
          <p>{names.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}