import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
    } catch (exception) {
      console.log(exception)
      setErrorMessage(exception?.response?.data?.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input type="text" name="username" value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input type='password' name='password' value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  }

  const blogForm = () => {
    <form>
      <div>
        Title
        <input type="text" name="title" />
      </div>
      <div>
        Author
        <input type="text" name="author" />
      </div>
      <div>
        Url
        <input type="text" name="url" />
      </div>
      <div>
        <button type="submit">Create</button>
      </div>
    </form>
  }

  return (
    <div>
      <div>{errorMessage != '' ? errorMessage : ''}</div>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
        </div>
      }
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App