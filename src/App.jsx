import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

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

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    try {
      const resultCreateBlog = await blogService.create(blogObject, user.token)
      setBlogs(blogs.concat(resultCreateBlog))
    } catch (exception) {
      console.log(exception)
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
        <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser} setErrorMessage={setErrorMessage} /> :
        <div>
          <p>{user.name} logged in</p>
          <BlogForm handleCreateBlog={handleCreateBlog} />
          <h2>Blogs</h2>
          <BlogList blogs={blogs} />
        </div>
      }

    </div>
  )
}

export default App