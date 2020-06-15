import React from 'react'
import { useDispatch } from 'react-redux'
import { user } from '../components/reducers/user';


export const WatchListItem = ({ title }) => {
  const dispatch = useDispatch()

  return (
    <li>
      <p>{title}</p>
    </li>
  )
}


/*   <span className="actions">
        <button type="button" onClick={() => dispatch(movie.actions.removeItem(movie))}>-</button>
        <button type="button" onClick={() => dispatch(movie.actions.addItem(movie))}>+</button>
      </span>*/