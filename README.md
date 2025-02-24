# Task Management Application

A task management application built with React + TypeScript for the frontend and Node.js/Nest.js for the backend, using PostgreSQL as the database.

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE task_management;
```

2. Run the following migrations:
```sql
-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_complete BOOLEAN DEFAULT FALSE,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a \`.env\` file:
```env
PORT=3001
DATABASE_URL=postgresql://username:password@localhost:5432/task_management
JWT_SECRET=your_jwt_secret_key
```

4. Start the development server:
```bash
npm run dev
```

The backend will be available at \`http://localhost:3001\`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
REACT_APP_API_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm start
```

The application will be available at \`http://localhost:3000\`

## Testing

1. Backend tests:
```bash
cd backend
npm test
```

2. Frontend tests:
```bash
cd frontend
npm test
```

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── tests/
│   └── package.json
└── README.md
```

## Salary Expectations

Expected monthly salary range: $8,000 - $12,000 USD
