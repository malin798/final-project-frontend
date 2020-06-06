import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export const MovieItem = ({ API_KEY }) => {

  const params = useParams()
  const movieId = params.id
  
  // const movieId = "419704"
  const URL_MOVIE = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  const URL_CAST = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  const URL_SIMILAR = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`
  
  const [movie, setMovie] = useState([])
  const [cast, setCast] = useState([])
  const [genre, setGenre] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(URL_MOVIE)
      .then(res => res.json())
      .then(json => {
        setMovie(json)
        setGenre(json.genres)
      })

      fetch(URL_SIMILAR)
      .then(res => res.json())
      .then(json => {
        setSimilarMovies(json.results)
      })

      fetch(URL_CAST)
      .then(res => res.json())
      .then(json => {
        setCast(json.cast)
        setLoading(false)
      })
  }, [movieId])

  if (!movie || loading) {
    return (
      <div>
        loading
      </div>
    )
  } else {
    return (
      <section className="movie-item">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}>
        </img>

      <h2>
        {movie.original_title}
      </h2>

      <div>
        {movie.overview}
      </div>

      <div>
        {genre.map(genre => {
          return (
            <div>
              {genre.name}
            </div>
          )
        })}
      </div>

      <div className="cast-container">
      {cast.slice(0, 10).map(actor => {
        return (
          <div>
            {actor.name} as {actor.character}
            <Link to={`/actor/${actor.id}`}>
              <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}>
              </img>
            </Link>
          </div>
        )
      })}
      </div>

      <h3>Similar movies:</h3>
      {similarMovies.slice(0, 10).map(movie => {
        return (
          <Link to={`/movie/${movie.id}`}>
            {movie.title}
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}>
              </img>
          </Link>
        )
      })}
      </section>
    )
  }
}