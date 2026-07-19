const BlogList = ({ blogs }) => {
    return (
        <div>
            {blogs.map(blog => (
                <div key={blog.id} className="blog">
                    <div>
                        {blog.title} {blog.author}
                    </div>
                    <div>
                        {blog.url}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default BlogList