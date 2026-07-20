import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Logout from './components/Logout'
import loginService from './services/login'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorType, setErrorType] = useState('')
  const blogFormRef = useRef()

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

  const handleCreateBlog = async (blogObject) => {
    event.preventDefault()
    try {
      const resultCreateBlog = await blogService.createBlog(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(resultCreateBlog))
      setErrorMessage(`a new blog ${resultCreateBlog.title} added`)
      setErrorType('success')
    } catch (exception) {
      console.log(exception)
      setErrorMessage(exception?.response?.data?.error)
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (id) => {
    await blogService.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
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
      setErrorType('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} type={errorType} />
      {user === null ?
        <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} /> :
        <div>
          <p style={{ textAlign: 'end' }}>Username: {user.name} <Logout setUser={setUser} /></p>
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleCreateBlog} />
          </Togglable>
          <h2>Blogs</h2>
          <BlogList blogs={blogs} user={user} handleDeleteBlog={handleDeleteBlog} />
        </div>
      }

    </div>
  )
}

export default App