import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ImageSliderAndTitle} from '../components/MovieSlider'
import { ImageSlider } from '../components/ImageSlider'

export const GenreItem = () => {
//fetcha en specifik genre från movielänken.. 
  const params = useParams()
  const genreId = params.id
  const [genre, setGenre] = useState([])
  const [page, setPage] = useState(1)
  const [allPages, setAllPages] = useState();
  const [active, setActive] = useState(false)
  console.log(allPages)

  const URL = `https://api.themoviedb.org/3/discover/movie?api_key=3d60d24f587752713f5e7b71902de8f8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`

  const showMoreMovies = (event) => {
    event.preventDefault();
    setPage(page + 1);

    fetch(URL)
    .then(res => res.json())
    .then(res => {
      const allMovies = genre.concat(res.results) 
      setGenre(allMovies)
    })
  }

  const addToList = (event) => {
    event.preventDefault()
    //Add to redux/reducers
    //fetch (put) to users/:id/watchlist
    //header Authorization: accesstoken
    // body: "title": "movietitle",
    // showId: "movieId"
    //change color of button if added to watchlist?
  }

  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then(res => {
      setAllPages(res.total_pages)
      setGenre(res.results)
      console.log(res)
    })
  }, [genreId])
  // }, [genreId, page])

  return (
    <>
      <div className="genre-wrapper-container">
        {genre.map(item => {
          return (
            <div className="genre-wrapper" key={item.id}>
              <Link className="genre-link" to={`/movie/${item.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}>
                </img>
                <div className='movie-details'> 
                  <button
                    onMouseOver={event => setActive(!active)}
                    onMouseOut={event => setActive(!active)}
                    onClick={event => addToList(event)}
                  >
                    + {active && "Add to watchlist"}
                  </button>
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

        <button onClick={(event) => showMoreMovies(event)}>
          Show more
        </button>
      <p>{page} / {allPages} </p>

      </div>

     
    </>
   
  )
}