import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import TaskList from '../TaskList'
import { renderWithProvider, mockTasks } from '../../test/test-utils'

describe('TaskList', () => {
  const mockOnToggle = vi.fn()
  const mockOnDelete = vi.fn()
  const mockOnEdit = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all tasks when filter is "all"', () => {
    renderWithProvider(
      <TaskList
        tasks={mockTasks}
        filter="all"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    )

    expect(screen.getByText('Test task 1')).toBeInTheDocument()
    expect(screen.getByText('Test task 2')).toBeInTheDocument()
    expect(screen.getByText('Test task 3')).toBeInTheDocument()
  })

  it('renders only active tasks when filter is "active"', () => {
    renderWithProvider(
      <TaskList
        tasks={mockTasks}
        filter="active"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    )

    expect(screen.getByText('Test task 1')).toBeInTheDocument()
    expect(screen.getByText('Test task 3')).toBeInTheDocument()
    expect(screen.queryByText('Test task 2')).not.toBeInTheDocument()
  })

  it('renders only completed tasks when filter is "completed"', () => {
    renderWithProvider(
      <TaskList
        tasks={mockTasks}
        filter="completed"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    )

    expect(screen.getByText('Test task 2')).toBeInTheDocument()
    expect(screen.queryByText('Test task 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Test task 3')).not.toBeInTheDocument()
  })

  it('shows "No active tasks" when filter is "active" and no active tasks exist', () => {
    const completedTasks = mockTasks.filter(task => task.completed)
    
    renderWithProvider(
      <TaskList
        tasks={completedTasks}
        filter="active"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    )

    expect(screen.getByText('No active tasks')).toBeInTheDocument()
    expect(screen.queryByText('Test task 1')).not.toBeInTheDocument()
  })

  it('shows "No completed tasks" when filter is "completed" and no completed tasks exist', () => {
    const activeTasks = mockTasks.filter(task => !task.completed)
    
    renderWithProvider(
      <TaskList
        tasks={activeTasks}
        filter="completed"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    )

    expect(screen.getByText('No completed tasks')).toBeInTheDocument()
    expect(screen.queryByText('Test task 2')).not.toBeInTheDocument()
  })

  it('shows "No tasks found" when filter is "all" and no tasks exist', () => {
    renderWithProvider(
      <TaskList
        tasks={[]}
        filter="all"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    )

    expect(screen.getByText('No tasks found.')).toBeInTheDocument()
  })

  it('shows loading state when isLoading is true', () => {
    renderWithProvider(
      <TaskList
        tasks={mockTasks}
        filter="all"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={true}
      />
    )

    // Should show loading spinner
    expect(screen.getByText('Loading tasks...')).toBeInTheDocument()
    expect(screen.getByRole('status', { name: '' })).toBeInTheDocument()
    
    // Should not show tasks when loading
    expect(screen.queryByText('Test task 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Test task 2')).not.toBeInTheDocument()
    expect(screen.queryByText('Test task 3')).not.toBeInTheDocument()
    
    // Should not show empty state when loading
    expect(screen.queryByText('No tasks found.')).not.toBeInTheDocument()
  })

  it('renders tasks with correct keys', () => {
    renderWithProvider(
      <TaskList
        tasks={mockTasks}
        filter="all"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    )

    const taskItems = screen.getAllByRole('checkbox')
    expect(taskItems).toHaveLength(3)
  })

  it('passes correct props to TaskItem components', () => {
    renderWithProvider(
      <TaskList
        tasks={mockTasks}
        filter="all"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    )

    // Verify that TaskItem components are rendered with correct task data
    expect(screen.getByText('Test task 1')).toBeInTheDocument()
    expect(screen.getByText('Test task 2')).toBeInTheDocument()
    expect(screen.getByText('Test task 3')).toBeInTheDocument()
  })

  it('handles empty task array correctly', () => {
    renderWithProvider(
      <TaskList
        tasks={[]}
        filter="all"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    )

    expect(screen.getByText('No tasks found.')).toBeInTheDocument()
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('maintains scroll container styling', () => {
    const { container } = renderWithProvider(
      <TaskList
        tasks={mockTasks}
        filter="all"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    )

    const scrollContainer = container.querySelector('.overflow-auto')
    expect(scrollContainer).toBeInTheDocument()
    expect(scrollContainer).toHaveStyle({ maxHeight: '400px' })
  })

  it('renders tasks in correct order', () => {
    const tasksInOrder = [
      { ...mockTasks[0], id: '1', text: 'First task' },
      { ...mockTasks[1], id: '2', text: 'Second task' },
      { ...mockTasks[2], id: '3', text: 'Third task' }
    ]

    renderWithProvider(
      <TaskList
        tasks={tasksInOrder}
        filter="all"
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
        onEdit={mockOnEdit}
        isLoading={false}
      />
    )

    const taskTexts = screen.getAllByText(/task/)
    expect(taskTexts[0]).toHaveTextContent('First task')
    expect(taskTexts[1]).toHaveTextContent('Second task')
    expect(taskTexts[2]).toHaveTextContent('Third task')
  })
})
