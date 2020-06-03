import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { user } from './components/reducers/user'
import { Navbar } from './components/Navbar'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

const reducer = combineReducers({ user: user.reducer });

const store = configureStore({ reducer: reducer })

export const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY

  return (

    <Provider store={store}>
      <BrowserRouter>

        < Navbar />

        <Switch>

          <Route exact path='/signin' >
            < Login />
          </Route>

          <Route exact path='/register' >
            < Register />
          </Route>

      </Switch>
    </BrowserRouter>
    </Provider>
    
  )
}
