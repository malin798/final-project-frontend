import React, { useState } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { user } from './components/reducers/user'
import { Navbar } from './components/Navbar'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Profile } from './pages/Profile'
import dotenv from 'dotenv'
import { Test } from './pages/Test'
import { Hamburger } from './components/Hamburger'
import { ImageSlider } from './components/ImageSlider'



dotenv.config()

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer: reducer })

export const App = () => {
  //const API_KEY = process.env.REACT_APP_API_KEY
  const [loggedIn, setLoggedIn] = useState(false)

  return (

    <Provider store={store}>
      <BrowserRouter>

        < Navbar loggedIn={loggedIn} />

        <Switch>

          <Route exact path='/signin' >
            {loggedIn ? <Redirect to='/profile' /> : < Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          </Route>

          <Route exact path='/register' >
            < Register />
          </Route>

          <Route exact path='/profile' >
            {!loggedIn ? <Redirect to='/signin' /> : < Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          </Route>

          <Route exact path="/test" >
            < Test />
          </Route>

          <Route exact path="/hamburger" >
            < Hamburger />
          </Route>

        </Switch>
      </BrowserRouter>
    </Provider>
  )
}
