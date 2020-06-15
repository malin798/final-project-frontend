import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RightArrow } from '../RightArrow'

export const HamburgerMenu = () => {

  const [visible, setVisible] = useState(false)
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setVisible(!visible)
  }

  const showMenu = () => {
    setShow(!show)
  }

  return (
    <>
      <div className={`hamburger-icon ${show ? "transform" : ""}`} 
        onClick={() => showMenu()}>
        <div className="hamburger-div-1"></div>
        <div className="hamburger-div-2"></div>
        <div className="hamburger-div-3"></div>
      </div>
      <ul className={`hamburger-menu ${show ? "visible" : ""}`}>
        <Link to="/"> <li>Home</li></Link>
        <Link to="/"> <li>Movies</li></Link>

        <li onClick={() => handleClick()}>Genres</li>
          <div className={`hamburger-menu-genre-accordion ${visible ? "visible" : ""}`}>
            <Link to="/genres/Romance/10749">Romance</Link>
          </div>

        <Link to="/top-rated" ><li>Top rated</li></Link>
        <Link to="/trending-today" ><li>Trending today</li></Link>
        <Link to="/trending-week"><li>Trending week</li></Link>
        <Link to="/upcoming" ><li>Upcoming</li></Link>
        <Link to="/now-playing"><li>Now playing</li></Link>
      </ul>

    </>
  )
}