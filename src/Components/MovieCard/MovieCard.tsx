import React from 'react'
import MovieCardCSS from './MovieCard.module.css'
import DetailsCSS from './'

type Props = {
  title : string;
  backdrop_path: string;
  poster_path:string;

}

const MovieCard = ({title, backdrop_path, poster_path}: Props) => {

  
  return (
    <>
      <div className={MovieCardCSS.card}>
        <div className={MovieCardCSS.innerCard}>
          <div className={MovieCardCSS.cardImage}>
            <img src={`https://image.tmdb.org/t/p/w500/${backdrop_path ||  poster_path}.jpg`} alt={title} />
          </div>
          <div className={MovieCardCSS.cartTitle}>
          <h2>{title}</h2>
          </div>
            
        </div>
      </div>
    </>

  )
}

export default MovieCard