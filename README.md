# Signal Board - AI Review Queue

A production-minded frontend interface for an AI-assisted product team. Built for speed, clarity, and thoughtful UX.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠 Tech Stack

- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Architecture**: Layered (Routes -> Controllers -> Services -> Repositories)

## ✨ Key Features

- **Dynamic Queue**: 30+ realistic mock items with simulated 600ms network latency.
- **Power Search**: Instant filtering by title, summary, or tags (Cmd + K to focus).
- **Multi-Filter**: Filter by Status, Priority, and Risk level.
- **Smart Sorting**: Sort by Date, Priority, or AI Score.
- **Detail View**: Spring-animated drawer with metadata and actionable buttons.
- **Persistence**: Remembers your density preferences and filter choices across reloads.
- **Responsive**: Fully optimized for both desktop scannability and mobile triage.

## 🏗 Architecture Details

- **Repositories**: `src/repositories` - Data fetching abstraction.
- **Services**: `src/services` - Business logic, filtering, and sorting.
- **Hooks**: `src/hooks` - State management and orchestration.
- **Components**: `src/components` - Functional and UI building blocks.

---
Built by Senior Full-Stack Architect for Signal Board Assignment.
