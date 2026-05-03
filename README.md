# 💣 Mines Game App

[DEMO]()

> A modern, fully responsive, and highly interactive Minesweeper-style casino game built with React, TypeScript, and Framer Motion.

## ✨ Features

- **🎮 Engaging Gameplay**: Place your bets, select the number of mines, and test your luck to multiply your earnings.
- **📱 Fully Responsive Design**: Perfectly tailored layouts for Mobile, Tablet, and Desktop devices.
- **⚡ Fluid Animations**: Smooth transitions and interactions powered by Framer Motion.
- **🔊 Sound Effects**: Immersive audio feedback for clicks, wins, and losses using `use-sound` (with mute toggle).
- **🔄 Real-time State**: Seamless state management and server synchronization with Zustand and React Query.
- **🎨 Premium UI/UX**: Dark mode by default, glassmorphism elements, and vibrant Tailwind CSS color themes.

## 🛠 Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v4) + PostCSS
- **State Management (Client):** Zustand
- **State Management (Server):** TanStack React Query (v5)
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Audio:** `use-sound`

## 📂 Project Structure

```text
src/
├── api/          # Axios instance and React Query hooks (queries, mutations)
├── assets/       # Static assets like icons and sound effects
├── components/   # React components
│   ├── game/     # Domain-specific game components (Board, ControlPanel, etc.)
│   └── ui/       # Reusable UI elements (Buttons, Inputs, Loaders, Overlays)
├── constants/    # App-wide constants (Endpoints, Game Configs, Assets paths)
├── hooks/        # Custom React hooks (e.g., useBoard, useGameMechanics)
├── store/        # Zustand global state (useGameStore)
├── types/        # TypeScript type definitions and interfaces
└── utils/        # Helper functions (formatters, calculations)
```

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mines-game.git
   cd mines-game
   ```

2. Install dependencies (Using npm is strictly required for this project):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Building for Production

To create a production build, run:

```bash
npm run build
```

The compiled assets will be available in the `dist` directory.

## 🏗 Architecture & Best Practices

This project adheres to strict architectural guidelines to ensure scalability and maintainability:
- **Strict Typing:** No `any` types allowed. Complete end-to-end type safety.
- **Separation of Concerns:** Server state is managed exclusively by React Query, while local UI state is handled by Zustand.
- **Styling Standards:** Custom CSS is strictly avoided. All styling is achieved via Tailwind utility classes, merged safely using `clsx` and `tailwind-merge`.
- **API Encapsulation:** All network requests are routed through a configured Axios instance with appropriate interceptors.

## 📄 License

This project is licensed under the MIT License.
