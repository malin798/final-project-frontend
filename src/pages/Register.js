import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { user, handleLogin, handleSignup } from '../components/reducers/user';
import { Accountheader } from '../components/Accountheader'
import { Linksection } from '../components/Linksection'
import { Errormessage } from '../components/Errormessage'

export const Register = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmedPassword, setConfirmedPassword] = useState()

  console.log("error message", errorMessage)
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(user.actions.setError({ error: false }))
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))

    if (password !== confirmedPassword) {
      dispatch(user.actions.setErrorMessage({ errorMessage: "Passwords do not match" }))
      dispatch(user.actions.setError({ error: true }))
    } else {
      dispatch(handleSignup(name, email, password))
      history.push(`/signin`)
    }
  }

  return (
    <section className="login-register-container">
      <section className="login-register">

        < Accountheader title="Register new account" />

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

          <label for="email">
            <p>
              E-mail
          </p>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              id="email"
              required>
            </input>
          </label>

          <label for="password">
            <p>
              Password
          </p>
            <input
              minLength="6"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="password"
              required>
            </input>
          </label>

          <label for="confirmed-password">
            <p>
              Confirm password
          </p>

<<<<<<< HEAD
          {errorMessage &&
            < Errormessage errormessage={errorMessage} />
          }

          <button type="submit">
            Create user
            =======
            <input
              value={confirmedPassword}
              onChange={(event) => setConfirmedPassword(event.target.value)}
              type="password"
              id="confirmed-password"
              required>
            </input>
          </label>

          <button type="submit">
            Create user
            >>>>>>> jennifer_development
          </button>
        </form>

        < Linksection title="Already got an account?" link="/signin" linkTitle="Sign in" />

      </section>
    </section>
  )
}
