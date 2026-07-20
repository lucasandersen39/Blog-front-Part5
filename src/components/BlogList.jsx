import './BlogList.css'
import BlogListItem from './BlogListItem'
const BlogList = ({ blogs }) => {
    const blogListStyle = {
        margin: "10px",
        backgroudColor: "#3ebed2"

    }
    return (
        <div>
            {blogs.map(blog => (
                <BlogListItem key={blog.id} blog={blog} style={blogListStyle} />
            ))}
        </div>
    )
}

export default BlogList