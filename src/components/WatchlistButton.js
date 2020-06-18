import React from 'react'
import { useDispatch } from 'react-redux'
import { addToWatchlist } from '../components/reducers/user'

export const WatchlistButton = ({ active, setActive, item }) => {

  const dispatch = useDispatch()

  const handleClick = async (event, title, id, poster) => {
    event.preventDefault()
    dispatch(addToWatchlist(title, id, poster))

    const response = await fetch("http://localhost:8080/users/5ed91c84a1d0445020645add/watchlist", {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "92cb03b6711b60551695b6ad33efd277918f03c4e92afdbf25b6df0297bcd34bb8f44c2c9e1ac8f39fef22af9d32b658b6a849990726b0b64090e241770a79f6b9e902dd987d9726488090e251f2d115979d01df574c1f6477668357255789ef56ea121727095e89f426c4b37d34cdfba91c9ff125ef72e94be8d29928470c9a"
      },
      body: JSON.stringify({
        "title": title,
        "showId": id,
        "poster": poster
      })
    })

    const JSON_RES = await response.json()
    console.log("JSON", JSON_RES)

  }

  //Add to redux/reducers
  //fetch (put) to users/:id/watchlist
  //header Authorization: accesstoken
  // body: "title": "movietitle",
  // showId: "movieId"
  //change color of button if added to watchlist?


  return (
    <button
      onMouseOver={() => setActive(!active)}
      onMouseOut={() => setActive(!active)}
      onClick={(event) => handleClick(event, item.title, item.id, item.poster_path)}
    >
      + {active && "Add to watchlist"}
    </button>
  )
}
