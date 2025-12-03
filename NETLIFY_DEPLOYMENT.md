# Netlify Deployment Guide

This project is optimized for deployment on Netlify.

## Prerequisites

1. A Netlify account
2. Your repository connected to Netlify (GitHub, GitLab, or Bitbucket)

## Environment Variables

Make sure to set the following environment variables in your Netlify dashboard (Site settings → Environment variables):

**Required for Cloudflare Images:**
- `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID` - Your Cloudflare Images API Account ID (used for API calls)
- `NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ACCOUNT_ID` - Your Cloudflare Images Delivery Account ID (used in image URLs, can be different from API Account ID)

**Optional:**
- `NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_URL` - Cloudflare Images delivery URL (defaults to `https://imagedelivery.net`)

**Important:** The Delivery Account ID is often different from the API Account ID. You can find it by:
1. Making an API call to get image details: `curl -H "Authorization: Bearer <token>" https://api.cloudflare.com/client/v4/accounts/<api_account_id>/images/v1/<image_id>`
2. The `variants` array in the response contains URLs with the delivery Account ID
3. Extract the Account ID from the variant URL (the part between `imagedelivery.net/` and the image ID)

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



