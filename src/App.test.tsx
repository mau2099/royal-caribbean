import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
    return res(ctx.json([
      { id: 1, title: 'Test 1', completed: false },
      { id: 2, title: 'Test 2', completed: true },
      { id: 3, title: 'Test 3', completed: false }
    ]))
  })
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe(__filename, () => {
  test('renders without errors', async () => {
    render(<App />);
    await act(async () => await new Promise((r) => setTimeout(r, 1000)))
    expect(screen.getByText(/test 1/i)).toBeInTheDocument()
    expect(screen.getByText(/test 2/i)).toBeInTheDocument()
    expect(screen.getByText(/test 3/i)).toBeInTheDocument()
  })
})
