import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {API} from '../utils/data'
import {BearerToken} from '../utils/data'

interface MovieContextState {
  tvShows: boolean;
  setTvShows: React.Dispatch<React.SetStateAction<boolean>>;
  movies: boolean;
  setMovies: React.Dispatch<React.SetStateAction<boolean>>;
  movieData: { title: string; backdrop_path: string,id:string, poster_path:string }[];
  setMovieData: React.Dispatch<{ title: string; backdrop_path: string, id:string, poster_path:string }[]>;
  tvshowData: { name: string; backdrop_path: string, id:string, poster_path:string }[];
  setTvShowData: React.Dispatch<{ name: string; backdrop_path: string, id:string, poster_path:string }[]>;
}

const MovieContext = createContext<MovieContextState | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

interface MovieProviderProps {
  children: React.ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [tvShows, setTvShows] = useState(true);
  const [movies, setMovies] = useState(false);
  const [movieData, setMovieData] = useState<{ title: string; backdrop_path: string, id:string,poster_path:string }[]>([]);
  const [tvshowData, setTvShowData] = useState<{ name: string; backdrop_path: string, id:string, poster_path:string }[]>([]);

  useEffect(() => {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BearerToken}`
      }
    };
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?include_video=true&language=en-US&page=1&sort_by=popularity.desc&top=10', options
        );
        setMovieData(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const fetchTvShows = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${API}`
        );
        setTvShowData(response.data.results);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    if (movies) {
      fetchMovies();
    } else if (tvShows) {
      fetchTvShows();
    }
  }, [movies, tvShows]);

  const value: MovieContextState = {
    tvShows,
    setTvShows,
    movies,
    setMovies,
    movieData,
    setMovieData,
    tvshowData,
    setTvShowData,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
