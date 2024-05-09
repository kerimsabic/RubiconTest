import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DetailsCSS from './Detalis.module.css'
import { API } from '../utils/data'
import { BearerToken } from '../utils/data'
import { FaPlayCircle } from "react-icons/fa";
import Spinner from '../Components/Spinner/Spinner';


const DetailsPage = () => {
  const { id, type } = useParams<{ id: string, type: string }>();
  const [details, setDetails] = useState<any>(null);
  const [videoDetails, setVideoDetails] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${API}`
        );
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [id]);


  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${BearerToken}`
          }
        }
        );
        setVideoDetails(response.data.results[0].key);
        console.log(videoDetails)
        //console.log(response.data.results[0].key)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching details:', error);
      }


    };

    fetchTrailer();
  }, [id]);


  if (loading) {
    return <div className={DetailsCSS.spinner}>
      <Spinner /></div>

  }

  if (!details) {
    return <div><Link to="/" className={DetailsCSS.backButtonLink}>
      &lt; Back
    </Link> </div>
  }



  return (

    <>
      <div className={DetailsCSS.movieDetailsContainer} >
        <section className={DetailsCSS.movieBanner}>
          <div className={DetailsCSS.imageCover} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${details.backdrop_path || details.poster_path})` }}></div>
          <div><Link to="/" className={DetailsCSS.backButtonLinkImage}>
            &lt; Back
          </Link>
          </div>
        </section>

        <section className={DetailsCSS.secondSection}>
          <div className={DetailsCSS.secondImageDiv}>
            <img className={DetailsCSS.posterImage} src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`} alt="" />
          </div>

          <div className={DetailsCSS.description}>
            <h2 className={DetailsCSS.movieTitle}>{details.title || details.name}</h2>
            <div className={DetailsCSS.bellowTitle}>
              <span> <FaPlayCircle className={DetailsCSS.icon} />Trailer</span>
              <h2 className={DetailsCSS.movieTitle}>{details.release_date || details.first_air_date}</h2>
            </div>

            <h3>Description:</h3>
            <p>{details.overview}</p>
          </div>
        </section>
        <section className={DetailsCSS.videoSeciton}>
          <div className={DetailsCSS.videoDiv}>
            {
              videoDetails &&
              <iframe
                width="850"
                height="455"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                src={`https://www.youtube.com/embed/${videoDetails}?autoplay=1&mute=1`}
                title="YouTube video player"
                allowFullScreen
              ></iframe>
            }
          </div>

        </section>
      </div>




    </>

  );
};

export default DetailsPage;