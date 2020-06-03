import { createSlice } from '@reduxjs/toolkit'

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

  return async (dispatch) => {
    await fetch(SIGNUP_URL, {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password 
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        dispatch(user.actions.setErrorMessage({ errorMessage: 'Could not create user!' }))
        throw 'Could not create user!'
      })
      .then((json) => {
        if (json.errors) {
          dispatch(user.actions.setErrorMessage({ errorMessage: json.message }))
        } else {
          dispatch(
            user.actions.setAccessToken({
              accessToken: json.accessToken,
            })
          )
          dispatch(user.actions.setUserId({ userId: json.userId }))
        }
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err.message }))
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
        dispatch(user.actions.setErrorMessage({ errorMessage: 'Username and/or password is incorrect!' }))
        throw 'Username and/or password is incorrect!';
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
        dispatch(logout())
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
