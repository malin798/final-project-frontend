import React from 'react'
import { Link } from 'react-router-dom'
import { RightArrow } from '../components/RightArrow'

export const Accordion = () => {
  return (
    <header className="hamburger-menu">
      <div id="menuToggle">
        <input type="checkbox" />
        <div></div>
        <div></div>
        <div></div>
        <ul id="menu">
          <Link className="accordion-link" to="/"> <li>Movies</li></Link>
          <Link className="accordion-link" to="/" ><li>Genres</li></Link>
          <Link className="accordion-link" to="/" ><li>Latest releases</li></Link>
          <Link className="accordion-link" to="/" ><li>Upcoming</li></Link>
        </ul>
      </div>
    </header>
  )
}