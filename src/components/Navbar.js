import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserImage } from '../components/UserImage'
import { Searchbar } from '../components/Searchbar'


export const Navbar = ({ loggedIn, API_KEY }) => {
  const userName = useSelector((store) => store.user.login.userName)

  return (
    <div className="navbar">
      <Link to="/">
        <h3><span>I</span><span className="find">FIND</span><span>MOVIES</span></h3>
      </Link>

      < Searchbar API_KEY={API_KEY}/>

      {!loggedIn &&
        <Link className="signin" to="/signin">
          SIGN IN
        </Link>
      }

      {loggedIn &&
        <section className="signin">
          <UserImage />
          {userName.toUpperCase()}
        </section>
      }

    </div>

  )
}

