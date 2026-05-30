# Zest Frontend

The frontend for the Zest trading platform, built with React and Vite. It provides a sleek, responsive interface for users to execute trades and track their investments.

## How to Install and Run

1. Open a terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

You need to create a `.env` file in the root of the `frontend` folder with the following variable to connect to the backend API:

```env
VITE_API_URL=http://localhost:3000
```

## Folder Structure

The `src` directory is organized into logical feature areas:

- `landing_page/`: Contains public-facing pages like the home page, login (`login.jsx`), and signup (`signup.jsx`).
- `user_page/`: Contains all authenticated dashboard views, such as `dashboard/`, `holdings/`, `orders/`, `positions/`, and `funds/`.
- `components/`: Reusable UI components used across the application, like the `buyActionWindow.jsx` and `sellActionWindow.jsx` modals.

## Pages and Routes

- `/` - Public Landing Page
- `/signup` - User Registration
- `/login` - User Authentication
- `/dashboard` - Main Trading Dashboard
- `/orders` - Order History & Pending Orders
- `/holdings` - Long-term Investments (CNC)
- `/positions` - Intraday Trades (MIS)
- `/funds` - Wallet, Deposits, and Withdrawals
