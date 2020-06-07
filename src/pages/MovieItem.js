import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ImageSliderAndTitle} from '../components/ImageSliderAndTitle'
import { ImageSlider } from '../components/ImageSlider'
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 7,
//     slidesToSlide: 5 
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 3,
//     slidesToSlide: 2 
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     slidesToSlide: 1 
//   }
// }

export const MovieItem = ({ API_KEY }) => {

  const params = useParams()
  const movieId = params.id
  // const movieId = "419704"
  const URL_MOVIE = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  const URL_CAST = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  const URL_SIMILARMOVIES = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`
  
  const [movie, setMovie] = useState([])
  const [cast, setCast] = useState([])
  const [genre, setGenre] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(URL_MOVIE)
      .then(res => res.json())
      .then(json => {
        setMovie(json)
        setGenre(json.genres)
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

      <ImageSlider>
        {cast.slice(0, 10).map(actor => {
          return (
            <div className="movieWrapper">
            <div>
              {actor.name} as {actor.character}
              <Link className="movieLink" to={`/actor/${actor.id}`}>
                <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}>
                </img>
              </Link>
            </div>
            </div>
          )
        })}
      </ImageSlider> 

      < ImageSliderAndTitle fetchlink={URL_SIMILARMOVIES} fetchtitle="Similar movies:" />
     
      </section>
    )
  }
}