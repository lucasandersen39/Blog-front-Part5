import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  // Obtener el elemento con name=title -> <input type="text" value={title}            onChange={({ target }) => setTitle(target.value)} name="title" id="title" />
  const inputTitle = screen.getByLabelText('Title')
  const inputAuthor = screen.getByLabelText('Author')
  const inputUrl = screen.getByLabelText('Url')
  const sendButton = screen.getByRole('button', { name: 'Create' })

  await user.type(inputTitle, 'Testing a form...')
  await user.type(inputAuthor, 'Test Author')
  await user.type(inputUrl, 'http://testurl.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing a form...')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://testurl.com')

})