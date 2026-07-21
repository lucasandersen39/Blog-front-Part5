import './BlogList.css'

import { useState } from 'react'
// import blogService from '../services/blogs'
import BtnDelete from './BtnDelete'

const BlogListItem = ({ blog, user, handleDelete, handleLikeButton, editBlog }) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonLabel(!visible ? 'hidden' : 'view')
  }

  const showDisplay = { display: visible ? '' : 'none' }
  return (
    <div className="blog">
      <div className='titleBlog'>
        <div>
          <span className="blog-title">{blog.title}</span> -
          <span className="blog-author"> {blog.author}</span>
        </div>
        <div className="blog-buttons">
          <button onClick={toggleVisibility}>{buttonLabel}</button>
          <button onClick={() => editBlog(blog.id)}>Edit</button>
        </div>
      </div>
      <div className='bodyBlogItem' style={showDisplay}>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          Likes: {blog.likes} <button onClick={handleLikeButton}>like</button>
        </div>
        <div>
          {blog.user ? blog.user.name : ''}
        </div>
        {blog.user && blog.user.id === user.id && (
          <BtnDelete confirmMessage={`Remove blog ${blog.title}`} handleDelete={handleDelete} id={blog.id} />
        )}
      </div>
    </div>
  )
}

export default BlogListItem