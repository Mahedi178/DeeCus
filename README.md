# DeeCus

**DeeCus** is a high-performance, developer-focused Pomodoro productivity application. Built with a minimalist "Tokyo Night" aesthetic, it combines deep-work session tracking with a robust task management system.

## 🚀 Key Features

- **Persistent Configuration**: Your custom focus durations, daily goals, and automation settings are saved to `localStorage`, ensuring they survive page reloads
- **Intelligent Session Tracking**: Visual progress indicators (Session Dots) that distinguish between Focus and Break phases without numbering bugs
- **Task Management**: A built-in task list with persistent storage to keep your "to-do" items ready for your next coding session.
- **Developer Aesthetic**: A dark, high-contrast UI inspired by modern code editors like Neovim and Zed, featuring the Nordic Winter/Tokyo Night color palette.
- **Automated Workflows**: Configurable auto-start options for Focus and Break blocks to maintain flow state

## 🛠️ Technical Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS 4.0
- **State Management**: Custom React Hooks (`useTimer`)
- **Persistence**: Browser `localStorage` API
- **Fonts**: Roboto Mono & Fraunces

## 📂 Project Structure

```text
src/
├── components/
│   ├── layout/         # Layout-specific containers (Timer & Task sections)
│   ├── tasks/          # Task-related components (Input, Items, Empty states)
│   ├── timer/          # Core timer UI (Display, Tabs, Settings, Dots)
│   └── ui/             # Reusable atomic UI elements (Buttons, Inputs)
├── hooks/              # Custom logic (useTimer engine)
├── App.jsx             # Root component & State Orchestration
├── index.css           # Global styles & Tailwind configuration
└── main.jsx            # Entry point
```

## ⚙️ Setup & Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/Mahedi178/DeeCus.git
    ```

2.  **Install dependencies**:

````bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## 🧠 Logic & Architecture

### Persistence Engine
The application uses a **Lazy Initialization** pattern in `App.jsx` to fetch data from `localStorage` only once during the initial mount, preventing unnecessary disk reads on every re-render[cite: 7].

### Timer Engine
The `useTimer` hook manages a precise 1-second tick interval using `setInterval` and `useRef`. It dynamically handles transitions between Focus, Short Break, and Long Break modes based on your `longBreakInterval` settings[cite: 10].

---
**Author**: [Mahedi178]
**Version**: 1.0.0
**License**: MIT
````
