import {useEffect, useState } from 'react';

const ids = Array.from({length: 100 }, (_, i) => i + 1). join(',');

export default function Characters(){
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

  return (
    <div>
      <h1>First 100 Characters</h1>
      <div className="grid">
        {characters.map((character) => (
          <div key={character.id} className="card">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}