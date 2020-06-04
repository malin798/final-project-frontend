import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
//import './scss/movielist.css'

const API_KEY = process.env.REACT_APP_API_KEY

export const MovieList = () => {
  const [movies, setMovies] = useState([])

  // const MOVIES_API = (`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setMovies(json.results)
      })
  }, [])

  return (
    <div className="moviesWrapper">
      {movies.map((movie) => (
        <div className="movieWrapper" key={movie.id}>
          <Link className="movieLink" to={`/movies/${movie.id}`}>
            <img className="movieImage" src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`} alt={"movie.original_title"} />
            <div className="titleDate"> <h1>{movie.original_title}</h1>
              <p>Released {movie.release_date}</p></div>
          </Link>
        </div>
      ))
      }
    </div >
  )
}
