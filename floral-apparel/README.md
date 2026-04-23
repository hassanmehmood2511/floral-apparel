# Floral Apparel

Floral Apparel is an e-commerce storefront and admin panel built with Next.js 14 App Router.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MongoDB Atlas + Mongoose
- react-hot-toast

## Local Development

1. Clone the repository and move into the project.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your local env file:
   ```bash
   cp .env.example .env.local
   ```
4. Fill `.env.local` values.
5. Run the app:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000).

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account and a new project.
2. Create a cluster (free tier works for development).
3. Create a database user with read/write access.
4. Add your IP address to **Network Access** (or `0.0.0.0/0` for temporary testing).
5. Copy the connection string from **Connect > Drivers**.
6. Set `MONGODB_URI` in `.env.local`.

## Deploy on Vercel

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/).
3. In Vercel project settings, add all environment variables from the table below.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain (for example, `https://yourdomain.com`).
5. Deploy from the `main` branch.
6. After deployment, verify:
   - storefront pages
   - admin login and protected routes
   - API routes and MongoDB connectivity
   - `sitemap.xml` and `robots.txt`

## Environment Variables (Final)

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection URI |
| `NEXTAUTH_SECRET` | App secret used by auth/security flows |
| `ADMIN_PASSWORD` | Password for admin login |
| `ADMIN_KEY` | Admin API key used on protected admin API operations |
| `NEXT_PUBLIC_SITE_NAME` | Public site name shown in the UI |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata and sitemap |
| `NEXT_PUBLIC_BANK_IBAN` | Bank transfer account/IBAN shown at checkout |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number for customer contact UI |

## Folder Structure

- `app/`: App Router pages, layouts, route handlers, metadata routes
- `app/api/`: API routes
- `components/`: Reusable UI components
- `lib/`: Shared business logic and helpers
- `hooks/`: Custom client hooks
- `models/`: Mongoose schemas and models
