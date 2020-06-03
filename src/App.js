import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import {applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { user } from './components/reducers/user'
import { Navbar } from './components/Navbar' 
import { Login } from './pages/Login' 
import { Register } from './pages/Register' 
import thunk from 'redux-thunk';

// create persisted store 

const reducer = combineReducers({ user: user.reducer })

// const saveToLocalStorage = (state) => {
//   try {
//     const serializedState = JSON.stringify(state)
//     localStorage.setItem("state", serializedState)
//   } catch (e) {
//     console.log(e)
//   }
// }

// const loadFromLocalStorage = () => {
//   try {
//     const serializedState = localStorage.getItem("state")
//     if (serializedState === null) return undefined
//     return JSON.parse(serializedState)
//   } catch (e) {
//     console.log(e)
//     return undefined
//   }
// }

// const persistedState = loadFromLocalStorage()

const store = configureStore({reducer:
  reducer}
)

export const App = () => {
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
