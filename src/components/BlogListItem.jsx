import './BlogList.css'

import { useState } from 'react'


const BlogListItem = ({ blog }) => {
    const [visible, setVisible] = useState(false)
    const [buttonLabel, setButtonLabel] = useState('view')

    const toggleVisibility = () => {
        setVisible(!visible)
        setButtonLabel(!visible ? 'hiden' : 'view')
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
                    Likes: {blog.likes ? blog.likes : 0} <button>like</button>
                </div>
            </div>
        </div>
    )
}

export default BlogListItem