# Netlify 404 Error Debugging Guide

## Quick Checklist

### 1. Check Environment Variables in Netlify

Go to your Netlify dashboard → Site settings → Environment variables and verify:

- ✅ `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID` is set
- ✅ `NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ACCOUNT_ID` is set (this is often different from the API Account ID!)

**Important:** After adding/changing environment variables, you MUST trigger a new deploy!

### 2. Verify Build Success

1. Go to Netlify dashboard → Deploys
2. Check the latest deploy log
3. Look for any build errors or warnings
4. Ensure the build completed successfully

### 3. Check Build Output

The build should output to `.next` directory. The `@netlify/plugin-nextjs` plugin handles this automatically.

### 4. Test the Deployed Site

1. Open your Netlify site URL
2. Open browser Developer Tools (F12)
3. Check the Console tab for JavaScript errors
4. Check the Network tab to see:
   - Which requests are failing (404s)
   - If images are being requested from Cloudflare
   - What URLs are being generated

### 5. Common Issues and Solutions

#### Issue: Page shows 404 but build succeeded
**Solution:** 
- Check if `@netlify/plugin-nextjs` is installed (should be in `package.json` devDependencies)
- Verify `netlify.toml` has the plugin configured
- Try clearing Netlify cache and redeploying

#### Issue: Images return 404 from Cloudflare
**Solution:**
- Verify `NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ACCOUNT_ID` is correct
- Check that image IDs in `config/site.ts` match your actual Cloudflare Images
- Ensure images are set to "Public" in Cloudflare Images dashboard
- The Delivery Account ID is often different from the API Account ID!

#### Issue: Page loads but images don't show
**Solution:**
- Check browser console for CORS errors
- Verify Cloudflare Images URLs are correct format: `https://imagedelivery.net/{account_id}/{image_id}/public`
- Check if local fallback images exist in `/public/images/` directory

#### Issue: Environment variables not working
**Solution:**
- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- After adding/changing env vars, trigger a new deploy (they're baked into the build)
- Check build logs to see if variables are being read correctly

### 6. Verify Cloudflare Images Configuration

1. Check your Cloudflare Images dashboard
2. Verify images exist and are public
3. Test a direct image URL:
   ```
   https://imagedelivery.net/{DELIVERY_ACCOUNT_ID}/{IMAGE_ID}/public
   ```
4. If this returns 404, the image doesn't exist or isn't public

### 7. Local Testing

Test locally to verify the app works:

```bash
# Set environment variables
export NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID="your-account-id"
export NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ACCOUNT_ID="your-delivery-account-id"

# Run build
npm run build

# Test production build locally
npm start
```

### 8. Check Netlify Function Logs

If you're using any API routes or server functions:
- Go to Netlify dashboard → Functions
- Check for any errors in function logs

### 9. Force Redeploy

Sometimes a clean redeploy fixes issues:
1. Go to Netlify dashboard → Deploys
2. Click "Trigger deploy" → "Clear cache and deploy site"

## Still Having Issues?

1. Check Netlify build logs for specific error messages
2. Check browser console for runtime errors
3. Verify all dependencies are installed correctly
4. Ensure Node.js version matches (should be 20 per `.nvmrc`)

## Quick Fix: Use Local Images

If Cloudflare Images is causing issues, you can temporarily disable it by:
1. Removing or not setting the environment variables
2. The app will automatically fall back to local images in `/public/images/`
3. Ensure local images exist in the correct directories

