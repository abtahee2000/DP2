# ChanderGari - Travel Planner & AI Assistant

This application provides AI-powered travel planning capabilities with offline fallback functionality.

## Features

- **Travel Itinerary Planner**: Generate day-by-day travel plans with optional Google Search and Maps grounding
- **AI Tour Guide**: Chat with an AI assistant for travel advice (with fast, balanced, and thinking modes)
- **Creative Studio**: Generate and edit travel-themed images and videos
- **Media Analyzer**: Analyze travel photos and videos for insights
- **Budget Advisor**: Get personalized travel expense optimization tips
- **Journey Tracker**: Save and track your travel plans and expenses

## Run Locally

### Prerequisites
- Node.js (v18+ recommended)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env.local`
   - For full AI functionality, obtain a Gemini API key and add it to `.env.local`:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```
   - The app will work in offline/demo mode without an API key

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Type-check the code
- `npm run clean` - Remove dist and cache files

## Offline Functionality

This application includes comprehensive offline fallback mechanisms. When a valid API key is not provided or when API quotas are exceeded, the app seamlessly switches to local simulations that provide realistic travel planning experiences without requiring external API calls.

## Project Structure

- `server.ts` - Express server with Vite middleware and API endpoints
- `src/App.tsx` - Main React application
- `src/components/` - Reusable UI components
- `src/types.ts` - TypeScript type definitions
- `src/simulationData.ts` - Offline data and fallback responses

## Environment Variables

- `GEMINI_API_KEY` - Optional: Gemini API key for AI features
- `APP_URL` - Optional: The URL where this app is hosted

## Notes

- The application uses Vite for fast frontend development
- Tailwind CSS is used for styling
- Lucide icons are used for visual elements
- Motion.js is used for animations