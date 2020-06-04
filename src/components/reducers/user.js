import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    accessToken: null,
    userId: null,
    userName: null,
    loggedIn: false,
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
      state.login.accessToken = accessToken
    },
    setUserId: (state, action) => {
      const { userId } = action.payload
      state.login.userId = userId
    },
    setUserName: (state, action) => {
      const { userName } = action.payload
      state.login.userName = userName
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

export const handleLogin = (name, password, setLoggedIn) => {
  const LOGIN_URL = 'http://localhost:8080/sessions';
  return (dispatch) => new Promise(function(resolve, reject) {
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          setLoggedIn(false)
          dispatch(user.actions.setErrorMessage({ errorMessage: 'Username and/or password is incorrect!' }))
          throw 'Username and/or password is incorrect!'
        } 
        return res.json();
      })
      .then((json) => {
        if (json.errors) {
          setLoggedIn(false)
          dispatch(user.actions.setErrorMessage({ errorMessage: 'Username and/or password is incorrect!' }))
          return false
        } else {
          dispatch(
            user.actions.setAccessToken({
              accessToken: json.accessToken,
            })
          )
          dispatch(user.actions.setUserId({ userId: json.userId }))
          dispatch(user.actions.setUserName({ userName: json.userName }))
          setLoggedIn(true)
        } 
      })
      .catch((err) => {
        dispatch(logout())
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
    }
  )
};

export const logout = (setLoggedIn) => {
  return (dispatch) => {
    setLoggedIn(false)
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setUserId({ userId: 0 }))
  };
};
