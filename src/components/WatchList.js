import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { WatchListItem } from '../components/WatchListItem'


export const WatchList = (title) => {
  const movies = useSelector((store) => store.user.watchlist.title)

  return (
    <div className="watch-list">
      <ul className="watch-list-items">


        <WatchListItem title={title} />
        )
      </ul>
    </div>

  )
}


     // {movies.map((movie) => (
//{movies.map((title) => (
//<Link className="watch-item" to="/"> <li>title={title}</li></Link>

