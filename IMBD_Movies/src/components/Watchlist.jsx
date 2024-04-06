import React, { useEffect, useState } from "react";
import  genreids from '../Util/genre';

export default function Watchlist({ watchlist, setwatchlist , handleRemoveFromWatchlist}) {
  const [search, setSearch] = useState("");
  // option of genre
  const[genreList,setGenreList]=useState(['All Genres'])
  // state for colot of genre
  const [currentGenre , setCurrGenre] =useState("All Genre")

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // color of genre
  let handleFilter=(genre)=>{
    setCurrGenre(genre)
  }

  // sort function
  let sortIncreasing = () => {
    const sortedIncreasing = [...watchlist].sort(
      (movieA, movieB) => movieA.vote_average - movieB.vote_average
    );
    setwatchlist(sortedIncreasing);
  };

  let sortDecreasing = () => {
    const sortedDecreasing = [...watchlist].sort(
      (movieA, movieB) => movieB.vote_average - movieA.vote_average
    );
    setwatchlist(sortedDecreasing);
  };

  let sortPopularityIncreasing = () => {
    const sortedIncreasing = [...watchlist].sort(
      (movieA, movieB) => movieA.popularity - movieB.popularity
    );
    setwatchlist(sortedIncreasing);
  };

  let sortPopularityDecreasing = () => {
    const sortedDecreasing = [...watchlist].sort(
      (movieA, movieB) => movieB.popularity - movieA.popularity
    );
    setwatchlist(sortedDecreasing);
  };
  // genre
  useEffect(()=>{
    let temp=watchlist.map((movieObj)=>{
      return genreids[movieObj.genre_ids[0]]
    })
    temp=new Set(temp)
    console.log((temp));
    setGenreList(['All Genres',...temp]);
},[watchlist])//whenever change made in watchlist


  return (
    <>
      {/* jouneys */}
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre)=>{
          return <div onClick={()=>handleFilter(genre)} className={ currentGenre ===genre? "flex justify-center h-[3rem] w-[9rem] items-center bg-blue-400 rounded-md text-white font-bold cursor-pointer mx-4" :"flex justify-center h-[3rem] w-[9rem] items-center bg-gray-400 rounded-md text-white font-bold cursor-pointer mx-4" }>
          {genre}
        </div>
       
        })}
       
       </div>

      <div className="flex justify-center my-4 ">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-300 outline-none px-4 rounded-md"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-300 m-8">
        <table className="w-full text-gray-700 text-center">
          <thead className="border-b-2 ">
            <tr>
              <th>Movie Name</th>
              <th>
                <div className="flex justify-center">
                  <div
                    onClick={sortIncreasing}
                    className="p-2 cursor-pointer flex items-center"
                  >
                    <i className="fa-solid fa-arrow-up p-2"></i>
                    Ratings
                  </div>
                  <div
                    onClick={sortDecreasing}
                    className="p-2 cursor-pointer flex items-center"
                  >
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
              </th>
              <th>
                <div className="flex justify-center">
                  <div
                    onClick={sortPopularityIncreasing}
                    className="p-2 cursor-pointer flex items-center"
                  >
                    <i className="fa-solid fa-arrow-up p-2"></i>
                    Popularity
                  </div>
                  <div
                    onClick={sortPopularityDecreasing}
                    className="p-2 cursor-pointer flex items-center"
                  >
                    <i className="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
              </th>
              <th>Genre</th>
              
            </tr>
          </thead>
          <tbody>
            {watchlist &&
              watchlist.filter((movieObj)=>{
                if(currentGenre=='All Genres'){
                  return true;
                }
                else{
                  return genreids[movieObj.genre_ids[0]]==currentGenre;
                }
              })
                .filter((movieObj) =>
                  movieObj.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((movieObj) => (
                  <tr className="border-b-2" key={movieObj.id}>
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[7rem] w-[11rem] "
                        src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                        alt={movieObj.original_title}
                      />
                      <div className="mx-10 font-semibold text-base">
                        {movieObj.original_title}
                      </div>
                    </td>

                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td onClick={()=>handleRemoveFromWatchlist(movieObj)} className="text-red-800">Delete</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
