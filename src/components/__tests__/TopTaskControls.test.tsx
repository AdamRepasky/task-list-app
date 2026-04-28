import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TopTaskControls from '../TopTaskControls'
import { renderWithProvider, mockTasks } from '../../test/test-utils'

describe('TopTaskControls', () => {
  const mockOnAdd = vi.fn()
  const mockOnCompleteAll = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the add task form with complete all button', () => {
    renderWithProvider(
      <TopTaskControls
        onAdd={mockOnAdd}
        tasks={mockTasks}
        onCompleteAll={mockOnCompleteAll}
      />
    )

    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /complete all tasks/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument()
  })

  it('shows check-all icon when there are incomplete tasks', () => {
    const tasksWithIncomplete = mockTasks.filter(task => !task.completed)
    
    renderWithProvider(
      <TopTaskControls
        onAdd={mockOnAdd}
        tasks={tasksWithIncomplete}
        onCompleteAll={mockOnCompleteAll}
      />
    )

    const completeButton = screen.getByRole('button', { name: /complete all tasks/i })
    expect(completeButton).toHaveClass('btn-outline-success')
    expect(completeButton.querySelector('.bi-check-all')).toBeInTheDocument()
  })

  it('shows square icon when all tasks are completed', () => {
    const completedTasks = mockTasks.filter(task => task.completed)
    
    renderWithProvider(
      <TopTaskControls
        onAdd={mockOnAdd}
        tasks={completedTasks}
        onCompleteAll={mockOnCompleteAll}
      />
    )

    const completeButton = screen.getByRole('button', { name: /uncheck all tasks/i })
    expect(completeButton).toHaveClass('btn-outline-warning')
    expect(completeButton.querySelector('.bi-check-all')).toBeInTheDocument()
  })

  it('calls onAdd when form is submitted with valid input', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TopTaskControls
        onAdd={mockOnAdd}
        tasks={mockTasks}
        onCompleteAll={mockOnCompleteAll}
      />
    )

    const input = screen.getByPlaceholderText('Add a new task...')
    const submitButton = screen.getByRole('button', { name: '' })

    await user.type(input, 'New test task')
    await user.click(submitButton)

    expect(mockOnAdd).toHaveBeenCalledWith('New test task')
    expect(input).toHaveValue('')
  })

  it('does not call onAdd when form is submitted with empty input', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TopTaskControls
        onAdd={mockOnAdd}
        tasks={mockTasks}
        onCompleteAll={mockOnCompleteAll}
      />
    )

    const input = screen.getByPlaceholderText('Add a new task...')
    const submitButton = screen.getByRole('button', { name: '' })

    await user.type(input, '   ') // Only whitespace
    await user.click(submitButton)

    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('calls onCompleteAll when complete all button is clicked', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TopTaskControls
        onAdd={mockOnAdd}
        tasks={mockTasks}
        onCompleteAll={mockOnCompleteAll}
      />
    )

    const completeButton = screen.getByRole('button', { name: /complete all tasks/i })
    await user.click(completeButton)

    expect(mockOnCompleteAll).toHaveBeenCalledTimes(1)
  })

  it('trims whitespace from input before calling onAdd', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TopTaskControls
        onAdd={mockOnAdd}
        tasks={mockTasks}
        onCompleteAll={mockOnCompleteAll}
      />
    )

    const input = screen.getByPlaceholderText('Add a new task...')
    const submitButton = screen.getByRole('button', { name: '' })

    await user.type(input, '  Task with spaces  ')
    await user.click(submitButton)

    expect(mockOnAdd).toHaveBeenCalledWith('Task with spaces')
  })

  it('clears input after successful submission', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TopTaskControls
        onAdd={mockOnAdd}
        tasks={mockTasks}
        onCompleteAll={mockOnCompleteAll}
      />
    )

    const input = screen.getByPlaceholderText('Add a new task...')
    const submitButton = screen.getByRole('button', { name: '' })

    await user.type(input, 'Test task')
    await user.click(submitButton)

    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })
})
