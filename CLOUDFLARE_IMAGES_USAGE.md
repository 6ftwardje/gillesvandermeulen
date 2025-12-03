# Cloudflare Images - Images Tonen op de Website

## Snelstart: Images Tonen

Je hebt images geüpload naar Cloudflare Images. Nu moet je de Image IDs toevoegen aan `config/site.ts` zodat de website ze kan tonen.

## Methode 1: Automatisch (Aanbevolen)

### Stap 1: Installeer dependencies (als nog niet gedaan)
```bash
npm install --save-dev node-fetch dotenv
```

### Stap 2: Zorg dat .env.local correct is ingesteld
Zorg dat je `.env.local` bestand deze variabelen bevat:
```env
NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID=je_account_id_hier
CLOUDFLARE_IMAGES_API_TOKEN=je_api_token_hier
```

### Stap 3: Run het fetch script
```bash
node scripts/fetch-cloudflare-image-ids.js
```

Dit script:
- Haalt alle images op uit je Cloudflare Images account
- Probeert automatisch de juiste Image IDs te matchen
- Update automatisch `config/site.ts` met de Image IDs

### Stap 4: Test de website
```bash
npm run dev
```

## Methode 2: Handmatig

Als het automatische script niet werkt of je wilt handmatig controleren:

### Stap 1: Vind je Image IDs in Cloudflare

1. Ga naar je Cloudflare Dashboard: https://dash.cloudflare.com
2. Navigeer naar **Images** in het linker menu
3. Je ziet alle geüploade images met hun **Image ID** (bijvoorbeeld: `abc123def456`)

### Stap 2: Update config/site.ts

Open `config/site.ts` en vervang de placeholder Image IDs in het `CLOUDFLARE_IMAGE_IDS` object:

```typescript
const CLOUDFLARE_IMAGE_IDS = {
  hero: [
    'jouw-hero-1-image-id',  // Vervang met werkelijke Image ID
    'jouw-hero-2-image-id',  // Vervang met werkelijke Image ID
    'jouw-hero-3-image-id', // Vervang met werkelijke Image ID
  ],
  statement: {
    large: 'jouw-statement-large-image-id',
    small: 'jouw-statement-small-image-id',
  },
  about: 'jouw-gilles-portrait-image-id',
  atelier: 'jouw-atelier-interior-image-id',
  gallery: {
    'series-1': [
      'jouw-series-1-image-1-id',
      'jouw-series-1-image-2-id',
    ],
    'series-2': [
      'jouw-series-2-image-1-id',
      'jouw-series-2-image-2-id',
    ],
    'series-3': [
      'jouw-series-3-image-1-id',
      'jouw-series-3-image-2-id',
    ],
  },
}
```

### Stap 3: Test de website
```bash
npm run dev
```

## Controleren of het werkt

1. **Start de development server**: `npm run dev`
2. **Open de website** in je browser
3. **Check de Network tab** in DevTools:
   - Images zouden moeten laden van `imagedelivery.net` (Cloudflare)
   - Niet van `localhost` of lokale paths
4. **Check de browser console** voor errors

## Troubleshooting

### Images laden niet
- ✅ Check of `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID` is ingesteld in `.env.local`
- ✅ Check of de Image IDs correct zijn in `config/site.ts`
- ✅ Check of de images daadwerkelijk in Cloudflare Images staan
- ✅ Check de browser console voor errors

### Script werkt niet
- ✅ Installeer dependencies: `npm install --save-dev node-fetch dotenv`
- ✅ Check of `.env.local` bestaat en correct is ingesteld
- ✅ Check of je API token de juiste permissions heeft

### Images worden niet automatisch gematcht
Het automatische matching script probeert images te matchen op basis van:
- Image ID bevat keywords (hero-1, statement-large, etc.)
- Filename bevat keywords

Als dit niet werkt, gebruik **Methode 2** om handmatig de Image IDs toe te voegen.

## Welke Images Zijn Nodig?

De website verwacht deze images:

- **Hero Section**: 3 images (hero-1, hero-2, hero-3)
- **Statement Section**: 2 images (statement-large, statement-small)
- **About Section**: 1 image (gilles-portrait)
- **Atelier Section**: 1 image (atelier-interior)
- **Gallery Series 1**: 2 images
- **Gallery Series 2**: 2 images
- **Gallery Series 3**: 2 images

**Totaal: 13 images**

## Hoe het werkt

Het systeem gebruikt automatisch Cloudflare Images als:
1. `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID` is ingesteld
2. Image IDs zijn geconfigureerd in `config/site.ts`

Als Cloudflare niet is geconfigureerd, gebruikt het systeem automatisch lokale images uit `/public/images/` als fallback.

## Meer informatie

- **Volledige setup tutorial**: `CLOUDFLARE_IMAGES_SETUP.md`
- **Quick start**: `CLOUDFLARE_QUICK_START.md`
- **Cloudflare Images docs**: https://developers.cloudflare.com/images/

