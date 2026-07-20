import './BlogList.css'

import { useState } from 'react'
import blogService from '../services/blogs'
import BtnDelete from './BtnDelete'

const BlogListItem = ({ blog, user, handleDelete }) => {
    const [visible, setVisible] = useState(false)
    const [buttonLabel, setButtonLabel] = useState('view')
    const [likes, setLikes] = useState(blog.likes)

    const toggleVisibility = () => {
        setVisible(!visible)
        setButtonLabel(!visible ? 'hidden' : 'view')
    }

    const handleLikeButton = async () => {
        const likesIncremented = likes + 1
        const updatedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: likesIncremented,
            user: (blog.user ? blog.user.id : null)
        }
        const response = await blogService.updateBlog(blog.id, updatedBlog)
        setLikes(response.likes ? response.likes : 1)
    }

    const showDisplay = { display: visible ? '' : 'none' }
    return (
        <div className="blog">
            <div className='titleBlog'>
                {blog.title} <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div className='bodyBlogItem' style={showDisplay}>
                <div className='blogAuthor'>
                    {blog.author}
                </div>
                <div>
                    <a href={blog.url}>{blog.url}</a>
                </div>
                <div>
                    Likes: {likes} <button onClick={handleLikeButton}>like</button>
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