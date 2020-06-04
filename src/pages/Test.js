import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick";

const API_KEY = process.env.REACT_APP_API_KEY

export const Test = () => {
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
    <>
      <div class="arrows prev"></div>*/
      <div className="moviesWrapper">
        {movies.map((movie) => (
          <div className="movieWrapper" key={movie.id}>
            <Link className="movieLink" to={`/movies/${movie.id}`}>
              <img className="movieImage" src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`} alt={"movie.original_title"} />
            </Link>
          </div>
        ))
        }
      </div >

      <div class="arrows next"></div>
    </>
  )
}

//    </Slider>