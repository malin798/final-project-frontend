import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { setSearchResults, setSearchResultsAllPages } from '../reducers/user'
import { RightArrow } from '../RightArrow'
import { SearchSVG } from './SearchSVG'

export const Searchbar = ({ API_KEY }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const results = useSelector((store) => store.user.searchResults).slice(0, 5)

  const [searchValue, setSearchValue] = useState("")
  const [optionValue, setOptionValue] = useState("title")
  const [visible, setVisible] = useState(false)

  let URL;
  let PATH;

  switch (optionValue) {
    case "title":
      URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
      PATH = `/search-results/movie/${searchValue}`
      break;
    case "actor":
      URL = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=1&include_adult=false`
      PATH = `/search-results/actor/${searchValue}`
      break;
  }

  const handleSearch = (event) => {
    event.preventDefault()

    fetch(URL)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        dispatch(setSearchResults(res.results))
        dispatch(setSearchResultsAllPages(res.total_pages))
        setVisible(true)
      })
  }

  const handleClick = () => {
    console.log(PATH)
    setVisible(false)
    setSearchValue("")
    history.push(PATH)
  }

  return (
    <section className="searchbar-and-filter">
      <select
        onChange={(event) => { setOptionValue(event.target.value); setVisible(false) }}
      >

        <option>
        </option>

        <option
          value="title"
        >
          Title
        </option>

        <option
          value="actor"
        >
          Actor
        </option>

      </select>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        type="text"
      >
      </input>
      {optionValue === "title" ?
        <div className={`search-results ${visible ? "visible" : ""}`}>
          {results.map(item => {
            return (
              <Link to={`/movie/${item.id}`}
                onClick={() => { setVisible(false); setSearchValue("") }}>
                {item.title} < RightArrow />
              </Link>
            )
          })}
          <button onClick={(event) => handleClick(event)}>To all results</button>
        </div>
        :
        <div className={`search-results ${visible ? "visible" : ""}`}>
          {results.map(item => {
            return (
              <Link to={`/actor/${item.id}`}
                onClick={() => { setVisible(false); setSearchValue("") }}>
                {item.name} < RightArrow />
              </Link>
            )
          })}
          <button onClick={(event) => handleClick(event)}>To all results</button>
        </div>
      }
      <button className="search-emoji" onClick={(event) => handleSearch(event)}> 🔍 </button>
    </section>


  )
}