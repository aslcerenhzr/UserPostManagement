#!/bin/bash

# User & Post Management System - Deployment Script

echo "🚀 Starting deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "🔨 Building for production..."
npm run build:prod

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Production files are in the 'dist' directory"
echo "🌐 You can now deploy the 'dist' folder to your hosting provider"

# Optional: Start preview server
read -p "Would you like to start a preview server? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting preview server on http://localhost:3000"
    npm run serve
fi
