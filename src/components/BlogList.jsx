import { useState } from 'react'
import './BlogList.css'
import BlogListItem from './BlogListItem'
const BlogList = ({ blogs, user, handleDeleteBlog }) => {
    const [orderBy, setOrderBy] = useState('title')
    const blogListStyle = {
        margin: "10px",
        backgroundColor: "#3ebed2"

    }

    const orderedBlogs = [...blogs].sort((a, b) => {
        if (orderBy === 'title') {
            return a.title.localeCompare(b.title)
        } else if (orderBy === 'author') {
            return a.author.localeCompare(b.author)
        } else if (orderBy === 'likes') {
            return b.likes - a.likes
        }
        return 0
    })

    return (
        <div>
            <div>
                Order by <select value={orderBy} onChange={e => setOrderBy(e.target.value)}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="likes">Likes</option>
                </select>
            </div>
            {orderedBlogs.map(blog => (
                <BlogListItem key={blog.id} blog={blog} style={blogListStyle} user={user} handleDelete={handleDeleteBlog} />
            ))}
        </div>
    )
}

export default BlogList