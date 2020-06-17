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
        <li className="genres" onClick={() => handleClick()}>Genres
          < RightArrow visible={visible} />
        </li>
        <div className={`hamburger-menu-genre-accordion ${visible ? "visible" : ""}`}>
          <Link className="genre" to="/genres"><p>All Genres</p></Link>
          <Link className="genre" to="/genres/Action/28"><p>Action</p></Link>
          <Link className="genre" to="/genres/Adventure/12"><p>Adventure</p></Link>
          <Link className="genre" to="/genres/Animation/16"><p>Animation</p></Link>
          <Link className="genre" to="/genres/Comedy/35"><p>Comedy</p></Link>
          <Link className="genre" to="/genres/Crime/80"><p>Crime</p></Link>
          <Link className="genre" to="/genres/Documentary/99"><p>Documentary</p></Link>
          <Link className="genre" to="/genres/Drama/18"><p>Drama</p></Link>
          <Link className="genre" to="/genres/Family/10751"><p>Family</p></Link>
          <Link className="genre" to="/genres/Fantasy/14"><p>Fantasy</p></Link>
          <Link className="genre" to="/genres/History/36"><p>History</p></Link>
          <Link className="genre" to="/genres/Horror/27"><p>Horror</p></Link>
          <Link className="genre" to="/genres/Music/10402"><p>Music</p></Link>
          <Link className="genre" to="/genres/Mystery/9648"><p>Mystery</p></Link>
          <Link className="genre" to="/genres/Romance/10749"><p>Romance</p></Link>
          <Link className="genre" to="/genres/Science%20Fiction/878"><p>Science Fiction</p></Link>
          <Link className="genre" to="/genres/Thriller/53"><p>Thriller</p></Link>
          <Link className="genre" to="/genres/TV%20Movie/10770"><p>TV Movie</p></Link>
          <Link className="genre" to="/genres/War/10752"><p>War</p></Link>
          <Link className="genre" to="/genres/Western/37"><p>Western</p></Link>
        </div>
      </ul>
    </>
  )
}


