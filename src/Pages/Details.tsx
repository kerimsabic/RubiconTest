import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DetailsCSS from './Detalis.module.css'
import {API} from '../utils/data'


const DetailsPage = () => {
  const { id, type } = useParams<{ id: string, type: string }>();
  const [details, setDetails] = useState<any>(null);


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${API}`
        );
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!details) {
    return <div><Link to="/" className={DetailsCSS.backButtonLink}>
      &lt; Back
    </Link> <p>Cannot open</p></div>
  }



  return (
    <div className={DetailsCSS.container}>

      <div className={DetailsCSS.backButton}>
        <Link to="/" className={DetailsCSS.backButtonLink}>
          &lt; Back
        </Link>

      </div>



      <div className={DetailsCSS.imageCover} >
        <img src={`https://image.tmdb.org/t/p/w500/${details.backdrop_path || details.poster_path}`} alt={details.title} />
      </div>

      <div className={DetailsCSS.title}>
        <h1 >{details.title || details.name}</h1>
      </div>

      <div className={DetailsCSS.overview}>
        <p>{details.overview}</p>
      </div>





    </div>
  );
};

export default DetailsPage;
