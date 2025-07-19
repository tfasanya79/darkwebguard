#!/bin/bash

# Production setup script for DarkWebGuard
set -e

echo "🚀 Setting up DarkWebGuard for production..."

# Check if .env exists, if not copy from example
if [ ! -f .env ]; then
    echo "📋 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your production values before running!"
fi

# Generate a secure secret key if needed
if grep -q "your-super-secret-key-change-in-production" .env; then
    echo "🔐 Generating secure secret key..."
    SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")
    sed -i "s/your-super-secret-key-change-in-production/$SECRET_KEY/" .env
    echo "✅ Secret key generated and updated in .env"
fi

# Set production environment
sed -i "s/ENV=development/ENV=production/" .env

echo "🏗️  Building production containers..."
docker-compose build --no-cache

echo "🧪 Testing configuration..."
docker-compose config

echo "✅ Production setup complete!"
echo ""
echo "To start the application:"
echo "  docker-compose up -d"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop the application:"
echo "  docker-compose down"