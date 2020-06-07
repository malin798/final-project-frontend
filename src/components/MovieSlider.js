import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ImageSlider } from '../components/ImageSlider'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 5 
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2 
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 
  }
}

export const MovieSlider = ({ fetchtitle, fetchlink, placeholder }) => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(fetchlink)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results)
      })
  }, [])

  return (
    <>
    {movies.length > 0 &&
      <h4>{fetchtitle}</h4>}

      <ImageSlider>
        {movies.map(movie => {

          let src = `https://image.tmdb.org/t/p/w342/${movie.backdrop_path}`
            
          if (movie.backdrop_path == null || movie.backdrop_path === undefined ) {
            src = placeholder
          } 
          return (
            <div className="movie-wrapper" key={movie.id}>
              <Link className="movie-link" to={`/movie/${movie.id}`}>
                <img
                  className="movie-image"
                  draggable={false}
                  alt={movie.original_title}
                  style={{height: "180px"}}
                  src={src}
                >
                </img>
                <div className="movie-details"> <h5>{movie.original_title}</h5> <p>Released {movie.release_date}</p></div>
              </Link>
            </div>
          )
        })}

    </ImageSlider >
    
    </>
  )
}