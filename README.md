# Task Manager CLI

A simple and efficient command-line task management application built with Node.js. Manage your tasks directly from the terminal with full CRUD operations and status tracking.

## Features

- ✅ Add new tasks with name and description
- 📋 List all tasks or filter by status
- ✏️ Update existing tasks
- 🗑️ Delete tasks
- 🔄 Update task status (todo, in-progress, done)
- 💾 Persistent storage using JSON file
- 🛡️ Robust error handling and input validation
- 📊 Clean table output for task listing

## Prerequisites

- Node.js (version 14 or higher)
- ES6 modules support

## Installation

1. Clone or download the `task-manager.js` file
2. Ensure you have Node.js installed
3. No additional dependencies required - uses only Node.js built-in modules

## Usage

Run the script using Node.js with the following commands:

### Add a New Task
```bash
node task-manager.js add "Task Name" "Task Description"
```
**Example:**
```bash
node task-manager.js add "Learn Node.js" "Complete the Node.js tutorial and build a CLI app"
```

### List All Tasks
```bash
node task-manager.js list
```

### List Tasks by Status
```bash
node task-manager.js list <status>
```
**Valid statuses:** `todo`, `in-progress`, `done`

**Examples:**
```bash
node task-manager.js list todo
node task-manager.js list in-progress
node task-manager.js list done
```

### Update a Task
```bash
node task-manager.js update <id> "New Name" "New Description"
```
**Example:**
```bash
node task-manager.js update 1 "Advanced Node.js" "Learn advanced Node.js concepts and patterns"
```

### Mark Task as In Progress
```bash
node task-manager.js mark-in-progress <id>
```
**Example:**
```bash
node task-manager.js mark-in-progress 1
```

### Mark Task as Done
```bash
node task-manager.js mark-done <id>
```
**Example:**
```bash
node task-manager.js mark-done 1
```

### Delete a Task
```bash
node task-manager.js delete <id>
```
**Example:**
```bash
node task-manager.js delete 1
```

### Show Help
```bash
node task-manager.js
```

## Task Structure

Each task contains the following fields:

- `id`: Unique identifier (auto-generated)
- `name`: Task name
- `description`: Task description
- `status`: Current status (`todo`, `in-progress`, `done`)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Data Storage

Tasks are stored in a `tasks.json` file in the same directory as the script. The file is automatically created when you add your first task.

## Error Handling

The application includes comprehensive error handling for:

- Missing or invalid parameters
- Invalid task IDs
- Non-existent tasks
- Invalid status values
- File operation errors
- Malformed JSON data

## Example Workflow

```bash
# Add some tasks
node task-manager.js add "Setup project" "Initialize Node.js project with package.json"
node task-manager.js add "Write code" "Implement the core functionality"
node task-manager.js add "Testing" "Write and run tests"

# List all tasks
node task-manager.js list

# Start working on a task
node task-manager.js mark-in-progress 1

# List only in-progress tasks
node task-manager.js list in-progress

# Complete a task
node task-manager.js mark-done 1

# Update a task
node task-manager.js update 2 "Write clean code" "Implement core functionality with proper error handling"

# Delete a task
node task-manager.js delete 3
```

## File Structure

```
project-folder/
├── task-manager.js    # Main application file
└── tasks.json         # Data storage (auto-created)
```

## Technical Details

- **Language**: JavaScript (ES6+)
- **Runtime**: Node.js
- **Storage**: Local JSON file
- **Modules**: ES6 import/export
- **Dependencies**: None (uses Node.js built-ins)

## Error Examples

The application provides clear error messages:

```bash
# Missing parameters
$ node task-manager.js add
Usage: add <name> <description>

# Invalid ID
$ node task-manager.js update abc "test" "test"
ID must be a valid number

# Task not found
$ node task-manager.js delete 999
Task with id 999 not found

# Invalid status
$ node task-manager.js list invalid
Invalid status: invalid
Valid statuses: todo, in-progress, done
```

## Contributing

This is a single-file project. To extend functionality:

1. Add new command cases to the `main()` function
2. Implement corresponding async functions
3. Follow the existing error handling patterns
4. Update this README with new commands

## License

MIT License - Feel free to use and modify as needed.

## Tips

- Use quotes around task names and descriptions that contain spaces
- Task IDs are automatically generated and start from 1
- The application creates a backup-friendly JSON format
- All operations are atomic - either fully succeed or fail gracefully