import React, { useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { addToWatchlist } from '../components/reducers/user'

export const WatchlistButton = ({ item }) => {

  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
  const [added, setAdded] = useState(false)
  const [active, setActive] = useState(false)

  const handleClick = async (event, title, id) => {
    event.preventDefault()
    dispatch(addToWatchlist(title, id))
    setAdded(true)

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

  return (
    <>
      {!added &&
        <button
          onMouseOver={() => setActive(true)}
          onMouseOut={() => setActive(false)}
          onClick={(event) => handleClick(event, item.title, item.id)}
        >
          + {active && "Add to watchlist"}
        </button>
      }

      {added &&
        <button
          className={`${added ? "added" : "" }`}
          onMouseOver={() => setActive(true)}
          onMouseOut={() => setActive(false)}
          // onClick={(event) => handleClick(event, item.title, item.id)}
        >
          ✔️ {active && "Added to watchlist"}
        </button>
      }
    </>
  )
}
