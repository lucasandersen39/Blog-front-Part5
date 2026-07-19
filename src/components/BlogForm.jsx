import './BlogForm.css'
const BlogForm = ({ handleCreateBlog }) => {
    return (
        <div className="blogFormContainer">
            <h3 className='titleFormNewBlog'>Create new blog</h3>
            <form onSubmit={handleCreateBlog} className="blogForm">
                <div className="blogForm__input">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" />
                </div>
                <div className="blogForm__input">
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" id="author" />
                </div>
                <div className="blogForm__input">
                    <label htmlFor="url">Url</label>
                    <input type="text" name="url" id="url" />
                </div>
                <div className="blogForm__button">
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm