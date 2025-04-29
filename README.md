# Very Simple Oauth Practice Application

A modern e-commerce application built with Next.js, NextAuth, Prisma, and PostgreSQL.

![Application Preview](./preview/preview.png)

## Features

- User authentication with email/password
- Social login with Google and Facebook
- Secure password hashing with bcrypt
- User registration and profile management
- PostgreSQL database integration with Prisma ORM
- Responsive design with Tailwind CSS

## Prerequisites

- [Bun](https://bun.sh/) installed
- PostgreSQL database server running
- Google and Facebook OAuth credentials (for social login)

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:nimithsan/next-oauth-template.git
cd next-oauth-template
```

2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables:

Create a `.env` file in the root directory with the following variables:

```
# Prisma
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"
```

4. Set up the database:

```bash
bunx prisma migrate dev
```

5. Run the development server:

```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js application code
  - `/api` - API routes, including NextAuth
  - `/components` - Reusable UI components
  - `/dashboard` - Protected dashboard page
  - `/services` - Service layer (auth services, etc.)
  - `/lib` - Utility functions and shared code
  - `/types` - TypeScript type definitions
- `/prisma` - Prisma schema and migrations
- `/public` - Static assets

## Authentication Flow

1. **Regular Login**: Users can log in with their email and password
2. **Social Login**: Users can authenticate with Google or Facebook accounts
3. **Registration**: New users can create an account with email, password, and name
4. **Session Management**: Managed by NextAuth with JWT strategy

## Database Schema

The application uses the following database models:

- `User`: User information (name, email, password, etc.)
- `Account`: OAuth accounts connected to a user
- `Session`: User sessions
- `VerificationToken`: Email verification tokens

## Deployment

This application can be deployed to various platforms such as Vercel, Netlify, or traditional hosting services. Make sure to set up your environment variables on your deployment platform.

## License

This project is licensed under the MIT License.
