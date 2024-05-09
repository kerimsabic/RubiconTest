import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HomeCSS from './Home.module.css';
import MovieCard from '../Components/MovieCard';
import { useMovieContext } from '../context/MovieContext';
import axios from 'axios';
import { API } from '../utils/data'
import { useLocation } from 'react-router-dom';
import Spinner from '../Components/Spinner/Spinner';

interface SearchResult {
  id: string;
  name?: string;
  title?: string;
  backdrop_path: string;
  poster_path: string;
}

const debounce = (func: Function, delay: number) => {
  let timer: number | undefined;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Home = () => {
  const { tvShows, setTvShows, movies, setMovies, tvshowData, movieData, tvShowsLoading, moviesLoading } = useMovieContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [displayData, setDisplayData] = useState<SearchResult[]>([]);


  const handleMediaClick = (type: string) => {
  setTvShows(type === 'tv');
  setMovies(type === 'movie');
  if (searchTerm.length >= 3) {
    searchType(type);
  } else {
    setDisplayData(type === 'tv' ? tvshowData : movieData);
  }
};

const handleTvShowsClick = () => {
  handleMediaClick('tv');
};

const handleMoviesClick = () => {
  handleMediaClick('movie');
};

  const searchType = async (type: string) => {
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
          searchType('tv');
        } else {
          searchType('movie');
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

  



  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    localStorage.setItem('searchTerm', newSearchTerm);
  };

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  useEffect(() => {
    const clearSearchTermOnRefresh = () => {
      localStorage.removeItem('searchTerm');
    };
    window.addEventListener('beforeunload', clearSearchTermOnRefresh);

    return () => {
      window.removeEventListener('beforeunload', clearSearchTermOnRefresh);
    };
  }, []);

  




  


  return (
    <>

      <section className={HomeCSS.landing}>
        <div className={HomeCSS.cover}>
          <h1>This is a Movie Website</h1>
        </div>
      </section>


      <div className={HomeCSS.navigation}>
        <button onClick={handleTvShowsClick} className={`${HomeCSS.btn} ${tvShows ? HomeCSS.active : ''}`}>
          TvShows
        </button>
        <button onClick={handleMoviesClick} className={`${HomeCSS.btn} ${movies ? HomeCSS.active : ''}`}>
          Movies
        </button>
      </div>

      <section className={HomeCSS.brows}>
        <div className={HomeCSS.container}>
          <h3>Search Movies</h3>
          <div className={HomeCSS.formInput}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>

        </div>
      </section>





      <section className={HomeCSS.movies}>
        <div className={HomeCSS.container}>

          {tvShowsLoading || moviesLoading ? (
            <div>
              <Spinner />
            </div>

          ) : displayData.length===0 ? (
            <div>
              No such results
            </div>
          ) : (
            displayData.map((data, index) => (
              <div className={HomeCSS.movie}>
                <Link to={{
                  pathname: `/details/${tvShows ? 'tv' : 'movie'}/${data.id}`,


                }} key={index} className={HomeCSS.HomeLink}>
                  {tvShows ? (
                    <MovieCard title={data.name || ''} backdrop_path={data.backdrop_path} poster_path={data.poster_path} />
                  ) : (
                    <MovieCard title={data.title || ''} backdrop_path={data.backdrop_path} poster_path={data.poster_path} />
                  )}
                </Link>
              </div>

            ))
          )}

        </div>
      </section>


    </>
  );
};

export default Home;
