import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = ({ loggedIn }) => {

  return (
    <div className="navbar">
      <Link to="/">
        <h3><span>I</span><span className="find">FIND</span><span>MOVIES</span></h3>
      </Link>
      {!loggedIn &&
        <Link className="signin" to="/signin">
          SIGNIN
        </Link>
      }

      {loggedIn &&
        <Link className="signin" to="/profile">
          MY PROFILE
        </Link>
      }

    </div>

  )
}