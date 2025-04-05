# Toggl Categorizer

An AI-powered application that automatically categorizes your Toggl time entries, providing insightful analytics and visualizations of your time tracking data.

## Demo


https://github.com/user-attachments/assets/c26164d0-be5d-4a99-920e-933ae297e6c5


## Features

- 🔐 Secure authentication with Toggl credentials
- ⏱️ Real-time time entry tracking
- 📊 Interactive charts and visualizations
- 🏷️ Custom categorization of time entries
- 📈 Weekly activity tracking
- 📱 Responsive design for mobile and desktop

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: MongoDB
- **UI Components**: Shadcn/ui
- **Charts**: Recharts

## Prerequisites

- Node.js 18+
- pnpm package manager
- MongoDB database
- Toggl account and API credentials

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
TOGGL_API_TOKEN=your_toggl_api_token
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Saifurrahmanemon/Toggl-Categorizer.git
cd Toggl-Categorizer
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── entries/           # Time entries pages
│   └── reports/           # Reports and analytics pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── lib/                  # Utility functions and configurations
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── public/              # Static assets
```

## Overview

Toggl Categorizer connects to your Toggl account and uses Google's Gemini AI to automatically categorize your time entries. It provides a dashboard with visualizations and analytics to help you understand how you spend your time.

## Features

- **AI-Powered Categorization**: Automatically categorizes your Toggl time entries using Google's Gemini AI
- **Interactive Dashboard**: View time statistics, category distribution, and recent entries
- **Detailed Reports**: Analyze your time data with charts and breakdowns
- **Time Entry Management**: View, filter, and edit categorized time entries
- **Multi-level Caching**: Efficient caching strategy for improved performance
- **Responsive Design**: Works on desktop and mobile devices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
