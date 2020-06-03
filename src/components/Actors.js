import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const MovieDetails = () => {
  const { id } = useParams()
  const [movies, setMovies] = useState([])


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3d60d24f587752713f5e7b71902de8f8&language=en-US`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        setMovies(json)
      })
  }, [id])


    / person / { person_id }