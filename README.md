# ByBops Portfolio

Photography portfolio and booking site for Sahib Boparai, built with Next.js App Router, Sanity, Tailwind v4, and Framer Motion.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS v4
- Framer Motion 12
- Sanity v5
- Vercel deployment

## Local Development

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Important routes:

- `/`
- `/gallery`
- `/about`
- `/booking`
- `/shop`
- `/studio`

## Environment Variables

Copy `.env.local.example` to `.env.local` and populate the values you need.

Required:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Optional:

- `NEXT_PUBLIC_CALENDLY_URL`
  If omitted, the booking page falls back to a placeholder state.
- `SANITY_API_READ_TOKEN`
  Server-only. Use only for private or draft Sanity reads.

## Verification Workflow

Before calling work done or pushing code:

1. Run `npm.cmd run lint` when app code changed.
2. Run `npm.cmd run build`.
3. Run a small smoke test on the routes affected by the change.
4. Fix failures before pushing.

## Deployment Checklist

1. Configure `.env.local`.
2. Run local verification.
3. Run `npm.cmd run build`.
4. Deploy to Vercel.
5. Add the same environment variables in Vercel.
6. Re-test the live site after deployment.

## Current Known Live Issues

- `bybops.ca` still needs browser-level inspection for the site-wide "not fully secure" warning.
- Production may still be serving an older booking-page build, so verify deployment state before assuming a code regression.

## Notes

- All pushed code should go only to `Sbop24/bybops-portfolio`.
- Do not commit secrets, tokens, `.env.local`, or machine-local config.
