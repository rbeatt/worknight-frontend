# Worknight

A web application for managing job roles, built with Node.js, Express, and TypeScript.

## Project Context
Developed during the Kainos Academy program as part of a 7-week cohort with 3 weekly sprints. This frontend integrates with a backend API to handle job role CRUD operations, authentication, and user management.

## Key Features
- User authentication and session management
- View, add, and edit job roles with capabilities and band levels
- Responsive UI using Bootstrap
- API integration for data retrieval and submission

## Quick Start
1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Set environment variable: `export API_URL="http://localhost:8080"` (or update in code)
4. Build the project: `npm run build`
5. Start the server: `npm start`
6. Access at `http://localhost:3000`

## Personal Contributions
- Developed user authentication flow with token handling and session management
- Implemented frontend UI for viewing job roles, including API integration for data retrieval
- Wrote unit tests for authentication controllers and services
- Configured middleware for routing and session handling

## Notes for Reviewers
- Source code is in `src/` and `controllers/`
- Tests are in `test/unit/` and `test/ui/`
- Models and validators are in respective directories

