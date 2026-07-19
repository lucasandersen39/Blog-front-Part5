
const Logout = ({ setUser }) => {
    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogsappUser')
    }
    return (
        <button type="button" onClick={handleLogout}>Logout</button>
    )

}

export default Logout