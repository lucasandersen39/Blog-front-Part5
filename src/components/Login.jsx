import './Login.css'
const Login = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div className="loginFormContainer">
      <h3 className='titleLogin'>Login</h3>
      <form onSubmit={handleLogin} className="loginForm">
        <div className="loginForm__input">
          Username
          <input type="text" name="username" value={username} data-testid="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="loginForm__input">
          Password
          <input type='password' name='password' value={password} data-testid="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="loginForm__button">
          <button type='submit' data-testid="login-button">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login