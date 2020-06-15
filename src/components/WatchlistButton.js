import React from 'react'
import { useDispatch } from 'react-redux'
import { addToWatchlist } from '../components/reducers/user'

export const WatchlistButton = ({ active, setActive, item }) => {

  const dispatch = useDispatch()

  const handleClick = (event, title, id) => {
    event.preventDefault()
    dispatch(addToWatchlist(title, id))
    //Add to redux/reducers
    //fetch (put) to users/:id/watchlist
    //header Authorization: accesstoken
    // body: "title": "movietitle",
    // showId: "movieId"
    //change color of button if added to watchlist?
  }

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
