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
// import { Test } from './pages/Test'
import { Hamburger } from './components/Hamburger'
import { MovieItem } from './pages/MovieItem'
import { ActorPage } from './pages/ActorPage'
import { ImageSliderAndTitle } from './components/ImageSliderAndTitle'


const API_KEY = process.env.REACT_APP_API_KEY

dotenv.config()

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer: reducer })

export const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  return (

    <Provider store={store}>
      <BrowserRouter>

        < Navbar loggedIn={loggedIn} />

        <Switch>

          <Route exact path='/signin' >
            {loggedIn ? <Redirect to='/profile' /> : < Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
          </Route>

          <Route exact path='/register' >
            < Register />
          </Route>

          <Route exact path='/profile' >
            {!loggedIn ? <Redirect to='/signin' /> : < Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
          </Route>

          <Route exact path='/genres' >
            
          </Route>

          <Route exact path='/genres/:id' >
            
          </Route>

          <Route exact path="/movie/:id" >
            < MovieItem API_KEY={API_KEY} />
          </Route>

          <Route exact path="/actor/:id" >
            < ActorPage API_KEY={API_KEY} />
          </Route>

          <Route exact path="/startpage" >
            < ImageSliderAndTitle fetchlink={`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`} fetchtitle="Now playing" />
            < ImageSliderAndTitle fetchlink={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`} fetchtitle="Top rated" />
            < ImageSliderAndTitle fetchlink={`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`} fetchtitle="Upcoming" />
          </Route>

          <Route exact path="/hamburger" >
            < Hamburger />
          </Route>

        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

