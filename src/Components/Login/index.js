import React, { useState } from 'react'
import Cookies from 'js-cookie'
import './index.css'

const Login = (props) => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isError,setIsError] = useState(false)
    const [errorMsgs,setErrorMsg] = useState('')

    const onChangeUsername = event => {
        setUsername(event.target.value)
      }
    
    const onChangePassword = event => {
        setPassword( event.target.value)
      }
    

    const onSubmitFailure = errorMsg => {
        setIsError(true)
        setErrorMsg(errorMsg)
      }

    const onSubmitSuccess = (jwt_token) => {
        const {history} = props

        Cookies.set('jwt_token',jwt_token,{expires:1})        
        history.replace('/')
      }
    

    const submitForm =async (event) => {
        event.preventDefault()
        const url = 'https://apis.ccbp.in/login'
        const options = {
            method : 'POST',
            body : JSON.stringify({username,password})
        }

        const response = await fetch(url,options)
        const data = await response.json()
        if (response.ok === true){
            onSubmitSuccess(data.jwt_token)
        }else {
            console.log(data)
            onSubmitFailure(data.error_msg)
        }

    }
   const renderUsernameField = () => {
    
        return (
          <>
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={onChangeUsername}
              placeholder="Username"
            />
          </>
        )
      }

     const renderPasswordField = () => {
        return (
          <>
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={password}
              onChange={onChangePassword}
              placeholder="Password"
            />
          </>
        )
      }

  return (
    <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{renderUsernameField()}</div>
          <div className="input-container">{renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {isError  && <p className="error-message">*{errorMsgs}</p>}
        </form>
      </div>
  )
}

export default Login
