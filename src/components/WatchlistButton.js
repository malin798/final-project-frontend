import React from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { addToWatchlist } from '../components/reducers/user'

export const WatchlistButton = ({ active, setActive, item }) => {

  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)

  const handleClick = async (event, title, id) => {
    event.preventDefault()
    dispatch(addToWatchlist(title, id))

    const response = await fetch(`http://localhost:8080/users/${userId}/watchlist`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${accessToken}`
      },
      body: JSON.stringify({
        "title": title,
        "showId": id
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
      onClick={(event) => handleClick(event, item.title, item.id)}
    >
      + {active && "Add to watchlist"}
    </button>
  )
}
