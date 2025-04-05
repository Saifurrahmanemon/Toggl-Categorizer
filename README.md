# Toggl Time Tracking Application

A modern web application for tracking and analyzing time entries using the Toggl API. This application provides a user-friendly interface for managing time entries, categorizing them, and generating insightful reports.

## Features

- 🔐 Secure authentication with Toggl credentials
- ⏱️ Real-time time entry tracking
- 📊 Interactive charts and visualizations
- 🏷️ Custom categorization of time entries
- 📈 Weekly activity tracking
- 📱 Responsive design for mobile and desktop
- 🌙 Dark/Light mode support

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
git clone <repository-url>
cd toggl
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

## Key Components

### Authentication
- Secure login using Toggl credentials
- JWT-based session management
- Protected routes and API endpoints

### Time Entry Management
- Create, edit, and delete time entries
- Real-time synchronization with Toggl
- Bulk operations support

### Analytics and Reporting
- Weekly activity charts
- Category distribution analysis
- Time entry statistics
- Custom date range filtering

### Categorization System
- Custom categories for time entries
- Bulk categorization
- Category management interface

## API Integration

The application integrates with the Toggl API for:
- Time entry synchronization
- User authentication
- Project and workspace data

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