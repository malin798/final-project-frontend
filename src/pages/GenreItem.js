import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { WatchlistButton } from '../components/WatchlistButton'
import moviePlaceholder from '../images/elijah-flores-44se2xSCo00-unsplash.jpg'

export const GenreItem = ({ loggedIn }) => {

  const params = useParams()
  const genreId = params.id
  const [genre, setGenre] = useState([])
  const [page, setPage] = useState(1)
  const [allPages, setAllPages] = useState();
  const [active, setActive] = useState(false)

  const URL = `https://api.themoviedb.org/3/discover/movie?api_key=3d60d24f587752713f5e7b71902de8f8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`

  const showMoreMovies = (event) => {
    event.preventDefault()
    setPage(page + 1);

    fetch(URL)
    .then(res => res.json())
    .then(res => {
      const allMovies = genre.concat(res.results) 
      setGenre(allMovies)
    })
  }

  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then(res => {
      setAllPages(res.total_pages)
      setGenre(res.results)
    })
  }, [URL])

  return (
    <>
      <div className="genre-wrapper-container">
        {genre.map(item => {

           let src = `https://image.tmdb.org/t/p/w500/${item.backdrop_path}`
   
           if (item.backdrop_path == null || item.backdrop_path === undefined ) {
             src = moviePlaceholder
           } 
          return (
            <div className="genre-wrapper" key={item.id}>
              <Link className="genre-link" to={`/movie/${item.id}`}>
                <img src={src}>
                </img>
                <div className='movie-details'> 

                  {loggedIn && 
                    < WatchlistButton active={active} setActive={setActive} item={item}/>
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

        <section className="pagination">
          {page < allPages &&
            <button onClick={(event) => showMoreMovies(event)}>
              Show more
            </button>
          }
         
        
          <p className="pagination-page-indicator"> 
            {page} / {allPages} 
          </p>
        </section>

      </div>
     
    </>
   
  )
}