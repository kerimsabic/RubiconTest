import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeCSS from './Home.module.css';
import MovieCard from '../Components/MovieCard';
import { useMovieContext } from '../context/MovieContext';
import axios from 'axios';
import {API} from '../utils/data'

interface SearchResult {
  id: string;
  name?: string;
  title?: string;
  backdrop_path: string;
  poster_path:string;
}

const debounce = (func: Function, delay: number) => {
  let timer;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Home = () => {
  const { tvShows, setTvShows, movies, setMovies, tvshowData, movieData } = useMovieContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [displayData, setDisplayData] = useState<SearchResult[]>([]);

  const handleTvShowsClick = () => {
    setTvShows(true);
    setMovies(false);
    if (searchTerm.length >= 3) {
      searchTMDB('tv');
    } else {
      setDisplayData(tvshowData);
    }
  };

  const handleMoviesClick = () => {
    setTvShows(false);
    setMovies(true);
    if (searchTerm.length >= 3) {
      searchTMDB('movie');
    } else {
      setDisplayData(movieData);
    }
  };

  const searchTMDB = async (type: string) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${type}?query=${searchTerm}&api_key=${API}&page=1`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const debouncedSearch = debounce(() => {
        if (tvShows) {
          searchTMDB('tv');
        } else {
          searchTMDB('movie');
        }
      }, 1000);

      debouncedSearch();
      return () => debouncedSearch();
    } else {
      setSearchResults([]);
      if (tvShows) {
        setDisplayData(tvshowData);
      } else {
        setDisplayData(movieData);
      }
    }
  }, [searchTerm, tvShows, setTvShows, movies, setMovies, tvshowData, movieData]);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setDisplayData(tvShows ? tvshowData : movieData);
    } else {
      setDisplayData(searchResults);
    }
  }, [searchResults, tvShows, tvshowData, movieData, searchTerm]);

  return (
    <>
      <div className={HomeCSS.navigation}>
        <button onClick={handleTvShowsClick} className={`${HomeCSS.btn} ${tvShows ? HomeCSS.active : ''}`}>
          TvShows
        </button>
        <button onClick={handleMoviesClick} className={`${HomeCSS.btn} ${movies ? HomeCSS.active : ''}`}>
          Movies
        </button>
      </div>

      <div className={HomeCSS.searchBarBox}>
        <div className={HomeCSS.searchBar}>
          <input
            type="text"
            placeholder="Search..."
            className={HomeCSS.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={HomeCSS.cards}>
        {displayData.length === 0 ? (
          <p>Searching..</p>
        ) : (
          displayData.map((data, index) => (
            <Link to={`/details/${tvShows ? 'tv' : 'movie'}/${data.id}`} key={index} className={HomeCSS.HomeLink}>
              {tvShows ? (
                <MovieCard title={data.name || ''} backdrop_path={data.backdrop_path} poster_path={data.poster_path} />
              ) : (
                <MovieCard title={data.title || ''} backdrop_path={data.backdrop_path} poster_path={data.poster_path} />
              )}
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
