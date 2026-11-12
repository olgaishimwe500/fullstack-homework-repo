import { useEffect, useState } from 'react';

// const ids = Array.from({ length: 100 }, (_, i) => i + 1).join(',');
const getJson = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
  });


export default function Species() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = 'https://rickandmortyapi.com/api/character';
    
    getJson(baseUrl)
      .then((firstPage) => {
        const otherPageNum = Array.from(
          { lenght: firstPage.info.pages - 1 },
          (_, i) => i + 2,
        );
        return Promise.all(
          otherPageNum.map((page) => getJson(`${baseUrl}?page=${page}`)),
        ).then((otherPages) => [firstPage, ...otherPages]);
      })
      .then((pages) => setCharacters(pages.flatMap((page) => page.results)))
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
      <p>Based on all {characters.length} characters.</p>
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