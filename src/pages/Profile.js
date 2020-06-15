import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../components/reducers/user'
import { WatchList } from '../components/WatchList'

export const Profile = ({ loggedIn, setLoggedIn, title, id }) => {
  const dispatch = useDispatch();
  const userName = useSelector((store) => store.user.login.userName)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
  const watchlistItem = useSelector((store) => store.user.watchlist.title)

  console.log("loggedin profile", loggedIn)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleClick = () => {
    dispatch(logout(setLoggedIn))
  }

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
            Welcome {capitalizeFirstLetter(userName)}!</div>
          <h6>Make your own your movielists. Which are your favourite movies? Your favourite classics? Commedies? Also keep track of the movies you want to see but haven't seen yet! </h6>
          <section className="watch-list-container">
            <WatchList title={watchlistItem} />
            <div className="watch-list"></div>
            <div className="watch-list2"></div>
            <div className="watch-list"></div>


          </section>
          <div className="logout">
            <button onClick={() => handleClick()}>LOG OUT</button>
          </div>
        </section>
      </>
    )
  }
}
