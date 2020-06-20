import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, replaceWatchlist, removeItem } from '../components/reducers/user'
import { capitalizeFirstLetter } from '../utils/StringUtils'
import { Link } from 'react-router-dom'
import layingPlaceholder from '../images/placeholderL.png'

export const Profile = ({ loggedIn, setLoggedIn }) => {
  const dispatch = useDispatch();
  const userName = useSelector((store) => store.user.login.userName)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
  const [list, setList] = useState([])
  //const [productionCountry, setProductionCountry] = useState([])

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userId}/watchlist`, {
      method: "GET",
      headers: {
        "Authorization": `${accessToken}`
      }
    })
      .then(res => res.json())
      .then(json => {
        const sortedList = json.watchlist.reverse()
        dispatch(replaceWatchlist(sortedList))
        setList(sortedList)
        //setProductionCountry(json.production_countries)
      })
  }, [])

  const handleLogOut = () => {
    dispatch(logout(setLoggedIn))
  }

  //const abstractYear = (year) => {
  //return year.substring(0, 4)
  //}

  //{abstractYear(movie.release_date)} 



  if (!loggedIn || userId === null || userId === null || accessToken === null) {
    return (
      <div>
        Please sign in to access your profile!
      </div>
    )
  } else {
    return (
      <>
        <section class="welcome-container">
          <div className="welcome">
            Welcome {capitalizeFirstLetter(userName)}!
          </div>
          <h6>Here is your watchlist. Which are your favourite movies? Keep track of the movies you want to see but haven't seen yet! </h6>

          {list.map(item => (

            <section className="watch-list-container" key={item.showId}>
              <Link className="movie-link" to={`/movie/${item.showId}`}>
                <section className="watch-item">

                  {item.poster === undefined || item.poster === null ?

                    <img className="movie-image"
                      alt={item.title}
                      src={layingPlaceholder}
                    >
                    </img>
                    :
                    <img className="movie-image"
                      alt={item.title}
                      src={`https://image.tmdb.org/t/p/w342/${item.poster}`}
                    >
                    </img>
                  }
                  <div className="right-container">{item.title}
                    <p className="year">{item.year.slice(0, 4)}</p>

                    <p className="overview">{item.overview}<span>...</span></p>

                  </div>

                </section>
              </Link>
              <button className="remove-button" onClick={() => dispatch(removeItem(item.showId, setList, userId, accessToken))}>REMOVE</button> 🍿
            </section>

          ))
          }

          < div  >
            <button className="logout" onClick={() => handleLogOut()}>LOG OUT</button>
          </div>

        </section >
      </>
    )
  }
}
/*<h4>Production country:</h4>
                    <div>
                      {productionCountry.map((country, index) => (
                        <>
                          {country.name}
                          {productionCountry.length - 1 > index && ", "}
                        </>
                      ))}
                    </div>*/


/*  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
*/
