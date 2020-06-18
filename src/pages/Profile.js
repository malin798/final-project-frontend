import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../components/reducers/user'

export const Profile = ({ loggedIn, setLoggedIn }) => {
  const dispatch = useDispatch();
  const userName = useSelector((store) => store.user.login.userName)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)
  const [list, setList] = useState([])

  const userID = "5ed91c84a1d0445020645add"

  useEffect(() => {
    fetch(`http://localhost:8080/users/${userID}/watchlist`, {
      method: "GET",
      headers: {
        "Authorization": "92cb03b6711b60551695b6ad33efd277918f03c4e92afdbf25b6df0297bcd34bb8f44c2c9e1ac8f39fef22af9d32b658b6a849990726b0b64090e241770a79f6b9e902dd987d9726488090e251f2d115979d01df574c1f6477668357255789ef56ea121727095e89f426c4b37d34cdfba91c9ff125ef72e94be8d29928470c9a"
      }
    })
      .then(res => res.json())
      .then(json => {
        setList(json.watchlist)
        //.then(watchlist => {
        // setList(watchlist)
        // console.log(watchlist)
      })
  }, [])

  const removeItem = (showId) => {
    fetch(`http://localhost:8080/users/${userID}/watchlist`, {
      method: "DELETE",
      headers: {
        "Authorization": "92cb03b6711b60551695b6ad33efd277918f03c4e92afdbf25b6df0297bcd34bb8f44c2c9e1ac8f39fef22af9d32b658b6a849990726b0b64090e241770a79f6b9e902dd987d9726488090e251f2d115979d01df574c1f6477668357255789ef56ea121727095e89f426c4b37d34cdfba91c9ff125ef72e94be8d29928470c9a"
      },
      body: JSON.stringify ({
        "showId": showId
      })
    })
      .then(res => res.json())
      .then(json => {
        setList(json.watchlist)
        //.then(watchlist => {
        // setList(watchlist)
        // console.log(watchlist)
      })
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // const handleClick = () => {
  //   dispatch(xxxxx(setLoggedIn))
  // }

  const handleLogOut = () => {
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
          <h6>Here is your watchlist. Which are your favourite movies? Keep track of the movies you want to see but haven't seen yet! </h6>

          {list.map((item) => (
            <section className="watch-list-container">
              <div className="watch-item">TITLE
              <p className="watch-item-title">{item.title}</p>
                <button className="remove-button" onClick={() => removeItem(item.id)}>REMOVE</button>

              </div>
            </section>
          ))}

          < div className="logout" >
            <button onClick={() => handleLogOut()}>LOG OUT</button>
          </div>

        </section>
      </>
    )
  }
}
