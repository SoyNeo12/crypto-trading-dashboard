# Crypto Trading Dashboard

**A professional, real-time cryptocurrency trading dashboard built with React, TypeScript, Node.js, and WebSockets. Designed for advanced analytics, real-time trading, and modern, responsive UI.**

## Features

- Real-time market data and portfolio updates
- Interactive trading interface with instant feedback
- Advanced analytics and performance metrics
- Responsive, modern UI with high-quality data visualizations
- Full TypeScript support for frontend and backend
- WebSocket integration for real-time updates
- Persistent storage using SQLite
- Robust logging and error handling

## Architecture

```
crypto-trading-dashboard/
├── frontend/                 # React TypeScript SPA
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API/WebSocket integration
│   │   └── types/           # TypeScript definitions
│   └── package.json
├── backend/                  # Node.js + Express + WebSockets
│   ├── api/                  # REST endpoints & WebSocket server
│   ├── db/                   # Database layer (SQLite)
│   ├── services/             # Business logic
│   └── utils/                # Helpers and utilities
├── scripts/                  # Database seeding and migrations
└── package.json
```

## Technology Stack

### Frontend

- React 19 with functional components and hooks
- TypeScript for type-safe development
- Recharts for advanced data visualization
- Axios for HTTP requests
- WebSocket API for real-time updates

### Backend

- Node.js 20+
- Express 5
- TypeScript
- SQLite for persistent data
- WebSocket (ws) for real-time communication
- Zod for input validation
- Winston for logging

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/SoyNeo12/crypto-trading-dashboard.git
cd crypto-trading-dashboard
```

2. Install backend dependencies:

```bash
npm install
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

4. Initialize the database with seed data:

```bash
npm run seed
```

### Running the Application

#### Development Mode

Run both frontend and backend concurrently:

```bash
npm run start-all
```

This will start:

- Backend API server on `http://localhost:5000`
- WebSocket server on `ws://localhost:8080`
- Frontend development server on `http://localhost:3000`

#### Manual Start

**Backend:**

```bash
npm run dev
```

**Frontend:**

```bash
npm run frontend
```

### Production Build

```bash
# Build frontend
cd frontend
npm run build
cd ..

# Build backend
npm run build

# Start production server
node dist/index.js
```

## Database

SQLite is used for persistent trade history and portfolio tracking. Database migrations and seeding scripts are included in the `scripts` folder.

## Environment Configuration

Optional `.env` file:

```.env
PORT=5000
NODE_ENV=development
DB_PATH=./crypto-dashboard.db
COINGECKO_API_URL=https://api.coingecko.com/api/v3
LOG_LEVEL=info
```

## Testing

Run backend and frontend tests:

```bash
# Backend tests
npm test

# Frontend tests
cd frontend
npm test
```

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
