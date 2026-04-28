import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BottomTaskControls from '../BottomTaskControls'
import { renderWithProvider, mockTasks } from '../../test/test-utils'

describe('BottomTaskControls', () => {
  const mockOnFilterChange = vi.fn()
  const mockOnDeleteCompleted = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders task count, filter buttons, and delete button', () => {
    renderWithProvider(
      <BottomTaskControls
        filter="all"
        onFilterChange={mockOnFilterChange}
        tasks={mockTasks}
        onDeleteCompleted={mockOnDeleteCompleted}
      />
    )

    expect(screen.getByText(/2 unfinished items remaining/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete completed/i })).toBeInTheDocument()
  })

  it('shows correct task count for different task states', () => {
    const allCompletedTasks = mockTasks.filter(task => task.completed)
    
    renderWithProvider(
      <BottomTaskControls
        filter="all"
        onFilterChange={mockOnFilterChange}
        tasks={allCompletedTasks}
        onDeleteCompleted={mockOnDeleteCompleted}
      />
    )

    expect(screen.getByText(/0 unfinished items remaining/)).toBeInTheDocument()
  })

  it('highlights the active filter button', () => {
    renderWithProvider(
      <BottomTaskControls
        filter="active"
        onFilterChange={mockOnFilterChange}
        tasks={mockTasks}
        onDeleteCompleted={mockOnDeleteCompleted}
      />
    )

    const activeButton = screen.getByRole('button', { name: 'Active' })
    const allButton = screen.getByRole('button', { name: 'All' })
    const completedButton = screen.getByRole('button', { name: 'Completed' })

    expect(activeButton).toHaveClass('btn-primary')
    expect(allButton).toHaveClass('btn-outline-primary')
    expect(completedButton).toHaveClass('btn-outline-primary')
  })

  it('calls onFilterChange when filter buttons are clicked', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <BottomTaskControls
        filter="all"
        onFilterChange={mockOnFilterChange}
        tasks={mockTasks}
        onDeleteCompleted={mockOnDeleteCompleted}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Active' }))
    expect(mockOnFilterChange).toHaveBeenCalledWith('active')

    await user.click(screen.getByRole('button', { name: 'Completed' }))
    expect(mockOnFilterChange).toHaveBeenCalledWith('completed')

    await user.click(screen.getByRole('button', { name: 'All' }))
    expect(mockOnFilterChange).toHaveBeenCalledWith('all')
  })

  it('disables delete button when there are no completed tasks', () => {
    const incompleteTasks = mockTasks.filter(task => !task.completed)
    
    renderWithProvider(
      <BottomTaskControls
        filter="all"
        onFilterChange={mockOnFilterChange}
        tasks={incompleteTasks}
        onDeleteCompleted={mockOnDeleteCompleted}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /delete completed/i })
    expect(deleteButton).toBeDisabled()
  })

  it('enables delete button when there are completed tasks', () => {
    renderWithProvider(
      <BottomTaskControls
        filter="all"
        onFilterChange={mockOnFilterChange}
        tasks={mockTasks}
        onDeleteCompleted={mockOnDeleteCompleted}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /delete completed/i })
    expect(deleteButton).not.toBeDisabled()
  })

  it('calls onDeleteCompleted when delete button is clicked', async () => {
    const user = userEvent.setup()
    
    renderWithProvider(
      <BottomTaskControls
        filter="all"
        onFilterChange={mockOnFilterChange}
        tasks={mockTasks}
        onDeleteCompleted={mockOnDeleteCompleted}
      />
    )

    const deleteButton = screen.getByRole('button', { name: /delete completed/i })
    await user.click(deleteButton)

    expect(mockOnDeleteCompleted).toHaveBeenCalledTimes(1)
  })

  it('shows singular "item" when there is one unfinished task', () => {
    const singleTask = [mockTasks[0]] // Only one incomplete task
    
    renderWithProvider(
      <BottomTaskControls
        filter="all"
        onFilterChange={mockOnFilterChange}
        tasks={singleTask}
        onDeleteCompleted={mockOnDeleteCompleted}
      />
    )

    expect(screen.getByText(/1 unfinished item remaining/)).toBeInTheDocument()
  })

  it('shows plural "items" when there are multiple unfinished tasks', () => {
    const multipleTasks = mockTasks.filter(task => !task.completed) // 2 incomplete tasks
    
    renderWithProvider(
      <BottomTaskControls
        filter="all"
        onFilterChange={mockOnFilterChange}
        tasks={multipleTasks}
        onDeleteCompleted={mockOnDeleteCompleted}
      />
    )

    expect(screen.getByText(/2 unfinished items remaining/)).toBeInTheDocument()
  })
})
