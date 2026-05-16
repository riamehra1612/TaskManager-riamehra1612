# ⚡ TaskFlow — Task Management Dashboard

A modern, responsive Task Management Dashboard built with **React** and **Context API**. Supports adding, editing, deleting, filtering, and sorting tasks — with localStorage persistence across sessions.

---

## 📸 Features

- **Add / Edit / Delete** tasks with a modal form
- **Form validation** — title and due date are mandatory
- **Filter** tasks by status — All, Pending, In Progress, Completed
- **Sort** tasks by due date — ascending or descending
- **Summary bar** — live count of tasks per status
- **Overdue detection** — highlights tasks past their due date
- **Client-side routing** — navigate between All Tasks and Completed views
- **LocalStorage persistence** — tasks survive page refresh
- **Responsive grid layout** — works on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 |
| Component Library |
| State Management | Context API + useReducer |
| Icons | Lucide React |
| Persistence | localStorage via custom hook |
| Styling | theme system |

---

## 📁 Project Structure

```
src/
├── constants/
│   └── index.js              # STATUS_CONFIG, FILTERS, STATUSES, SUMMARY_META
│
├── utils/
│   ├── validate.js           # Form validation logic
│   └── taskHelpers.js        # filterTasks, sortByDueDate, getSummary, isOverdue, formatDate
│
├── hooks/
│   └── useLocalStorage.js    # Custom hook — syncs state to localStorage
│
├── context/
│   └── TaskContext.jsx       # Reducer, Provider, useTask hook
│
├── styles/
│   └── styles.js             # Shared style objects
│
├── components/
│   ├── navbar.jsx            # Top navigation + view switching
│   ├── summaryBar.jsx        # Status count cards
│   ├── toolbar.jsx           # Filter buttons + sort toggle + Add button
│   ├── taskCard.jsx          # Individual task card (MUI Card)
│   ├── taskForm.jsx          # Add / Edit form with validation
│   ├── modal.jsx             # Reusable modal wrapper
│   └── emptyState.jsx        # Empty list placeholder
|   └── BaseCard.jsx          # Reusable card wrapper
|   └── dashboard.jsx         # Main application container
│
└── App.jsx                   # Root — mounts TaskProvider
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# 1. Create a new React app
npx create-react-app task-dashboard
cd task-dashboard

# 2. Install dependencies
npm install @mui/material @emotion/react @emotion/styled lucide-react

# 3. Replace src/ with the project files
# (copy all files from the downloaded zip into src/)

# 4. Start the dev server
npm start
```

App runs at `http://localhost:3000`

---

## 📦 Dependencies

```json
{
  "react": "^18.0.0",
  "@mui/material": "^5.0.0",
  "@emotion/react": "^11.0.0",
  "@emotion/styled": "^11.0.0",
  "lucide-react": "^0.383.0"
}
```

---

## 👩‍💻 Author

**Ria Mehra**
Senior Frontend Engineer II | ConnectWise
[linkedin.com/in/mehra-ria](https://linkedin.com/in/mehra-ria) · riamehra2924@gmail.com
