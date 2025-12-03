# Cloudflare Images - Complete Overzicht

## Wat is er gedaan?

Het project is volledig voorbereid om Cloudflare Images te gebruiken voor het hosten van alle afbeeldingen. Dit biedt:

✅ **Automatische optimalisatie** - WebP/AVIF conversie  
✅ **CDN distributie** - Snelle laadtijden wereldwijd  
✅ **Automatische compressie** - Zonder kwaliteitsverlies  
✅ **Fallback systeem** - Werkt ook zonder Cloudflare (lokale images)

## Bestanden die zijn aangemaakt/gewijzigd

### Nieuwe bestanden:
- `CLOUDFLARE_IMAGES_SETUP.md` - Volledige setup tutorial
- `CLOUDFLARE_QUICK_START.md` - Snelle start gids
- `lib/cloudflare-images.ts` - Utility functies voor Cloudflare Images
- `scripts/upload-images.js` - Script om images automatisch te uploaden
- `.env.local.example` - Template voor environment variables

### Gewijzigde bestanden:
- `config/site.ts` - Ondersteunt nu Cloudflare Images met fallback
- `next.config.js` - Toegevoegd remotePatterns voor imagedelivery.net
- `.cursor/rules/front-end-cursor-rules.mdc` - Toegevoegd Cloudflare Images info

## Volgende stappen

### 1. Cloudflare Account Setup (5 min)
- Maak account op https://dash.cloudflare.com
- Activeer Cloudflare Images
- Maak API Token met `Cloudflare Images → Edit` permission
- Noteer je Account ID

### 2. Environment Variables (2 min)
```bash
# Kopieer .env.local.example naar .env.local
cp .env.local.example .env.local

# Vul de waarden in:
# - NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID
# - CLOUDFLARE_IMAGES_API_TOKEN
```

### 3. Images Uploaden (10-15 min)

**Optie A: Handmatig via Dashboard**
- Upload alle 13 images via Cloudflare Dashboard
- Noteer de Image ID voor elke image

**Optie B: Automatisch via Script**
```bash
# Installeer dependencies
npm install --save-dev form-data node-fetch dotenv

# Run upload script
node scripts/upload-images.js
```

### 4. Image IDs Configureren (5 min)
- Open `config/site.ts`
- Vervang de placeholder Image IDs in `CLOUDFLARE_IMAGE_IDS` object
- Gebruik de Image IDs die je hebt gekregen na upload

### 5. Testen
```bash
npm run dev
```
- Controleer of images correct laden
- Check Network tab om te zien of images via Cloudflare komen

## Welke Images Zijn Nodig?

**Totaal: 13 images**

### Hero Section (3)
- `hero-1.jpg` - Fullscreen model portrait
- `hero-2.jpg` - Fullscreen model portrait  
- `hero-3.jpg` - Fullscreen model portrait

### Statement Section (2)
- `statement-large.jpg` - Large editorial (4:5 ratio)
- `statement-small.jpg` - Small detail (1:1 ratio)

### About Section (1)
- `gilles-portrait.jpg` - Portrait of Gilles (3:4 ratio)

### Atelier Section (1)
- `atelier-interior.jpg` - Interior photo (4:3 of square)

### Gallery Series 1 (2)
- `series-1-image-1.jpg` - Editorial styling
- `series-1-image-2.jpg` - Editorial styling

### Gallery Series 2 (2)
- `series-2-image-1.jpg` - Studio styling
- `series-2-image-2.jpg` - Studio styling

### Gallery Series 3 (2)
- `series-3-image-1.jpg` - Urban styling
- `series-3-image-2.jpg` - Urban styling

## Hoe het werkt

### Automatische Fallback
Het systeem werkt automatisch:
- **Met Cloudflare**: Gebruikt Cloudflare Images URLs met optimalisatie
- **Zonder Cloudflare**: Gebruikt lokale images uit `/public/images/`

### Image URLs
Images worden gegenereerd via `getCloudflareImageUrl()` in `lib/cloudflare-images.ts`:
- Automatische format conversie (WebP/AVIF)
- Responsive sizing
- Quality optimization

### Configuratie
Alle image configuratie staat in `config/site.ts`:
- `CLOUDFLARE_IMAGE_IDS` object bevat alle Image IDs
- `getImageUrl()` helper functie kiest automatisch tussen Cloudflare en lokaal

## Voor Cursor AI

Cursor heeft nu alle informatie nodig:
- ✅ Cloudflare Images utility functies zijn beschikbaar
- ✅ Config systeem is geïmplementeerd
- ✅ Cursor rules zijn bijgewerkt
- ✅ Fallback systeem werkt automatisch

Cursor kan nu:
- Images toevoegen via Cloudflare Images
- Image URLs genereren met optimalisatie
- Werken met zowel Cloudflare als lokale images

## Troubleshooting

**Images laden niet?**
1. Check `.env.local` bestaat en bevat correcte waarden
2. Check Image IDs in `config/site.ts` zijn correct
3. Check browser console voor errors
4. Check Network tab om te zien welke URLs worden gebruikt

**Upload script werkt niet?**
1. Installeer dependencies: `npm install --save-dev form-data node-fetch dotenv`
2. Check API token heeft juiste permissions
3. Check Account ID is correct

**Images zijn te groot?**
- Cloudflare optimaliseert automatisch
- Je kunt ook `width` en `height` parameters gebruiken in `getCloudflareImageUrl()`

## Documentatie

- **Volledige tutorial**: `CLOUDFLARE_IMAGES_SETUP.md`
- **Quick start**: `CLOUDFLARE_QUICK_START.md`
- **Cloudflare docs**: https://developers.cloudflare.com/images/

## Kosten

- **Free Tier**: 100.000 images/month (meestal voldoende)
- **Paid**: Vanaf $5/month voor meer

Voor dit project is de free tier waarschijnlijk voldoende.



