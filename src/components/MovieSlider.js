import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ImageSlider } from '../components/ImageSlider'
import { WatchlistButton } from '../components/WatchlistButton'
import { RightArrow } from '../components/RightArrow'

export const MovieSlider = ({ fetchtitle, titlelink, fetchlink, placeholder, imageOrientation, loggedIn }) => {
  const [movies, setMovies] = useState([])
  const [active, setActive] = useState(false)

  useEffect(() => {
    fetch(fetchlink)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results)
      })
  }, [fetchlink])

  return (
    <>
      <div className="movie-slider-title">
        {movies.length > 0 &&
          <Link to={titlelink}>
            <h4>{fetchtitle}</h4>
            <div className="right-arrow-container">
              <RightArrow />
            </div>
          </Link>
        }
      </div>
      <ImageSlider>
        {movies.map(movie => {

          let imageSrc;

          if (imageOrientation === "standing") {
            imageSrc = movie.poster_path
          } else {
            imageSrc = movie.backdrop_path
          }

          let src = `https://image.tmdb.org/t/p/w342/${imageSrc}`

          if (imageSrc == null || imageSrc === undefined) {
            src = placeholder
          }

          return (
            <div className="movie-wrapper" key={movie.id}>
              <Link className="movie-link" to={`/movie/${movie.id}`}>
                <img
                  className="movie-image"
                  draggable={false}
                  alt={movie.title}
                  style={{ width: "100%" }}
                  src={src}
                >
                </img>

                <div className='movie-details'>
                  <div>

                    {loggedIn &&
                      < WatchlistButton active={active} setActive={setActive} item={movie} />
                    }

                    <h5>
                      {movie.title}
                    </h5>

                    <p>
                      Release {movie.release_date}
                    </p>

                  </div>
                </div>
              </Link>
            </div>
          )
        })}

      </ImageSlider >

    </>
  )
}