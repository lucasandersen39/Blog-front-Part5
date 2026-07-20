
const BtnDelete = ({ confirmMessage, handleDelete, id }) => {

  const deleteAction = () => {
    if (window.confirm(confirmMessage)) {
      handleDelete(id)
    }
  }

  return (
    <div>
      <button onClick={deleteAction}>remove</button>
    </div>
  )
}

export default BtnDelete