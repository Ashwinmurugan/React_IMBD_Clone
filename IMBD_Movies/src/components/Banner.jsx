import React from 'react';

export default function Banner({ movie }) {
  return (
    <div className='h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end ' style={{backgroundImage : `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`}}>
      <div className='text-white font-bold text-xl text-center w-full bg-gray-600/60  my-3'>{movie.original_title}</div>
    </div>
  );
}
