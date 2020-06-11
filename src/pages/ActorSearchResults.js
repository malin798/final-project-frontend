import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { WatchlistButton } from '../components/WatchlistButton'
import standingPlaceholder from '../images/placeholderS.png'

export const ActorSearchResults = ({ API_KEY, loggedIn }) => {

  const params = useParams()
  const searchValue = params.value
  const results = useSelector((store) => store.user.searchResults)
  const [active, setActive] = useState()

  console.log("results", results)  

  return (
    <section>

    <h3>Search results for actors - {searchValue}</h3>
      <div className="movie-wrapper-container">
        {results.map(item => {

          let src = `https://image.tmdb.org/t/p/w500/${item.profile_path}`

          if (item.profile_path == null || item.profile_path === undefined ) {
            src = standingPlaceholder
          } 
          return (
            <div className="movie-wrapper" key={item.id}>
              <Link className="movie-link" to={`/actor/${item.id}`}>
                <img src={src}>
                </img>
                <div className='movie-details'> 

                  {loggedIn && 
                    < WatchlistButton active={active} setActive={setActive} item={item}/>
                  }

                  <h5>
                    {item.name}
                  </h5>

                  <p>
                    Known for: {item.known_for_department}
                  </p>
                </div>
              </Link>
            </div>
          )
        })}
            </div>

</section>
  )
}
