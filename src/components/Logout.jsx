
const Logout = ({ setUser }) => {
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogsappUser')
  }
  return (
    <button type="button" onClick={handleLogout} data-testid="logout-button">Logout</button>
  )

}

export default Logout