import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Logout from './components/Logout'
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    try {
      const resultCreateBlog = await blogService.createBlog(blogObject)
      setBlogs(blogs.concat(resultCreateBlog))

    } catch (exception) {
      console.log(exception)
      setErrorMessage(exception?.response?.data?.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const credential = {
      username: username,
      password: password
    }
    try {
      const resultLogin = await loginService.login(credential)
      blogService.setToken(resultLogin.token)
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
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} /> :
        <div>
          <p style={{ textAlign: "end" }}>Username: {user.name} <Logout setUser={setUser} /></p>
          <BlogForm handleCreateBlog={handleCreateBlog} />
          <h2>Blogs</h2>
          <BlogList blogs={blogs} />
        </div>
      }

    </div>
  )
}

export default App