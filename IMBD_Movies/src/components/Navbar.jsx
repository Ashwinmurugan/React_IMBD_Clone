import React from 'react'
import { Link } from 'react-router-dom'
import movielogo from '../assets/movielogo.jpeg'
function Navbar() {
  return (
    <div className='flex border space-x-8 items-center pl-4 py-3'>
        <img className="w-[75px] bg-opacity-100	"src={movielogo} alt="" />

        {/* <a href="/" className='text-purple-500 text-2xl font-bold  '>Movies</a> */}
        {/* <a href="/watchlist" className='text-purple-500 text-2xl font-bold'>Watchlist</a> */}
        {/* THESE A-ANCHOR TAGE WILL SLOW DOWN THW SITE SO WE USE <Link>  WHICH IS FROM REACT-ROUTER-DOM*/}

        <Link  to="/" className='text-purple-500 text-2xl font-bold  '>Movies</Link>
        <Link to="/watchlist" className='text-purple-500 text-2xl font-bold'>Watchlist</Link>


    </div>
  )
}

export default Navbar