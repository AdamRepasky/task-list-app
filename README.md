# Task List App

A modern, feature-rich task management application built with React, TypeScript, and Redux Toolkit. This app demonstrates best practices in state management, UI/UX design, and code organization.

## Features

### Core Functionality
- **Task Management**: Create, read, update, and delete tasks
- **Task Completion**: Mark tasks as complete/incomplete with visual feedback
- **Inline Editing**: Double-click tasks to edit them in place
- **Task Filtering**: View all tasks, active tasks only, or completed tasks only
- **Bulk Operations**: Complete all tasks or delete all completed tasks at once

### Advanced Features
- **Optimistic Updates**: Instant UI feedback with automatic rollback on errors
- **Toast Notifications**: Non-intrusive feedback for user actions
- **Loading States**: Smooth loading indicators during API operations
- **Error Handling**: Graceful error states with connection error recovery
- **Internationalization**: Built-in i18n system with English translations (extensible for other languages)
- **Responsive Design**: Mobile-friendly interface that works on all screen sizes

### Technical Highlights
- **Modern Stack**: React 19, TypeScript, Vite, and Redux Toolkit
- **RTK Query**: Efficient data fetching and caching with automatic re-fetching
- **CSS Utility Classes**: Maintainable styling approach with semantic utility classes
- **Component Architecture**: Clean, reusable components with proper separation of concerns
- **Type Safety**: Full TypeScript coverage with strict type checking
- **Testing Setup**: Vitest with React Testing Library for comprehensive testing

## Technology Stack

- **Frontend**: React 19.2.5 with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Bootstrap 5.3.8 with custom utility classes
- **Build Tool**: Vite 8.0.10
- **Testing**: Vitest with React Testing Library
- **Icons**: Bootstrap Icons 1.13.1
- **API Mocking**: MSW (Mock Service Worker) for development

## Installation

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-list-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with visual UI
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── components/          # React components
│   ├── TaskItem.tsx    # Individual task component with inline editing
│   ├── TaskList.tsx    # Task list container with filtering
│   ├── TopTaskControls.tsx # Add task and complete all functionality
│   ├── BottomTaskControls.tsx # Filter controls and bulk delete
│   ├── Toast.tsx       # Toast notification component
│   └── ToastContainer.tsx # Toast container management
├── store/              # Redux store configuration
│   ├── apiSlice.ts     # RTK Query API definitions with optimistic updates
│   ├── filterSlice.ts  # Task filtering state management
│   └── hooks.ts        # Typed Redux hooks
├── hooks/              # Custom React hooks
│   └── useTaskActions.ts # Consolidated task operation logic
├── i18n/               # Internationalization
│   ├── index.ts        # i18n configuration
│   └── en.ts          # English translations
├── utils/              # Utility functions
│   └── optimisticUpdateUtils.ts # Optimistic update helpers
├── types/              # TypeScript type definitions
│   └── task.ts         # Task-related types
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## API Integration

The application is designed to work with a REST API running on `http://localhost:8080`. The API endpoints include:

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `POST /tasks/:id` - Update task text
- `POST /tasks/:id/complete` - Mark task as complete
- `POST /tasks/:id/incomplete` - Mark task as incomplete
- `DELETE /tasks/:id` - Delete a task

## Key Features Explained

### Optimistic Updates
All task operations use optimistic updates to provide instant UI feedback. If an API call fails, the UI automatically rolls back to the previous state, ensuring a smooth user experience even with network issues.

### Internationalization
The app includes a complete i18n system that can easily be extended to support multiple languages. Currently supports English with a structured translation system.

### Responsive Design
The interface adapts seamlessly to different screen sizes using Bootstrap's responsive grid system and custom utility classes.

### Error Handling
Comprehensive error handling ensures users are informed of connection issues and can continue using the app with a degraded experience when the API is unavailable.

## Development Notes

- The app uses semantic CSS utility classes for maintainability
- Component logic is properly separated with custom hooks
- State management follows Redux Toolkit best practices
- TypeScript provides full type safety throughout the application
- The codebase is structured for scalability and easy maintenance
