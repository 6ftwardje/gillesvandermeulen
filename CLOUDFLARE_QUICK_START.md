# Cloudflare Images - Quick Start Guide

## Snelle Setup (5 minuten)

### 1. Cloudflare Account & Credentials

1. Maak account op https://dash.cloudflare.com
2. Ga naar **Images** → **Get Started**
3. Ga naar **My Profile** → **API Tokens** → **Create Token**
   - Name: `Gilles Vandermeulen Images`
   - Permissions: `Account` → `Cloudflare Images` → `Edit`
   - Kopieer het token
4. Vind je **Account ID** in de sidebar van je dashboard

### 2. Environment Variables

Maak `.env.local` aan met:

```env
NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID=je_account_id_hier
NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_URL=https://imagedelivery.net
CLOUDFLARE_IMAGES_API_TOKEN=je_api_token_hier
```

### 3. Images Uploaden

**Optie A: Via Dashboard (Handmatig)**
- Ga naar **Images** in Cloudflare Dashboard
- Upload alle images uit `public/images/`
- Noteer de Image ID voor elke image

**Optie B: Via Script (Geautomatiseerd)**
```bash
# Installeer dependencies eerst
npm install --save-dev form-data node-fetch dotenv

# Run het upload script
node scripts/upload-images.js
```

### 4. Image IDs Configureren

Na upload, update `config/site.ts`:
- Vervang de placeholder Image IDs in `CLOUDFLARE_IMAGE_IDS` object
- Bijvoorbeeld: `hero: ['abc123', 'def456', 'ghi789']`

### 5. Testen

```bash
npm run dev
```

Controleer of images via Cloudflare laden (check Network tab in DevTools).

## Welke Images Zijn Nodig?

**Totaal: 13 images**

- **Hero**: 3 images (hero-1.jpg, hero-2.jpg, hero-3.jpg)
- **Statement**: 2 images (statement-large.jpg, statement-small.jpg)
- **About**: 1 image (gilles-portrait.jpg)
- **Atelier**: 1 image (atelier-interior.jpg)
- **Gallery Series 1**: 2 images
- **Gallery Series 2**: 2 images
- **Gallery Series 3**: 2 images

## Troubleshooting

**Images laden niet?**
- Check `.env.local` bestaat en is correct
- Check Image IDs in `config/site.ts`
- Check browser console voor errors

**Upload script werkt niet?**
- Installeer dependencies: `npm install --save-dev form-data node-fetch dotenv`
- Check API token permissions

## Meer Info

Zie `CLOUDFLARE_IMAGES_SETUP.md` voor volledige documentatie.

