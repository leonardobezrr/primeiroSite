import { useState } from 'react';

export default function Movies({ initialData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(initialData);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      console.log('Digite uma palavra-chave válida antes de pesquisar.');
      return;
    }
  
    const res = await fetch(`http://www.omdbapi.com/?apikey=4e779fd4&s=${searchTerm}`);
    const newData = await res.json();
  
    if (newData.Search && newData.Search.length > 0) {
      setData(newData);
    } else {
      console.log('Nenhum resultado encontrado para a pesquisa.');
    }
  };
  
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Digite a palavra-chave de pesquisa"
      />
      <button onClick={handleSearch}>Pesquisar</button>

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Ano</th>
            <th>Poster</th>
          </tr>
        </thead>
        <tbody>
          {data.Search.map((movie, i) => (
            <tr key={i}>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
              <td>
                <img src={movie.Poster} width={100} alt={`Poster ${movie.Title}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://www.omdbapi.com/?apikey=4e779fd4&s=one piece`);
  const initialData = await res.json();

  return {
    props: {
      initialData,
    },
  };
}
