# Floral Apparel

E-commerce clothing brand website

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MongoDB & Mongoose
- ESLint & Prettier

## How to Install and Run Locally

1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` file to `.env.local` and fill in the values:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables Reference

| Variable                | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `MONGODB_URI`           | The connection string for the MongoDB database     |
| `NEXTAUTH_SECRET`       | Secret key used for NextAuth.js encryption         |
| `NEXT_PUBLIC_SITE_NAME` | The public name of the site (e.g., Floral Apparel) |

## Folder Structure

- `app/` - Next.js App Router pages, layouts, and API routes.
  - `app/api/` - Backend API routes.
- `components/` - Reusable UI components.
- `lib/` - Utility functions, database connection, and shared logic.
- `hooks/` - Custom React hooks.
- `public/` - Static assets like images and fonts.
