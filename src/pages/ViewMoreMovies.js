import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { WatchlistButton } from '../components/WatchlistButton'

export const ViewMoreMovies = ({ API_KEY, fetchlink , fetchtitle, moviePlaceholder, loggedIn }) => {

  const params = useParams()
  const genreId = params.id
  const genreName = params.name
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [allPages, setAllPages] = useState();
  const [active, setActive] = useState(false)

  //let URL = `${fetchlink}${page}`
 
  if (genreId) {
    fetchtitle = genreName
    URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`
  }
  
  const showMoreMovies = (event) => {
    event.preventDefault()
    setPage(page + 1);

    fetch(URL)
    .then(res => res.json())
    .then(res => {
      const allMovies = movies.concat(res.results) 
      setMovies(allMovies)
    })
  }

  useEffect(() => {
    fetch(URL)
    .then(res => res.json())
    .then(res => {
      setAllPages(res.total_pages)
      setMovies(res.results)
    })
  }, [URL])

  return (
    <section>

      <h3>{fetchtitle}</h3>
      <div className="movie-wrapper-container">
        {movies.map(item => {

           let src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`
   
           if (item.backdrop_path == null || item.backdrop_path === undefined ) {
             src = moviePlaceholder
           } 
          return (
            <div className="movie-wrapper" key={item.id}>
              <Link className="movie-link" to={`/movie/${item.id}`}>
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
     
    </section>
   
  )
}