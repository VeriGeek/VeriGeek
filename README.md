# Verilog Learning Platform

A comprehensive web-based platform for learning Verilog, inspired by GeeksforGeeks' interface but specialized for VLSI engineering education.

## Features

- **Modern UI** with purple theme (#6a0dad) and intuitive navigation
- **Web-based Verilog editor** with syntax highlighting and error detection
- **Comprehensive module library** covering basic to advanced Verilog concepts
- **Interactive exercises** with automated testing and instant feedback
- **User profiles** for progress tracking and personalized learning paths
- **Discussion forums** for community knowledge sharing

## Tech Stack

- **Frontend**: React.js with Material UI and CodeMirror for code editing
- **Backend**: Node.js with Express
- **Database**: MongoDB for user data and content management
- **Verilog Compilation**: Integration with Icarus Verilog via WebAssembly
- **Authentication**: JWT-based user authentication system
- **Deployment**: Docker containerization with CI/CD pipeline

## Project Structure

The project follows a modern, modular architecture with clear separation of concerns:

- `/client` - React frontend application
- `/server` - Node.js backend API
- `/docs` - Project documentation
- `/scripts` - Utility scripts for development and deployment

## Getting Started

### Prerequisites

Before running the application, you need to have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later) running locally or accessible via connection string

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/verilog-learning-platform.git

# Install dependencies
cd verilog-learning-platform
npm run install-all
```

### Configuration

1. Create a `.env` file in the `server` directory based on `.env.example`:

```
# Server configuration
PORT=5000
NODE_ENV=development

# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/verilog-platform

# JWT settings for authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
```

### Running the Application (Development Mode)

```bash
# Run both frontend and backend
npm run dev

# Alternatively, run them separately:
# Frontend only
npm run client

# Backend only
npm run server
```

The frontend will be available at http://localhost:3000 and the backend API at http://localhost:5000.

### Troubleshooting

If you encounter issues when starting the application:

1. **Database connection error**: Make sure MongoDB is running and the connection string in `.env` is correct.

2. **Port conflict**: If port 3000 or 5000 is already in use, you can change them:
   - For frontend: Edit the `PORT` environment variable before starting the application
   - For backend: Change the `PORT` value in the server's `.env` file

3. **Missing dependencies**: If you encounter missing module errors, run:
   ```
   npm run install-all
   ```

4. **Backend not connecting**: If the frontend can't connect to the backend, check that both are running and CORS is properly configured.

## License

MIT 