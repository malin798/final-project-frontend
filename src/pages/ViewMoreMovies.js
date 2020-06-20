import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { WatchlistButton } from '../components/WatchlistButton'
import { Pagination } from '../components/Pagination'
import { capitalizeFirstLetter } from '../utils/StringUtils'
import { LoadingAnimation } from '../components/Loadinganimation/LoadingAnimation'

export const ViewMoreMovies = ({ API_KEY, type, fetchtitle, moviePlaceholder, loggedIn }) => {

  const params = useParams()
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [allPages, setAllPages] = useState()
  const [loading, setLoading] = useState(false)

  let URL;

  switch (type) {
    case "genres":
      const genreId = params.genreId
      const genreName = params.genreName
      fetchtitle = genreName
      URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`
      break;
    case "now-playing":
      URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`
      break;
    case "upcoming":
      URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`
      break;
    case "top-rated":
      URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
      break;
    case "trending-week":
      URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=${page}`
      break;
    case "trending-today":
      URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${page}`
      break;
    case "similar-movies":
      const movieId = params.movieId
      URL = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=${page}`
  }

  useEffect(() => {
    setLoading(true)
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        setAllPages(res.total_pages)
        setMovies(res.results)
        setLoading(false)
      })
  }, [URL])

  if (loading) {
    return (
        < LoadingAnimation />
    )
  } else {
    return (
      <section>
        <h4>{capitalizeFirstLetter(fetchtitle)}</h4>
        <div className="movie-wrapper-container">
          {movies.map(item => {

            let src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`

            if (item.poster_path == null || item.poster_path === undefined) {
              src = moviePlaceholder
            }
            return (
              <div className="movie-wrapper" key={item.id}>
                <Link className="movie-link" to={`/movie/${item.id}`}>
                  <img
                    className="movie-image"
                    src={src}>
                  </img>

                  <div className='movie-details'>

                    {loggedIn &&
                      < WatchlistButton item={item} />
                    }

                    <h5>
                      {item.title}
                    </h5>

                    <p>
                      Release {item.release_date}
                    </p>

                  </div>
                </Link>
              </div>
            )
          })}

          < Pagination page={page} setPage={setPage} allPages={allPages} movies={movies} setMovies={setMovies} URL={URL} />

        </div>

      </section>

    )
  }
}