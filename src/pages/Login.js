import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { user, login } from '../components/reducers/user';
import { Linksection } from '../components/Linksection'
import { Accountheader } from '../components/Accountheader' 
import { Errormessage} from '../components/Errormessage'

export const Login = () => {

  const dispatch = useDispatch();
  // const accessToken = useSelector((store) => store.users.login.accessToken);

  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(name, password));
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

        {error && 
          < Errormessage errorMessage="Username and/or password is incorrect!" />
        }

        <button type="submit"> Sign in </button>
        
      </form>

      < Linksection title="New user? " link="/register" linkTitle="Register new account"/>
  
      </section>
    </section>
    
  )
}