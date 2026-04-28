import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from '../TaskItem'
import { renderWithProvider } from '../../test/test-utils'
import type { Task } from '../../types/task'

describe('TaskItem', () => {
  const mockOnToggle = vi.fn()
  const mockOnDelete = vi.fn()
  const mockOnEdit = vi.fn()

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
        onEdit={mockOnEdit}
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
        onEdit={mockOnEdit}
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
        onEdit={mockOnEdit}
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
        onEdit={mockOnEdit}
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
        onEdit={mockOnEdit}
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
        onEdit={mockOnEdit}
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
        onEdit={mockOnEdit}
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
        onEdit={mockOnEdit}
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
        onEdit={mockOnEdit}
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
        onEdit={mockOnEdit}
      />
    )

    const deleteButton = screen.getByRole('button', { name: '' })
    
    await user.click(deleteButton)
    await user.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledTimes(2)
    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })

  // Task editing tests
  it('enters edit mode on double click', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const taskText = screen.getByText('Test task')
    await user.dblClick(taskText)

    // Should show input field instead of text
    expect(screen.queryByText('Test task')).not.toBeInTheDocument()
    expect(screen.getByDisplayValue('Test task')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('calls onEdit when save button is clicked with new text', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const taskText = screen.getByText('Test task')
    await user.dblClick(taskText)

    const input = screen.getByDisplayValue('Test task')
    await user.clear(input)
    await user.type(input, 'Updated task')

    const saveButton = screen.getByRole('button', { name: 'Save' })
    await user.click(saveButton)

    expect(mockOnEdit).toHaveBeenCalledWith('1', 'Updated task')
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })

  it('calls onEdit when Enter key is pressed with new text', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const taskText = screen.getByText('Test task')
    await user.dblClick(taskText)

    const input = screen.getByDisplayValue('Test task')
    await user.clear(input)
    await user.type(input, 'Updated task')
    await user.keyboard('{Enter}')

    expect(mockOnEdit).toHaveBeenCalledWith('1', 'Updated task')
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })

  it('does not call onEdit when text is unchanged', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const taskText = screen.getByText('Test task')
    await user.dblClick(taskText)

    const saveButton = screen.getByRole('button', { name: 'Save' })
    await user.click(saveButton)

    expect(mockOnEdit).not.toHaveBeenCalled()
  })

  it('does not call onEdit when text is only whitespace', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const taskText = screen.getByText('Test task')
    await user.dblClick(taskText)

    const input = screen.getByDisplayValue('Test task')
    await user.clear(input)
    await user.type(input, '   ')
    
    const saveButton = screen.getByRole('button', { name: 'Save' })
    await user.click(saveButton)

    expect(mockOnEdit).not.toHaveBeenCalled()
  })

  it('cancels edit when Escape key is pressed', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const taskText = screen.getByText('Test task')
    await user.dblClick(taskText)

    const input = screen.getByDisplayValue('Test task')
    await user.clear(input)
    await user.type(input, 'Updated task')
    await user.keyboard('{Escape}')

    // Should return to original text
    expect(screen.getByText('Test task')).toBeInTheDocument()
    expect(screen.queryByDisplayValue('Updated task')).not.toBeInTheDocument()
    expect(mockOnEdit).not.toHaveBeenCalled()
  })

  it('cancels edit when clicking outside', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const taskText = screen.getByText('Test task')
    await user.dblClick(taskText)

    const input = screen.getByDisplayValue('Test task')
    await user.clear(input)
    await user.type(input, 'Updated task')
    
    // Simulate click outside by clicking on document body
    await user.click(document.body)

    // Should return to original text
    expect(screen.getByText('Test task')).toBeInTheDocument()
    expect(screen.queryByDisplayValue('Updated task')).not.toBeInTheDocument()
    expect(mockOnEdit).not.toHaveBeenCalled()
  })

  it('trims whitespace when saving', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const taskText = screen.getByText('Test task')
    await user.dblClick(taskText)

    const input = screen.getByDisplayValue('Test task')
    await user.clear(input)
    await user.type(input, '  Updated task with spaces  ')
    
    const saveButton = screen.getByRole('button', { name: 'Save' })
    await user.click(saveButton)

    expect(mockOnEdit).toHaveBeenCalledWith('1', 'Updated task with spaces')
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })

  it('shows pointer cursor on hover when not editing', () => {
    renderWithProvider(
      <TaskItem
        task={mockTask}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
      />
    )

    const taskContainer = screen.getByText('Test task').closest('div')?.parentElement
    expect(taskContainer).toHaveStyle('cursor: pointer')
  })
})
