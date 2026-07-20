import { render, screen } from '@testing-library/react'
import BlogListItem from './BlogListItem'
import { expect, test } from 'vitest'

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