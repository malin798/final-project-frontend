import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ImageSliderAndTitle } from '../components/ImageSliderAndTitle'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const ActorPage = ({ API_KEY }) => {

  const params = useParams()
  const actorId = params.id
  const URL_PAGE = `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`
  const URL_IMAGES = `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${API_KEY}&language=en-US`
  const URL_POPULARMOVIES = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast=${actorId}`
  
  const [actor, setActor] = useState()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(URL_PAGE)
      .then(res => res.json())
      .then(json => {
        setActor(json)
      })

      fetch(URL_IMAGES)
      .then(res => res.json())
      .then(json => {
        setImages(json.profiles)
        setLoading(false)
      })
  }, [actorId])

  if (!actor || loading) {
    return (
      <div>
        Loading
      </div>
    )
  } else { 
    return (
      <div>
        <h2>{actor.name}</h2>
      <h3>Born:</h3>
      {actor.birthday}, {actor.place_of_birth}

        <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}>
        </img>
        
        <h3>Biography:</h3>
        {actor.biography}

        
        {images && images.map(image => {
          return (
          <img src={`https://image.tmdb.org/t/p/w200/${image.file_path}`}>
          </img>
          )
        })
        }

        < ImageSliderAndTitle fetchlink={URL_POPULARMOVIES} fetchtitle="Also starring in:" />
        
      </div>
    )
  }
}