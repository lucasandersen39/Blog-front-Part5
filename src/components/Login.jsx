import './Login.css'
import loginService from '../services/login'
const Login = ({ username, setUsername, password, setPassword, setUser, setErrorMessage }) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        const credential = {
            username: username,
            password: password
        }
        try {
            const resultLogin = await loginService.login(credential)
            setUser(resultLogin)
            setUsername('')
            setPassword('')
            window.localStorage.setItem(
                'loggedBlogsappUser', JSON.stringify(resultLogin)
            )
        } catch (exception) {
            setErrorMessage(exception?.response?.data?.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    return (
        <div className="loginFormContainer">
            <h3 className='titleLogin'>Login</h3>
            <form onSubmit={handleLogin} className="loginForm">
                <div className="loginForm__input">
                    Username
                    <input type="text" name="username" value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div className="loginForm__input">
                    Password
                    <input type='password' name='password' value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div className="loginForm__button">
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login