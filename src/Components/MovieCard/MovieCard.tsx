import React from 'react'
import MovieCardCSS from './MovieCard.module.css'
import DetailsCSS from './'

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
      





      {/*  <div className={MovieCardCSS.card}>
        <div className={MovieCardCSS.innerCard}>
          <div className={MovieCardCSS.cardImage}>
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path || backdrop_path}.jpg`} alt={title} />
          </div>
          <div className={MovieCardCSS.cartTitle}>
            <h2>{title}</h2>
          </div>

        </div>
      </div>*/}
    </>

  )
}

export default MovieCard