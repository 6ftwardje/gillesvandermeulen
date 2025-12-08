# Fixing Netlify 404 Error

## Problem
Your site at `https://gillesvandermeulen.com/` is returning a 404 error. Netlify is not serving your Next.js application.

## Root Cause
The Next.js app is not being properly deployed or served by Netlify. This could be due to:
1. Build failures
2. Plugin configuration issues
3. Missing build output
4. Incorrect publish directory

## Immediate Steps to Fix

### 1. Check Netlify Build Logs
1. Go to your Netlify dashboard
2. Navigate to **Deploys** tab
3. Click on the latest deploy
4. Check the build logs for errors

**Look for:**
- Build command failures
- Missing dependencies
- TypeScript/ESLint errors
- Plugin installation issues

### 2. Verify Build Settings in Netlify Dashboard
1. Go to **Site settings** → **Build & deploy**
2. Verify:
   - **Build command**: `npm run build`
   - **Publish directory**: Leave empty (the plugin handles this) OR set to `.next`
   - **Node version**: Should be `20` (from `.nvmrc`)

### 3. Check Plugin Installation
The `@netlify/plugin-nextjs` plugin should be:
- Listed in `package.json` devDependencies (✅ it is)
- Automatically installed during build
- Configured in `netlify.toml` (✅ it is)

If the plugin isn't working:
1. Check build logs for plugin errors
2. Try manually installing: `npm install @netlify/plugin-nextjs --save-dev`
3. Commit and push to trigger a new deploy

### 4. Force a Clean Rebuild
1. In Netlify dashboard → **Deploys**
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. This will:
   - Clear the build cache
   - Reinstall all dependencies
   - Rebuild from scratch

### 5. Verify Environment Variables
Even though this might not cause a 404, ensure environment variables are set:
- Go to **Site settings** → **Environment variables**
- Verify `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID` is set (if using Cloudflare Images)
- Verify `NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ACCOUNT_ID` is set

### 6. Test Build Locally
Test that the build works locally:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Check if .next directory was created
ls -la .next

# Test production build locally
npm start
```

If the local build fails, fix those errors first.

### 7. Check Git Repository Connection
1. Go to **Site settings** → **Build & deploy** → **Continuous Deployment**
2. Verify:
   - Repository is connected
   - Branch is set to `main` (or your default branch)
   - Build hook is active

### 8. Common Build Issues

#### TypeScript Errors
If you see TypeScript errors in build logs:
- Fix the TypeScript errors
- Ensure `tsconfig.json` is correct
- Check that all types are properly defined

#### Missing Dependencies
If dependencies are missing:
- Ensure `package.json` has all required dependencies
- Check that `package-lock.json` is committed
- Try deleting `node_modules` and `package-lock.json`, then `npm install` again

#### Plugin Not Found
If `@netlify/plugin-nextjs` is not found:
- Ensure it's in `package.json` devDependencies
- Check that `npm install` runs successfully in build logs
- Try updating the plugin version

### 9. Alternative: Manual Publish Directory
If the plugin isn't working, you can try setting the publish directory manually:

1. In Netlify dashboard → **Site settings** → **Build & deploy**
2. Set **Publish directory** to: `.next`
3. **Note:** This is not recommended for Next.js, but can work as a temporary fix

### 10. Check Domain Configuration
1. Go to **Site settings** → **Domain management**
2. Verify `gillesvandermeulen.com` is properly configured
3. Check DNS settings if using a custom domain

## Debugging Commands

### Check what Netlify is serving:
```bash
curl -I https://gillesvandermeulen.com/
```

### Check the HTML response:
```bash
curl https://gillesvandermeulen.com/ | head -20
```

### Check for redirects:
```bash
curl -L https://gillesvandermeulen.com/ -v
```

## Expected Behavior

After a successful deploy:
- `curl -I https://gillesvandermeulen.com/` should return `200 OK`
- The HTML should contain your Next.js app content
- The page should load in a browser

## Still Not Working?

1. **Check Netlify Status**: Visit https://www.netlifystatus.com/ to see if there are any outages
2. **Contact Netlify Support**: If build logs show no errors but site still returns 404
3. **Review Next.js Documentation**: Check Next.js deployment docs for Netlify
4. **Check Plugin Version**: Ensure you're using a compatible version of `@netlify/plugin-nextjs`

## Next Steps After Fix

Once the site is loading:
1. Verify all pages work
2. Check that images load correctly (if using Cloudflare Images)
3. Test all interactive features
4. Verify environment variables are working

