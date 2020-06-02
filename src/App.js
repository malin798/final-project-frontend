import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from '@reduxjs/toolkit'
import { user } from './components/reducers/user'
import { Navbar } from './components/Navbar' 
import { Login } from './pages/Login' 
import { Register } from './pages/Register' 

// create persisted store 

const reducer = combineReducers({ user: user.reducer })

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
  } catch (e) {
    console.log(e)
  }
}

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state")
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    console.log(e)
    return undefined
  }
}

const persistedState = loadFromLocalStorage()

const store = createStore(
  reducer, 
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  store.subscribe(() => saveToLocalStorage(store.getState())
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
