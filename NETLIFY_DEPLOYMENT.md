# Netlify Deployment Guide

This project is optimized for deployment on Netlify.

## Prerequisites

1. A Netlify account
2. Your repository connected to Netlify (GitHub, GitLab, or Bitbucket)

## Environment Variables

Make sure to set the following environment variables in your Netlify dashboard (Site settings → Environment variables):

- `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID` - Your Cloudflare Images Account ID (optional, if using Cloudflare Images)
- `NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_URL` - Cloudflare Images delivery URL (optional, defaults to `https://imagedelivery.net`)

## Deployment Steps

1. **Connect your repository** to Netlify:
   - Go to your Netlify dashboard
   - Click "Add new site" → "Import an existing project"
   - Select your Git provider and repository

2. **Configure build settings** (should be auto-detected):
   - Build command: `npm run build`
   - Publish directory: `.next` (handled automatically by the plugin)
   - Node version: `20` (specified in `.nvmrc`)

3. **Install dependencies**:
   The `@netlify/plugin-nextjs` plugin will be automatically installed during the build process.

4. **Deploy**:
   - Netlify will automatically deploy on every push to your main branch
   - Or trigger a manual deploy from the dashboard

## Configuration Files

- `netlify.toml` - Contains build configuration, redirects, and headers
- `.nvmrc` - Specifies Node.js version 20

## Features

- ✅ Automatic Next.js optimization via `@netlify/plugin-nextjs`
- ✅ Security headers configured
- ✅ Static asset caching optimized
- ✅ Cloudflare Images support (if configured)
- ✅ Node.js 20 specified

## Troubleshooting

If you encounter build issues:

1. Check that Node.js version 20 is being used
2. Verify all environment variables are set correctly
3. Check the build logs in Netlify dashboard for specific errors
4. Ensure `@netlify/plugin-nextjs` is installed (it should be auto-installed)



