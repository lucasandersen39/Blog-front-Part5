import './Notification.css'
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div class="containerNotification">
      <div className={`notification ${type}`}>
        {message}
      </div>
    </div>
  )
}

export default Notification