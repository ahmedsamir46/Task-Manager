# Task Manager

A simple, responsive task management web app that lets you create, search, filter, complete, edit, delete, import, and export tasks. Built with HTML, CSS, and vanilla JavaScript on top of Bootstrap, Font Awesome, and SweetAlert2.

## Features
- **Create tasks** with a title, description, and optional due date
- **Search** tasks by text
- **Filter** by status: Completed, Not Completed, or All
- **Mark complete / not complete**
- **Edit and delete** tasks
- **Import / Export** tasks as JSON via dedicated pages
- **Persistent storage** in the browser using `localStorage`
- **Responsive UI** using Bootstrap 5

## Tech Stack
- **HTML5**
- **CSS3** (custom styles in `css/style.css`)
- **JavaScript (ES Modules)** (main logic loaded via `js/script.js`)
- **Bootstrap 5.3** (layout and components)
- **Font Awesome 7** (icons)
- **SweetAlert2** (polished dialogs/alerts)

## Project Structure
```
/task manager/
├── index.html          # Main app (task list, create form, search & filter)
├── import.html         # Import tasks from a JSON file
├── export.html         # Export tasks to a JSON file
├── README.md           # This documentation
├── css/
│   └── style.css       # App styles (search box, task card hover, etc.)
└── js/
    ├── script.js       # Core app logic (rendering, CRUD, search, filter)
    ├── data.js         # Data helpers (storage, schema) [if present]
    ├── import.js       # Logic for importing tasks [if present]
    └── export.js       # Logic for exporting tasks [if present]
```
Note: File names under `js/` may vary; the main entry referenced by `index.html` is `js/script.js`.

## Getting Started
You can run the app in two simple ways:

1) Open directly in a browser
- Double‑click `index.html` (or open it in your browser).

2) Serve with a local static server (recommended)
- Use any simple static server (e.g., VS Code Live Server extension).
- Or with Node.js installed: `npx serve .`

This improves module loading and avoids some browser restrictions when using ES modules.

## Usage
- **Create a task**: Enter Title, optional Date, and Description, then click "Add".
- **Search**: Use the search bar at the top to filter tasks by text.
- **Filter**: Use the "Filter by Status" dropdown to toggle Completed, Not Completed, or All.
- **Complete/Uncomplete**: Toggle a task’s completion state from its card controls.
- **Edit/Delete**: Use the respective controls on each task card.
- **Import**: Go to `Import` from the navbar (via `import.html`) to upload a JSON file of tasks.
- **Export**: Go to `Export` from the navbar (via `export.html`) to download your current tasks as JSON.

## Data & Persistence
- Tasks are stored in the browser’s `localStorage` so they persist between sessions on the same device and browser.
- A typical task object looks like:
```json
{
  "id": "uuid-or-timestamp",
  "title": "Task title",
  "content": "Task description/details",
  "dueDate": "2025-01-31", 
  "completed": "notcompleted",
  "createdAt": "2025-01-15T10:00:00.000Z",
  "updatedAt": "2025-01-15T10:00:00.000Z"
}
```
Note: The exact shape may vary depending on the implementation in `js/script.js`.

## Import / Export Format
- **Export**: Produces a JSON file containing an array of task objects.
- **Import**: Expects a JSON file containing an array of task objects. Importing merges (or replaces) your current tasks depending on the logic implemented in `js/import.js`.

## Styling
- Global styles and the task card UI are defined in `css/style.css`.
- The UI uses Bootstrap classes for layout and responsiveness.

## Troubleshooting
- If opening `index.html` directly shows errors related to module loading, try serving with a local static server (see Getting Started).
- Ensure the referenced paths in HTML match your folder structure:
  - `css/style.css`
  - `js/script.js`
  - and any extra modules under `js/` used by `import.html`/`export.html`.

## Roadmap Ideas
- Add priority levels and tags
- Add sorting (by date, title, status)
- Add drag‑and‑drop reordering
- Add recurring tasks or reminders/notifications
- Multi-device sync via a backend API

## License
This project is licensed under the **MIT License**. See the [`LICENSE`](LICENSE) file for full text.

Copyright (c) 2025 Ahmed Samir
