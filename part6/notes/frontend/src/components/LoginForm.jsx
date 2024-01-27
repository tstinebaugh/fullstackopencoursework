import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  const [loginVisible, setLoginVisible] = useState(false)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>
      <div style={showWhenVisible}>

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>

        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm