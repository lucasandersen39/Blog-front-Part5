import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogListItem from './BlogListItem'
import { expect, test, vi } from 'vitest'

test('renders the blog title and author', () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: {
      id: 'user123',
      name: 'Test User'
    }
  }
  const user = {
    id: 'user123',
    name: 'Test User'
  }

  const { container } = render(<BlogListItem blog={blog} user={user} />)
  const titleElement = screen.getByText('Test Blog')
  const authorElement = screen.getByText('Test Author')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()

  const detailDiv = container.querySelector('.bodyBlogItem')
  expect(detailDiv).toHaveStyle('display: none')

  const urlElement = screen.queryByText('http://testblog.com')
  const likesElement = screen.queryByText('Likes: 5')

  expect(detailDiv).not.toBeVisible()
  expect(urlElement).not.toBeVisible()
  expect(likesElement).not.toBeVisible()
})

test('clicking the view button shows blog details', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: {
      id: 'user123',
      name: 'Test User'
    }
  }
  const user = {
    id: 'user123',
    name: 'Test User'
  }
  const { container } = render(<BlogListItem blog={blog} user={user} />)
  const userSetup = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userSetup.click(viewButton)

  const detailDiv = container.querySelector('.bodyBlogItem')
  expect(detailDiv).toHaveStyle('display: block')
  const urlElement = screen.getByText('http://testblog.com')
  const likesElement = screen.getByText('Likes: 5')
  expect(urlElement).toBeVisible()
  expect(likesElement).toBeVisible()
})

test('clicking the like button twice calls the event handler twice', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: {
      id: 'user123',
      name: 'Test User'
    }
  }
  const user = {
    id: 'user123',
    name: 'Test User'
  }
  const mockHandler = vi.fn()
  render(<BlogListItem blog={blog} user={user} handleLikeButton={mockHandler} />)
  const userSetup = userEvent.setup()
  const viewButton = screen.getByText('view')
  await userSetup.click(viewButton)
  const likeButton = screen.getByText('like')
  await userSetup.click(likeButton)
  await userSetup.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})