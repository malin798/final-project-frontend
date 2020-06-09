import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MovieSlider } from '../components/MovieSlider'
import { ImageSlider } from '../components/ImageSlider'
import { ThumbnailGallery } from '../components/ThumbnailGallery'
import { IMDBRatingPlugin } from '../components/IMDBRatingPlugin'
import actorPlaceholder from '../images/phil-desforges-oQd5dwDWu_8-unsplash.jpg'
import moviePlaceholder from '../images/elijah-flores-44se2xSCo00-unsplash.jpg'


export const MovieItem = ({ API_KEY, loggedIn }) => {

  const params = useParams()
  const movieId = params.id
  // const movieId = "419704"
  const URL_MOVIE = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  const URL_CAST = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  const URL_SIMILARMOVIES = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`
  const URL_TRAILER = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
  const URL_THUMB = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`

  const [movie, setMovie] = useState([])
  const [cast, setCast] = useState([])
  const [genre, setGenre] = useState([])
  const [productionCompany, setProductionCompany] = useState([])
  const [trailer, setTrailer] = useState([])
  const [thumbNails, setThumbNails] = useState([]);
  const [loading, setLoading] = useState(false)

  console.log("movie item", loggedIn)
    
  useEffect(() => {
    setLoading(true)
    fetch(URL_MOVIE)
      .then(res => res.json())
      .then(json => {
        setMovie(json)
        setProductionCompany(json.production_companies)
        setGenre(json.genres)
      })

      fetch(URL_CAST)
      .then(res => res.json())
      .then(json => {
        setCast(json.cast)
      })

      fetch(URL_THUMB)
      .then(res => res.json())
      .then(json => {
        setThumbNails(json.backdrops)
      })

      fetch(URL_TRAILER)
      .then(res => res.json())
      .then(json => {
        setTrailer(json.results)
        setLoading(false)
      })
  }, [URL_MOVIE])

  if (!movie || loading) {
    return (
      <div>
        loading
      </div>
    )
  } else {
    return (
 
      <section className="movie-item">

      <h2>
        {movie.original_title} &#40;{movie.release_date}&#41;
      </h2>

      {thumbNails.length > 1 ?
        < ThumbnailGallery 
          thumbnailArray={thumbNails.slice(0, 10)} 
          thumbnailDefault={thumbNails.map(item => item.file_path)[0]} 
          />
          : 
          <img 
            className="thumbnail-gallery-display"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}>
          </img>
       }

      < IMDBRatingPlugin imdbId={movie.imdb_id} title={movie.title} rating={movie.vote_average} />

      <h4>Movie overview:</h4>

      <div>
        {movie.overview}
      </div>

      {trailer.map((item) => {
        if (item.site === "YouTube") {
          return (
            <iframe 
              width="560" height="315" 
              src={`https://www.youtube.com/embed/${item.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            >
            </iframe>
          )}
      })[0]}
  
      <div>

      <h4>Produced by:</h4>
        {productionCompany.map((company, index) => (
          <>
            <Link to="">
              {company.name}
            </Link>
            {productionCompany.length -1 > index && ", "}
          </>
        ))}
      </div>
      

      <h4>Genre:</h4>
      <div className="movie-genre">
        {genre.map((item, index) => (
            <>
            <Link to={`/genres/${item.id}`}>
              {item.name}
            </Link>
              <span>
                {(genre.length-1 > index) ? ", " : ""}
              </span>
            </>
        ))}
      </div>

      <h4>Cast: </h4>

      <ImageSlider>

        {cast.slice(0, 10).map(actor => {
            
          let src = `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
  
          if (actor.profile_path == null || actor.profile_path === undefined ) {
            src = actorPlaceholder
          } 
        
          return (
            <div className="movie-wrapper">
              <Link to={`/actor/${actor.id}`}>
                <img 
                  className="movie-image"
                  // style={{height: "470px"}}
                  src={src} 
                >
                </img>
                <div className="movie-details"> 
                  <div>
                    <h5>
                      {actor.name}
                    </h5> 
                    <p>
                      as {actor.character}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </ImageSlider> 

      < MovieSlider fetchtitle="Similar movies:" fetchlink={URL_SIMILARMOVIES} placeholder={moviePlaceholder} loggedIn={loggedIn}/>

      </section>
    )
  }
}