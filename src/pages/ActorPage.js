import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export const ActorPage = ({ API_KEY }) => {

  const params = useParams()
  const actorId = params.id
  const URL_PAGE = `https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`
  const URL_IMAGES = `https://api.themoviedb.org/3/person/${actorId}/tagged_images?api_key=${API_KEY}&language=en-US`
  const URL_MOVIES = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast=${actorId}`
  
  const [actor, setActor] = useState()
  const [images, setImages] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  console.log(popularMovies)

  useEffect(() => {
    fetch(URL_PAGE)
      .then(res => res.json())
      .then(json => {
        setActor(json)
      })

      fetch(URL_MOVIES)
      .then(res => res.json())
      .then(json => {
        setPopularMovies(json.results)
      })

      fetch(URL_IMAGES)
      .then(res => res.json())
      .then(json => {
        setImages(json.profiles)
      })
  }, [])
  console.log(actor)
  if (!actor) {
    return (
      <div>
        Loading
      </div>
    )
  } else { 
    return (
      <div>
      {actor.birthday}, {actor.place_of_birth}
        {actor.name}

        <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}>
        </img>

        {actor.birthday}
        {actor.biography}
        {images && images.map(image => {
          return (
          <img src={`https://image.tmdb.org/t/p/w200/${image.file_path}`}>
          </img>
          )
        })
        }
        {popularMovies.map(movie => {
          return (
            <Link to={`/movie/${movie.id}`}>
              {movie.title}
            </Link>
          )
        })}
      </div>
    )
  }
}