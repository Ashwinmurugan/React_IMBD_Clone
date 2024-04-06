import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";
import Banner from "./Banner"; // Import the Banner component

export default function Movies({ handleAddtoWatchlist, handleRemoveFromWatchlist, watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setpageNo] = useState(1);

  const handleprev = () => {
    if (pageNo === 1) {
      setpageNo(1);
    } else {
      setpageNo(pageNo - 1);
    }
  };

  const handlenext = () => {
    setpageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get()//add your movies url for 
      .then(function (res) {
        setMovies(res.data.results);
      })
      .catch(function (error) {
        console.error("Error fetching movies:", error);
      });
  }, [pageNo]);
  const bannerMovie = movies.length > 0 ? movies[0] : null;


  return (
    <div className="p-4">
    {bannerMovie && <Banner movie={bannerMovie} />} {/* Render the Banner component */}
  
    <div className="p-4">
      <div className="text-2xl font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-5">
        {movies.map((movieObj) => (
          <MovieCard
            key={movieObj.id}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title}
            handleAddtoWatchlist={handleAddtoWatchlist}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            movieObj={movieObj}
            watchlist={watchlist}
          />
        ))}
      </div>
      <Pagination
        handleprev={handleprev}
        handlenext={handlenext}
        pageNo={pageNo}
      />
    </div>
    </div>
  );
}
