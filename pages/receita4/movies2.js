import React, { useState } from "react";
import useSWR from "swr";
import MovieDetails from "./moviesDetails"; 

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export default function Movies2() {
  const { data, error } = useSWR(
    "http://www.omdbapi.com/?apikey=4e779fd4&s=cafe",
    fetcher
  );

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (error) return <div>Falha na reprodução...</div>;
  if (!data) return <div>Carregando...</div>;

  if (selectedMovie) {
    return <MovieDetails imdbID={selectedMovie.imdbID} />;
  }

  return (
    <div>
      {data.Search.map((m) => (
        <div key={m.imdbID}>
          <p></p>
          <img src={m.Poster} alt={m.Title} width="100px"></img>
          <p></p>
          <a
            href=""
            onClick={(e) => {
            e.preventDefault();
            setSelectedMovie(m);
            }}
          >
            {m.Title} --- {m.Year}
          </a>
        </div>
      ))}
    </div>
  );
}
