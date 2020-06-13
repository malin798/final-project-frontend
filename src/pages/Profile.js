import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../components/reducers/user'

export const Profile = ({ loggedIn, setLoggedIn }) => {
  const dispatch = useDispatch();
  const userName = useSelector((store) => store.user.login.userName)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
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
          <h6>Make your own your movielists. Which are your favourite movies? Keep track of the movies you want to see but haven't seen yet! </h6>
          <section className="watch-list-container">
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