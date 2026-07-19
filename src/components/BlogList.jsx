import './BlogList.css'
const BlogList = ({ blogs }) => {
    return (
        <div>
            {blogs.map(blog => (
                <div key={blog.id} className="blog">
                    <div>
                        {blog.title}
                    </div>
                    <div className='blogAuthor'>
                        {blog.author}
                    </div>
                    <div>
                        <a href={blog.url}>{blog.url}</a>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BlogList