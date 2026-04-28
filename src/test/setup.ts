import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { http } from 'msw'

// Mock API handlers
export const handlers = [
  // Get all tasks
  http.get('http://localhost:8080/tasks', () => {
    return Response.json([
      {
        id: '1',
        text: 'Test task 1',
        completed: false,
        createdDate: Date.now() - 10000,
      },
      {
        id: '2',
        text: 'Test task 2',
        completed: true,
        createdDate: Date.now() - 5000,
      },
    ])
  }),

  // Create task
  http.post('http://localhost:8080/tasks', () => {
    return Response.json({
      id: '3',
      text: 'New task',
      completed: false,
      createdDate: Date.now(),
    }, { status: 201 })
  }),

  // Complete task
  http.post('http://localhost:8080/tasks/:id/complete', ({ params }) => {
    const { id } = params
    return Response.json({
      id,
      text: 'Updated task',
      completed: true,
      completedDate: Date.now(),
      createdDate: Date.now() - 10000,
    })
  }),

  // Incomplete task
  http.post('http://localhost:8080/tasks/:id/incomplete', ({ params }) => {
    const { id } = params
    return Response.json({
      id,
      text: 'Updated task',
      completed: false,
      createdDate: Date.now() - 10000,
    })
  }),

  // Delete task
  http.delete('http://localhost:8080/tasks/:id', () => {
    return new Response(null, { status: 204 })
  }),
]

// Setup MSW server
export const server = setupServer(...handlers)

// Start server before all tests
beforeAll(() => server.listen())

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Close server after all tests
afterAll(() => server.close())
