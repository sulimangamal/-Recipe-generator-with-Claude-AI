# Recipe Generator with Claude AI

A modern web application that generates personalized recipes using the Claude AI API. Built with React, Vite, and Express, this application allows users to input ingredients and receive creative recipe suggestions powered by AI.

## Overview

This is a full-stack application with:
- **Frontend**: React + Vite for fast development and optimal performance
- **Backend**: Express.js server that communicates with the Anthropic Claude API
- **AI Integration**: Uses Claude AI to generate creative recipes based on user input

## Features

- 🥘 Generate recipes based on available ingredients
- 🤖 Powered by Claude AI for intelligent recipe suggestions
- ⚡ Fast, responsive UI with React and Vite
- 🎨 Clean and intuitive user interface
- 📝 Markdown rendering for well-formatted recipe output

## Prerequisites

Before you begin, ensure you have:
- **Node.js** (v14 or higher) installed on your system
- **npm** or **yarn** package manager
- An **Anthropic API key** (get it from [console.anthropic.com](https://console.anthropic.com))

## Setup Instructions

### 1. Clone or Download the Project

```bash
cd React-Third
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root by copying the example file:

```bash
cp .env.example .env
```

Then edit `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=your-actual-api-key-here
PORT=5001
```

**Important**: Never commit your `.env` file to version control. It contains sensitive credentials.

### 4. Start the Development Server

The application requires both the frontend and backend to run:

**Terminal 1 - Start the backend server:**
```bash
node server.js
```

The backend will start on `http://localhost:5001`

**Terminal 2 - Start the frontend development server:**
```bash
npm run dev
```

The frontend will typically start on `http://localhost:5173`

### 5. Open in Browser

Navigate to `http://localhost:5173` to access the application.

## How to Use

1. Enter the ingredients you have available
2. Click the "Generate Recipe" button
3. The Claude AI will process your ingredients and suggest a creative recipe
4. View the formatted recipe with ingredients and instructions
5. Generate new recipes by changing your ingredients

## Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
src/
├── Components/           # React components
│   ├── ClaudeRecipe.jsx    # Recipe generation and display
│   ├── Header.jsx          # Application header
│   └── IngredientsList.jsx  # Ingredients input component
├── ai.js                # AI/API integration logic
├── App.jsx              # Main application component
├── Main.jsx             # Root component
└── index.jsx            # Entry point
```

## Technologies Used

- **React 19** - UI library for building interactive interfaces
- **Vite** - Next generation frontend build tool
- **Express.js** - Backend server framework
- **Anthropic Claude API** - AI service for recipe generation
- **React Markdown** - For rendering formatted recipe content
- **CORS** - Cross-Origin Resource Sharing middleware
- **Dotenv** - Environment variable management

## Troubleshooting

**Issue**: Frontend can't connect to backend
- **Solution**: Ensure the backend server is running on port 5001 and the frontend makes requests to `http://localhost:5001`

**Issue**: API errors about invalid key
- **Solution**: Verify your `ANTHROPIC_API_KEY` in the `.env` file is correct and has active access

**Issue**: Port already in use
- **Solution**: Change the port in `.env` (e.g., `PORT=5002`) or stop the process using that port

**Issue**: Dependencies not installing
- **Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Development

For development with hot module replacement:

```bash
# Terminal 1
node server.js

# Terminal 2
npm run dev
```

Changes to React components will automatically refresh in the browser.

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder ready for deployment.
