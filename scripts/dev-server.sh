#!/bin/bash

# Development server script
set -e

echo "🚀 Starting DarkWebGuard development environment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📋 Creating .env file from template..."
    cp .env.example .env
fi

# Start backend in background
echo "🔧 Starting backend..."
cd backend
python3 -m venv dev_env
source dev_env/bin/activate
pip install -r app/requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

echo "✅ Backend started on http://localhost:8000"
echo "📋 API docs available at http://localhost:8000/docs"

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping services..."
    kill $BACKEND_PID 2>/dev/null || true
    exit 0
}

# Setup trap for cleanup
trap cleanup SIGINT SIGTERM

echo "🎯 Development environment is ready!"
echo "   Backend: http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
wait