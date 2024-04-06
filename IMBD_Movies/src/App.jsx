import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";

export default function App() {

  // add to watchlist
  let[watchlist,setwatchlist]=useState([]);

  let handleAddtoWatchlist = (movieObj)=>{
    let newWatchList = [...watchlist,movieObj]
    localStorage.setItem('moviesApp',JSON.stringify(newWatchList))//convet to obj to jsoon strigfly
    // store the history of watchlist in localstroge
    setwatchlist(newWatchList);
    console.log(newWatchList);

  }

  let handleRemoveFromWatchlist=(movieObj)=>{
    let filteredWatchlist = watchlist.filter((movie)=>{
      return movie.id != movieObj.id
    })
    setwatchlist(filteredWatchlist);
    localStorage.setItem('moviesApp',JSON.stringify(filteredWatchlist)) 
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem('moviesApp');
    if (moviesFromLocalStorage) {
      setwatchlist(JSON.parse(moviesFromLocalStorage));
    }
  }, []); // Add an empty dependency array to run the effect only once on component mount
  

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
  <Route
    path="/"
    element={
      <>
        <Movies handleAddtoWatchlist={handleAddtoWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchlist={watchlist}/> 
      </>
    }
  />
  <Route path="/watchlist" element={<Watchlist watchlist={watchlist} setwatchlist={setwatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist}/> }  />
</Routes>

      </BrowserRouter>
    </>
  );
}
