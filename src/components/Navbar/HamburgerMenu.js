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
        <Link to="/top-rated" ><li>Top rated</li></Link>
        <Link to="/upcoming" ><li>Upcoming</li></Link>
        <Link to="/trending-today" ><li>Trending today</li></Link>
        <Link to="/trending-week"><li>Trending week</li></Link>
        <Link to="/now-playing"><li>Now playing</li></Link>
        <Link to="/genres"><li className="genres" onClick={() => handleClick()}>Genres<span><RightArrow /></span></li></Link>
        <div className={`hamburger-menu-genre-accordion ${visible ? "visible" : ""}`}><br />
          <Link className="genre" to="/genres/Action/28">Action</Link><br />
          <Link className="genre" to="/genres/Adventure/12">Adventure</Link><br />
          <Link className="genre" to="/genres/Animation/16">Animation</Link><br />
          <Link className="genre" to="/genres/Comedy/35">Comedy</Link><br />
          <Link className="genre" to="/genres/Crime/80">Crime</Link><br />
          <Link className="genre" to="/genres/Documentary/99">Documentary</Link><br />
          <Link className="genre" to="/genres/Drama/18">Drama</Link><br />
          <Link className="genre" to="/genres/Family/10751">Family</Link><br />
          <Link className="genre" to="/genres/Fantasy/14">Fantasy</Link><br />
          <Link className="genre" to="/genres/History/36">History</Link><br />
          <Link className="genre" to="/genres/Horror/27">Horror</Link><br />
          <Link className="genre" to="/genres/Music/10402">Music</Link><br />
          <Link className="genre" to="/genres/Mystery/9648">Mystery</Link><br />
          <Link className="genre" to="/genres/Romance/10749">Romance</Link><br />
          <Link className="genre" to="/genres/Science%20Fiction/878">Science&nbsp;Fiction</Link><br />
          <Link className="genre" to="/genres/Thriller/53">Thriller</Link><br />
          <Link className="genre" to="/genres/TV%20Movie/10770">TV Movie</Link><br />
          <Link className="genre" to="/genres/War/10752">War</Link><br />
          <Link className="genre" to="/genres/Western/37">Western</Link>
        </div>
      </ul>
    </>
  )
}


