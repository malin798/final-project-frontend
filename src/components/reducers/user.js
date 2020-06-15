import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    accessToken: null,
    userId: null,
    userName: null,
  },
  watchlist: [],
  searchResults: [],
  searchResultsAllPages: null
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
    setSearchResults: (state, action) => {
      const { results } = action.payload
      state.searchResults = results
    },
    setSearchResultsAllPages: (state, action) => {
      const { pages } = action.payload
      state.searchResultsAllPages = pages
    },
    setWatchlistItem: (state, action) => {
      const { title, id } = action.payload
      console.log("item added to watchlist", title, id)
      state.watchlist.push({ "title": title, "showId": id })
    }
  },
})

export const setSearchResults = (results) => {
  return async (dispatch) => {
    dispatch(user.actions.setSearchResults({ results }))
  }
}

export const setSearchResultsAllPages = (pages) => {
  return async (dispatch) => {
    dispatch(user.actions.setSearchResultsAllPages({ pages }))
  }
}

export const addToWatchlist = (title, id) => {
  return async (dispatch) => {
    dispatch(user.actions.setWatchlistItem({ title, id }))
  }
}

export const handleSignup = (name, email, password, setErrorMessage) => {
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
        if (!res.ok) {
          setErrorMessage('Could not create user!')
        }
        return res.json()
      })
      .then((json) => {
        if (json.errors) {
          setErrorMessage(json.message)
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
        setErrorMessage("Could not create user!")
      })
  }
}

export const handleLogin = (name, password, setErrorMessage, setLoggedIn) => {
  const LOGIN_URL = 'http://localhost:8080/sessions';
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          dispatch(logout(setLoggedIn))
          setErrorMessage('Username and/or password is incorrect!')
          throw 'Username and/or password is incorrect!'
        }
        return res.json();
      })
      .then((json) => {
        if (json.errors) {
          setLoggedIn(false)
          dispatch(logout(setLoggedIn))
          setErrorMessage('Username and/or password is incorrect!')
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
        dispatch(logout(setLoggedIn))
        setErrorMessage('Username and/or password is incorrect!')
      })
  }
}

export const logout = (setLoggedIn) => {
  setLoggedIn(false)
  return (dispatch) => {
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setUserId({ userId: 0 }))
  };
};