import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom'

const API_KEY = process.env.REACT_APP_API_KEY

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export const ImageSlider = ({ fetchlink }) => {
  const [movies, setMovies] = useState([])

  // const MOVIES_API = (`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)

  useEffect(() => {
    fetch(fetchlink)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setMovies(json.results)
      })
  }, [])

  return (
    //Rubrik klickbar för varje genre/movie carousel
    //återanvändbar carousel som använder props för att få in img src/ titel osv..

    <Carousel
      additionalTransfrom={0}
      // autoPlaySpeed={3000}
      swipeable={true}
      draggable={false}
      minimumTouchDrag={80}
      partialVisible
      arrows={true}
      slidesToSlide={3}
      // showDots={true}
      responsive={responsive}
      itemClass="carousel-wrapper"
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      // autoPlay={this.props.deviceType !== "mobile" ? true : false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {movies.map(movie => {
        return (
          <div className="movieWrapper" key={movie.id}>
            <Link className="movieLink" to={`/movie/${movie.id}`}>
              <img
                className="movieImage"
                draggable={false}
                alt={movie.original_title}
                style={{ width: "100%" }}
                src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
              >
              </img>
              <div className="titleDate"> <h5>{movie.original_title}</h5> <p>Released {movie.release_date}</p></div>

            </Link>
          </div>
        )
      })}
    </Carousel >
  )
}


