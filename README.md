# 📝 Task List App

A modern task management app built with React, TypeScript, and Redux Toolkit.

## ✨ Features

- **📋 Task Management**: Create, edit, delete, and complete tasks
- **✏️ Inline Editing**: Double-click (desktop) or long-press (mobile) to edit tasks
- **🔍 Filtering**: View all, active, or completed tasks
- **⚡ Bulk Actions**: Complete all or delete completed tasks
- **🔄 Optimistic Updates**: Instant UI feedback with automatic rollback
- **📱 Mobile Friendly**: Touch support and responsive design
- **🌐 Internationalization**: Ready for multiple languages - no hardcoded strings (English included)
- **🔔 Toast Notifications**: Non-intrusive error messages

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Redux Toolkit** with RTK Query
- **Bootstrap 5** + custom utility classes
- **Vite** for development
- **Vitest** for testing

## 🚀 Quick Start

```bash
# Clone and install
git clone <repository-url>
cd task-list-app
npm install

# Start development
npm run dev
```


## 📁 Project Structure

```
src/
├── components/    # React components
├── store/         # Redux setup
├── hooks/         # Custom hooks
├── i18n/          # Translations
├── utils/         # Helper functions
└── types/         # TypeScript definitions
```

## 🔧 API

Connects to REST API at `http://localhost:8080` for task operations. (I didn't 
containerise the app using Docker, as it was not a requirement.)

## 🎯 Key Features

- **Optimistic Updates**: Instant UI feedback that rolls back on errors
- **Mobile Support**: Long-press to edit on touch devices
- **Fixed Layout**: Consistent container height prevents layout shifts
- **Error Recovery**: Graceful handling of connection issues
