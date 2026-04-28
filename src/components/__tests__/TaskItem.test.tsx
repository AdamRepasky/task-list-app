import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from '../TaskItem'
import { renderWithProvider } from '../../test/test-utils'
import type { Task } from '../../types/task'

describe('TaskItem', () => {
  const mockOnToggle = vi.fn()
  const mockOnDelete = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  const mockTask: Task = {
    id: '1',
    text: 'Test task',
    completed: false,
    createdDate: Date.now(),
  }

  const completedTask: Task = {
    id: '2',
    text: 'Completed task',
    completed: true,
    createdDate: Date.now(),
  }

  it('renders task with correct text and unchecked checkbox', () => {
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Test task')).toBeInTheDocument()
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    expect(screen.getByRole('button', { name: '' })).toBeInTheDocument()
  })

  it('renders completed task with checked checkbox and strikethrough text', () => {
    renderWithProvider(
      <TaskItem
        task={completedTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Completed task')).toBeInTheDocument()
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
    
    const taskText = screen.getByText('Completed task')
    expect(taskText).toHaveClass('text-decoration-line-through', 'text-muted')
  })

  it('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)

    expect(mockOnToggle).toHaveBeenCalledWith('1')
    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByRole('button', { name: '' })
    await user.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledWith('1')
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  it('does not call onToggle when clicking on task text', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const taskText = screen.getByText('Test task')
    await user.click(taskText)

    expect(mockOnToggle).not.toHaveBeenCalled()
    expect(mockOnDelete).not.toHaveBeenCalled()
  })

  it('renders with correct CSS classes', () => {
    const { container } = renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const taskContainer = container.querySelector('.d-flex')
    expect(taskContainer).toHaveClass('d-flex', 'align-items-center', 'gap-3', 'p-3', 'bg-light', 'border-top')
  })

  it('renders delete button with correct styling', () => {
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByRole('button', { name: '' })
    expect(deleteButton).toHaveClass('btn', 'btn-outline-danger', 'rounded-circle')
  })

  it('renders checkbox with correct styling', () => {
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveClass('form-check-input')
  })

  it('handles multiple toggle clicks correctly', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    
    await user.click(checkbox)
    await user.click(checkbox)
    await user.click(checkbox)

    expect(mockOnToggle).toHaveBeenCalledTimes(3)
    expect(mockOnToggle).toHaveBeenCalledWith('1')
  })

  it('handles multiple delete clicks correctly', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getByRole('button', { name: '' })
    
    await user.click(deleteButton)
    await user.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledTimes(2)
    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })
})
