import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className="navbar">

      <Link to="/">
        Home
      </Link>
      <Link to="/signin">
        Signin
      </Link>
    </div>
    
  )
}