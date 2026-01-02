# 🚀 Crypto Trading Dashboard

> A professional, real-time cryptocurrency trading dashboard built with React, TypeScript, Node.js, and WebSockets.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.0-lightgrey.svg)](https://expressjs.com/)

## ✨ Features

- 📊 **Real-time Market Data** - Live crypto prices via CoinGecko API
- 💹 **Interactive Trading** - Buy/sell cryptocurrencies with instant updates
- 📈 **Advanced Analytics** - Portfolio performance metrics and ROI tracking
- 🔄 **WebSocket Integration** - Real-time portfolio updates without page refresh
- 💾 **Persistent Storage** - SQLite database for trade history
- 🎨 **Modern UI** - Responsive design with Recharts visualization
- 🔒 **Type Safety** - Full TypeScript implementation with Zod validation
- 📝 **Comprehensive Logging** - Winston logger for debugging and monitoring

## 🏗️ Architecture

```
crypto-trading-dashboard/
├── frontend/                 # React TypeScript SPA
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API integration
│   │   └── types/           # TypeScript definitions
│   └── package.json
├── src/                     # Backend Node.js/Express
│   ├── api/                 # REST API & WebSocket server
│   ├── db/                  # Database layer
│   ├── services/            # Business logic
│   └── utils/               # Utilities & helpers
├── scripts/                 # Database seeding & migrations
└── package.json
```

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **WebSocket API** - Real-time communication

### Backend

- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **TypeScript** - Type-safe backend
- **SQLite3** - Embedded database
- **WebSocket (ws)** - Real-time updates
- **Zod** - Schema validation
- **Winston** - Logging framework

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/SoyNeo12/crypto-trading-dashboard.git
cd crypto-trading-dashboard
```

2. **Install backend dependencies**

```bash
npm install
```

3. **Install frontend dependencies**

```bash
cd frontend
npm install
cd ..
```

4. **Initialize database with seed data**

```bash
npm run seed
```

### Running the Application

#### Development Mode (Recommended)

Run both frontend and backend concurrently:

```bash
npm run start-all
```

This will start:

- Backend API server on `http://localhost:5000`
- WebSocket server on `ws://localhost:8080`
- Frontend dev server on `http://localhost:3000`

#### Manual Start

**Terminal 1 - Backend:**

```bash
npm run dev
```

**Terminal 2 - Frontend:**

```bash
npm run frontend
```

### Building for Production

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

## 📚 API Documentation

### REST Endpoints

#### Get Crypto Price

```http
GET /api/price/:symbol
```

Returns current USD price for a cryptocurrency.

**Parameters:**

- `symbol` (string) - Cryptocurrency identifier (e.g., "bitcoin", "ethereum")

**Response:**

```json
{
  "symbol": "bitcoin",
  "price": 45000.0
}
```

#### Get Portfolio

```http
GET /api/portfolio
```

Returns current portfolio balance and trade history.

**Response:**

```json
{
  "balance": 10000.0,
  "trades": [
    {
      "id": 1,
      "symbol": "BTC",
      "type": "BUY",
      "price": 45000.0,
      "amount": 0.1,
      "timestamp": 1704153600000
    }
  ]
}
```

#### Get Metrics

```http
GET /api/metrics
```

Returns portfolio performance metrics.

**Response:**

```json
{
  "balance": 10500.0,
  "roi": "5.00%",
  "totalTrades": 4,
  "profit": 500.0
}
```

#### Buy Cryptocurrency

```http
POST /api/trade/buy
Content-Type: application/json

{
  "symbol": "bitcoin",
  "amount": 0.1
}
```

#### Sell Cryptocurrency

```http
POST /api/trade/sell
Content-Type: application/json

{
  "symbol": "bitcoin",
  "amount": 0.1
}
```

### WebSocket Protocol

Connect to `ws://localhost:8080` to receive real-time updates.

**Message Format:**

```json
{
  "type": "metrics",
  "data": {
    "balance": 10500.0,
    "roi": "5.00%",
    "totalTrades": 4,
    "profit": 500.0
  }
}
```

## 🧪 Testing

```bash
# Run backend tests
npm test

# Run frontend tests
cd frontend
npm test
```

## 📊 Database Schema

### trades

| Column    | Type    | Description                    |
| --------- | ------- | ------------------------------ |
| id        | INTEGER | Primary key                    |
| symbol    | TEXT    | Crypto symbol (BTC, ETH, etc.) |
| type      | TEXT    | Trade type (BUY/SELL)          |
| price     | REAL    | Trade price in USD             |
| amount    | REAL    | Amount traded                  |
| timestamp | INTEGER | Unix timestamp                 |

### portfolio

| Column  | Type    | Description         |
| ------- | ------- | ------------------- |
| id      | INTEGER | Primary key         |
| balance | REAL    | Current USD balance |

## 🔧 Configuration

Environment variables (optional `.env` file):

```env
PORT=5000
WS_PORT=8080
NODE_ENV=development
COINGECKO_API_URL=https://api.coingecko.com/api/v3
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:8080
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:3000
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- [Recharts](https://recharts.org/) for beautiful charts
- The open-source community

⭐ If you found this project helpful, please consider giving it a star!
