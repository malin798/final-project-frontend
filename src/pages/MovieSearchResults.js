import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { WatchlistButton } from '../components/WatchlistButton'
import standingPlaceholder from '../images/placeholderS.png'

export const MovieSearchResults = ({ loggedIn }) => {

  const params = useParams()
  const searchValue = params.value
  const results = useSelector((store) => store.user.searchResults)
  const [active, setActive] = useState()

  // setMovies(results)
  console.log("results", results)

  // setMovies(useSelector((store) => store.user.searchResults))

  return (
    <section>

      <h3>Search results for - {searchValue}</h3>
      <div className="movie-wrapper-container">
        {results.map(item => {

          let src = `https://image.tmdb.org/t/p/w500/${item.poster_path}`

          if (item.poster_path == null || item.poster_path === undefined) {
            src = standingPlaceholder
          }
          return (
            <div className="movie-wrapper" key={item.id}>
              <Link className="movie-link" to={`/movie/${item.id}`}>
                <img src={src}>
                </img>
                <div className='movie-details'>

                  {loggedIn &&
                    < WatchlistButton active={active} setActive={setActive} item={item} />
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

        {/* <section className="pagination">
        {page < allPages &&
          <button onClick={(event) => showMoreMovies(event)}>
            Show more
          </button>
        }
      
      
        <p className="pagination-page-indicator"> 
          {page} / {allPages} 
        </p>
      </section> */}

      </div>

    </section>

  )
}