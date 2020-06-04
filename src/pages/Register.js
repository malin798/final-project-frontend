import React, { useState } from 'react'
import { Accountheader } from '../components/Accountheader'
import { Linksection } from '../components/Linksection'
import { Errormessage } from '../components/Errormessage'

export const Register = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmedPassword, setConfirmedPassword] = useState()
  const [errorMessage, setErrorMessage] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (event) => {
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
          </button>
        </form>

        < Linksection title="Already got an account?" link="/signin" linkTitle="Sign in" />

      </section>
    </section>
  )
}
