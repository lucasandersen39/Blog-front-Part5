import { useState } from 'react'
import './BlogForm.css'
const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <div className="blogFormContainer">
            <h3 className='titleFormNewBlog'>Create new blog</h3>
            <form onSubmit={addBlog} className="blogForm">
                <div className="blogForm__input">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={title}
                        onChange={({ target }) => setTitle(target.value)} name="title" id="title" />
                </div>
                <div className="blogForm__input">
                    <label htmlFor="author">Author</label>
                    <input type="text" value={author}
                        onChange={({ target }) => setAuthor(target.value)} name="author" id="author" />
                </div>
                <div className="blogForm__input">
                    <label htmlFor="url">Url</label>
                    <input type="text" value={url}
                        onChange={({ target }) => setUrl(target.value)} name="url" id="url" />
                </div>
                <div className="blogForm__button">
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm