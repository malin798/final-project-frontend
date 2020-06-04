import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = ({ loggedIn }) => {
  return (
    <div className="navbar">

      <Link to="/">
        Home
      </Link>
      {!loggedIn &&
        <Link to="/signin">
          Signin
        </Link>
      }

      {loggedIn &&
        <Link to="/profile">
          My profile
        </Link>
      }
      
    </div>
    
  )
}