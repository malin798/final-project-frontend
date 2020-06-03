import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { user, handleLogin } from '../components/reducers/user'
import { Linksection } from '../components/Linksection'
import { Accountheader } from '../components/Accountheader' 
import { Errormessage} from '../components/Errormessage'

export const Login = () => {

  const dispatch = useDispatch();
  const errorMessage = useSelector((store) => store.user.login.errorMessage);
  // const accessToken = useSelector((store) => store.users.login.accessToken);
console.log(errorMessage)
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(handleLogin(name, password))
  }

  return (
    <section className="login-register-container">
      <section className="login-register">

      < Accountheader title="Sign in to account"/>

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

        {errorMessage && 
          < Errormessage errormessage={errorMessage} />
        }

        <button type="submit"> Sign in </button>
        
      </form>

      < Linksection title="New user? " link="/register" linkTitle="Register new account"/>
  
      </section>
    </section>
    
  )
}