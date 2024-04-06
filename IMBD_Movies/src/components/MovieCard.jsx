import React from "react";

function MovieCard({
  poster_path,
  name,
  handleAddtoWatchlist,
  movieObj,
  handleRemoveFromWatchlist,
  watchlist,
}) {
  // function doesContain(movieObj) {
  //   for (let index = 0; index < watchlist.length; index++) {
  //     if (watchlist[index].id === movieObj.id) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  function doesContain(movieObj) {
    if (watchlist && Array.isArray(watchlist)) { // Check if watchlist is not null and is an array
      for (let index = 0; index < watchlist.length; index++) {
        if (watchlist[index].id === movieObj.id) {
          return true;
        }
      }
    }
    return false;
  }
  
  const backgroundImageStyle = poster_path
    ? {
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }
    : {};

  return (
    <div
      className="relative h-[40vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer"
      style={backgroundImageStyle}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchlist(movieObj)} // Pass a function reference
          className="absolute top-0 right-0 m-2 bg-gray-800 bg-opacity-75 text-white font-bold text-2xl rounded-md p-1"
        >
          &#128545;{" "}
        </div>
      ) : (
        <div
          onClick={() => {
            handleAddtoWatchlist(movieObj);
          }}
          className="absolute top-0 right-0 m-2 bg-gray-800 bg-opacity-75 text-white font-bold text-2xl rounded-md p-1"
        >
          &#128526;
        </div>
      )}

      {/* Title div */}
      <div className="absolute bottom-0 w-full bg-gray-900 bg-opacity-60 text-white font-bold text-xl text-center py-2">
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
