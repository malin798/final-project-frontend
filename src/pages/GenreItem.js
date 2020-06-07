import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ImageSliderAndTitle} from '../components/ImageSliderAndTitle'
import { ImageSlider } from '../components/ImageSlider'

export const GenreItem = () => {
//fetcha en specifik genre från movielänken..
  const params = useParams()
  const genreId = params.id

  const URL = `https://api.themoviedb.org/3/discover/movie?api_key=3d60d24f587752713f5e7b71902de8f8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`

  return (
    <div>
      genres
    </div>
   
  )
}