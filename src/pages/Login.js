import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { user, handleLogin } from '../components/reducers/user'
import { Linksection } from '../components/Linksection'
import { Accountheader } from '../components/Accountheader'
import { Errormessage } from '../components/Errormessage'
import { createNextState } from '@reduxjs/toolkit'

export const Login = ({ loggedIn, setLoggedIn }) => {
  const history = useHistory()
  const dispatch = useDispatch();

  const errorMessage = useSelector((store) => store.user.login.errorMessage)
  const accessToken = useSelector((store) => store.user.login.accessToken)
  const userId = useSelector((store) => store.user.login.userId)

  const [name, setName] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(handleLogin(name, password, setLoggedIn))
  }

  return (
    <section className="login-register-container">

      <section className="login-register">

        < Accountheader title="Sign in to account" />

        <form onSubmit={(event) => handleSubmit(event)}>
          <label for="username">
            <p>
              Username
        </p>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              id="username"
              required>
            </input>
          </label>

          <label for="password">
            <p>
              Password
        </p>

            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="password"
              required>
            </input>
          </label>

          {error &&
            < Errormessage errorMessage="Username and/or password is incorrect!" />
          }

          <button type="submit"> Sign in </button>

        </form>

        < Linksection title="New user? " link="/register" linkTitle="Register new account" />

      </section>
    </section>


  )
}