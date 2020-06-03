import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'

import {createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';


const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    error: false,
    errorMessage: null,
  },
};

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload
      console.log(`Access Token: ${accessToken}`)
      state.login.accessToken = accessToken
    },
    setUserId: (state, action) => {
      const { userId } = action.payload
      console.log(`User Id: ${userId}`)
      state.login.userId = userId
    },
    setError: (state, action) => {
      const { error } = action.payload
      console.log(`Error: ${error}`)
      state.login.error = error
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload
      console.log(`Error Message: ${errorMessage}`)
      state.login.errorMessage = errorMessage
    },
  },
})

export const handleSignup = (name, email, password) => {
  const SIGNUP_URL = 'http://localhost:8080/users'

  return (dispatch) => {
    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Could not create account.  Try a different username.'
        }
        return res.json()
      })
      .then((json) => {
        console.log("handle signup in user.js")
        // dispatch(
        //   user.actions.setAccessToken({
        //     accessToken: json.accessToken,
        //   })
        // );
        // dispatch(user.actions.setUserId({ userId: json.userId }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}

export const handleLogin = (name, password) => {
  const LOGIN_URL = 'http://localhost:8080/sessions';
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw 'Unable to sign in. Please check your username and password are correct';
      })
      .then((json) => {
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        )
        dispatch(user.actions.setUserId({ userId: json.userId }))
      })
      .catch((err) => {
        dispatch(user.actions.logout())
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setUserId({ userId: 0 }))
  };
};
