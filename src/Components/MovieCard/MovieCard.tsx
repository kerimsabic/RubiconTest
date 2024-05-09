import React from 'react'
import MovieCardCSS from './MovieCard.module.css'


type Props = {
  title: string;
  backdrop_path: string;
  poster_path: string;

}

const MovieCard = ({ title, backdrop_path, poster_path }: Props) => {


  return (
    <>

      
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path || backdrop_path}.jpg`} alt={title} />
        <div className={MovieCardCSS.info}>
          <h4>{title}</h4>

        </div>
      


      
    </>

  )
}

export default MovieCard