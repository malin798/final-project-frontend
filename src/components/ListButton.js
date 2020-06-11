import React from 'react'

export const ListButton = () => {
  /*  const { _id } = movie
    //const XXX = 'http://localhost:8080'
    const URL_MOVIE = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    const WATCH_LIST = ``
  
    const [xxx, setXxxx] = useState("")
    const [movie, setMovie] = useState("")
    const [clicked, setClicked] = useState("")
  
  
    // When the button is clicked the handleClick function will post "or address" this movie 
    const handleClick = () => {
      event.preventDefault();
      fetch(WATCH_LIST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
        body: JSON.stringify({}),
      })
        .then(() => { })
    }
  */
  // eslint-disable-next-line no-lone-blocks
  {
    /*
        return (
          <div
            ///onClick={handleClick}
            //The css class changes depending on if the button is clicked or not.
            className="listbutton"
          > +
          </div >
        )
      }
    }
    */


    return (
      <div className="rightArrowContainer">
        <svg className="rightarrow"
          width={12}
          height={12}
          viewBox="0 0 438.5 438.5">
          <path d="M29.4 329.3c19.6 33.6 46.2 60.2 79.8 79.8 33.6 19.6 70.3 29.4 110.1 29.4s76.5-9.8 110.1-29.4c33.6-19.6 60.2-46.2 79.8-79.8 19.6-33.6 29.4-70.3 29.4-110.1s-9.8-76.5-29.4-110.1c-19.6-33.6-46.2-60.2-79.8-79.8C295.7 9.8 259 0 219.3 0c-39.8 0-76.5 9.8-110.1 29.4C75.6 49 49 75.6 29.4 109.2 9.8 142.8 0 179.5 0 219.3c0 39.7 9.8 76.4 29.4 110zm120.5-197.7c-3.6-3.6-5.4-7.9-5.4-12.8s1.8-9.2 5.4-12.8L179 76.8c3.6-3.6 7.9-5.4 12.8-5.4 5 0 9.2 1.8 12.9 5.4l129.6 129.6c3.6 3.6 5.4 7.9 5.4 12.8s-1.8 9.2-5.4 12.8L204.7 361.7c-3.6 3.6-7.9 5.4-12.9 5.4-4.9 0-9.2-1.8-12.8-5.4l-29.1-29.1c-3.6-3.6-5.4-7.9-5.4-12.8s1.8-9.2 5.4-12.8l87.6-87.6-87.6-87.8z"></path>
        </svg>
      </div>
    )
  }
}
