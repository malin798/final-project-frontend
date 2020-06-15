import React from 'react'
import { Link } from 'react-router-dom'
import { RightArrow } from '../components/RightArrow'

export const Accordion = () => {

  const toggle = () => {
    this.classList.toggle('active')

    return (
      <header className="hamburger-menu">
        <div id="menuToggle">
          <input type="checkbox" />
          <div></div>
          <div></div>
          <div></div>
          <ul id="menu">
            <Link
              className="accordion-link1" >
              <li>Genres</li></Link>
            <Link className="accordion-link2" to="/"> <li>Movies</li></Link>
            <Link className="accordion-link3" to="/" ><li>Latest releases</li></Link>
            <Link className="accordion-link4" to="/" ><li>Upcoming</li></Link>
            <div class="alt">
              <p>Lorem ipsum...</p>
            </div>
          </ul>
        </div>
      </header>
    )
  }


  /*   onClick={(event) => handleClick(event)}
  
  const handleClick = () => {
      event.preventDefault()*/


  accordion - link1.onclick = toggle
  accordion - link2.onclick = toggle
  accordion - link3.onclick = toggle
  accordion - link3.onclick = toggle