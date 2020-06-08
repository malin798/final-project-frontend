import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MovieSlider } from '../components/MovieSlider'
import placeholder from '../images/phil-desforges-oQd5dwDWu_8-unsplash.jpg'
import { ImageSlider } from '../components/ImageSlider'

export const ActorPage = ({ API_KEY }) => {

  const params = useParams()
  const actorId = params.id
  const URL_PAGE = `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`
  const URL_IMAGES = `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${API_KEY}`
  const URL_POPULARMOVIES = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast=${actorId}`
  
  const [actor, setActor] = useState()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  console.log(images)

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

        {images && images.length > 1 &&
          <div>
            <h4>Images: </h4>
            <ImageSlider>
              {images.map(image => {
                return (
                <img src={`https://image.tmdb.org/t/p/w200/${image.file_path}`}>
                </img>
                )
              })
              }
            </ImageSlider>
          </div>
        }

        < MovieSlider fetchlink= {URL_POPULARMOVIES} fetchtitle="Similar movies:" placeholder={placeholder} />
        
      </div>
    )
  }
}