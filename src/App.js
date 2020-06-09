import React, { useState } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { user } from './components/reducers/user'
import { Navbar } from './components/Navbar'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Profile } from './pages/Profile'
import dotenv from 'dotenv'
import { Hamburger } from './components/Hamburger'
import { MovieItem } from './pages/MovieItem'
import { ActorPage } from './pages/ActorPage'
import { MovieSlider } from './components/MovieSlider'
import { ViewMoreMovies } from './pages/ViewMoreMovies'
import layingPlaceholder from './images/placeholderL.png'
import standingPlaceholder from './images/placeholderS.png'


const API_KEY = process.env.REACT_APP_API_KEY

dotenv.config()

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer: reducer })

export const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [loggedIn, setLoggedIn] = useState(false)
  console.log("loggedin app.js", loggedIn)

  return (

    <Provider store={store}>
      <BrowserRouter>

        < Navbar loggedIn={loggedIn} />

        <Switch>

          <Route exact path="/" >
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=1`}
              fetchtitle="Trending today" 
              imageOrientation={"standing"}
              placeholder={standingPlaceholder} 
              titlelink="/trending-today"
              />

            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1`}
              fetchtitle="Trending this week" 
              imageOrientation={"laying"}
              placeholder={layingPlaceholder} 
              titlelink="/trending-week"
              />

            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`} 
              fetchtitle="Now&nbsp;playing" 
              placeholder={layingPlaceholder} 
              imageOrientation={"laying"}
              titlelink="/now-playing"
              />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`} 
              fetchtitle="Top&nbsp;rated" 
              placeholder={standingPlaceholder} 
              imageOrientation={"standing"}
              titlelink="/top-rated"
              />
            < MovieSlider
              loggedIn={loggedIn}
              fetchlink={`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`} 
              fetchtitle="Upcoming" 
              imageOrientation={"laying"}
              placeholder={layingPlaceholder} 
              titlelink="/upcoming"
              />
          </Route>

          <Route exact path='/now-playing' >
            < ViewMoreMovies
              API_KEY={API_KEY} 
              loggedIn={loggedIn}
              fetchtitle="Now&nbsp;playing" 
              placeholder={standingPlaceholder} 
              fetchlink={`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=`}
            />
          </Route>

          <Route exact path='/upcoming' >
            < ViewMoreMovies
              API_KEY={API_KEY} 
              loggedIn={loggedIn}
              fetchtitle="Upcoming" 
              placeholder={standingPlaceholder} 
              fetchlink={`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=`}
            />
          </Route>

          <Route exact path='/top-rated' >
            < ViewMoreMovies
              API_KEY={API_KEY} 
              loggedIn={loggedIn}
              fetchtitle="Top&nbsp;rated" 
              placeholder={standingPlaceholder} 
              fetchlink={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=`}
            />
          </Route>

          <Route exact path='/trending-week' >
            < ViewMoreMovies
              API_KEY={API_KEY} 
              loggedIn={loggedIn}
              fetchtitle="Trending" 
              placeholder={standingPlaceholder} 
              fetchlink={`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=`}
            />
          </Route>

          <Route exact path='/trending-today' >
            < MovieSlider
              API_KEY={API_KEY} 
              loggedIn={loggedIn}
              fetchtitle="Trending today" 
              placeholder={standingPlaceholder} 
              fetchlink={`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US&page=`}
              imageOrientation={"standing"}
              />
          </Route>

          <Route exact path='/signin' >
            {loggedIn ? <Redirect to='/profile' /> : < Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          </Route>

          <Route exact path='/register' >
            < Register />
          </Route>

          <Route exact path='/profile' >
            {!loggedIn ? <Redirect to='/signin' /> : < Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          </Route>

          <Route exact path='/genres' >

          </Route>

          <Route exact path='/genres/:name/:id' >
            < ViewMoreMovies
              API_KEY={API_KEY} 
              placeholder={standingPlaceholder} 
              loggedIn={loggedIn} 
            />
          </Route>

          <Route exact path="/movie/:id" >
            < MovieItem API_KEY={API_KEY} loggedIn={loggedIn} />
          </Route>

          <Route exact path="/actor/:id" >
            < ActorPage API_KEY={API_KEY} loggedIn={loggedIn} />

          </Route>

          <Route exact path="/hamburger" >
            < Hamburger />
          </Route>

        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

