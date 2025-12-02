# Cloudflare Images Setup Tutorial

## Overzicht

Deze tutorial legt uit hoe je Cloudflare Images instelt voor het Gilles Vandermeulen project. Cloudflare Images biedt automatische optimalisatie, CDN-distributie en transformaties voor alle afbeeldingen.

## Stap 1: Cloudflare Account Setup

1. **Maak een Cloudflare account** (als je er nog geen hebt)
   - Ga naar https://dash.cloudflare.com/sign-up
   - Maak een gratis account aan

2. **Activeer Cloudflare Images**
   - Ga naar je Cloudflare Dashboard
   - Navigeer naar **Images** in het linker menu
   - Klik op **Get Started** of **Enable Images**
   - Cloudflare Images heeft een gratis tier met 100.000 images/month

## Stap 2: API Credentials Ophalen

1. **Ga naar API Tokens**
   - In je Cloudflare Dashboard, ga naar **My Profile** → **API Tokens**
   - Of direct: https://dash.cloudflare.com/profile/api-tokens

2. **Maak een Custom Token**
   - Klik op **Create Token**
   - Kies **Create Custom Token**
   - Geef het token een naam: `Gilles Vandermeulen Images`
   - Permissions:
     - **Account** → **Cloudflare Images** → **Edit**
   - Account Resources:
     - Include → **All accounts** (of specifiek je account)
   - Klik **Continue to summary** en dan **Create Token**
   - **BELANGRIJK**: Kopieer het token direct (je ziet het maar één keer!)

3. **Vind je Account ID**
   - Ga naar je Cloudflare Dashboard
   - Kies je account (rechtsboven)
   - Je Account ID staat rechts in de sidebar onder "Account ID"

## Stap 3: Images Uploaden naar Cloudflare

Je hebt twee opties om images te uploaden:

### Optie A: Via Cloudflare Dashboard (Handmatig)

1. Ga naar **Images** in je Cloudflare Dashboard
2. Klik op **Upload Images**
3. Upload alle benodigde images (zie lijst hieronder)

### Optie B: Via API (Aanbevolen - Geautomatiseerd)

Gebruik het upload script dat we hebben gemaakt (zie `scripts/upload-images.js`)

**Dependencies installeren:**
```bash
npm install --save-dev form-data node-fetch dotenv
```

**Script uitvoeren:**
```bash
node scripts/upload-images.js
```

Het script upload alle images uit `public/images/` en geeft je de Image IDs die je nodig hebt voor de configuratie.

## Stap 4: Benodigde Images Lijst

Upload de volgende images naar Cloudflare Images. Noteer de **Image ID** die Cloudflare genereert voor elke image (dit is een unieke identifier).

### Hero Images (3 stuks)
- `hero-1.jpg` - High-quality model portrait (fullscreen)
- `hero-2.jpg` - High-quality model portrait (fullscreen)
- `hero-3.jpg` - High-quality model portrait (fullscreen)

### Statement Section (2 stuks)
- `statement-large.jpg` - Large editorial image (4:5 aspect ratio)
- `statement-small.jpg` - Small detail image (1:1 aspect ratio)

### About Section (1 stuk)
- `gilles-portrait.jpg` - Portrait of Gilles (3:4 aspect ratio)

### Atelier Section (1 stuk)
- `atelier-interior.jpg` - Architectural interior photo (4:3 of square)

### Gallery Series 1 (2 stuks)
- `series-1-image-1.jpg` - Editorial styling
- `series-1-image-2.jpg` - Editorial styling

### Gallery Series 2 (2 stuks)
- `series-2-image-1.jpg` - Studio styling
- `series-2-image-2.jpg` - Studio styling

### Gallery Series 3 (2 stuks)
- `series-3-image-1.jpg` - Urban styling
- `series-3-image-2.jpg` - Urban styling

**Totaal: 13 images**

## Stap 5: Environment Variables Instellen

1. Maak een `.env.local` bestand in de root van je project (als deze nog niet bestaat)

2. Voeg de volgende variabelen toe:

```env
# Cloudflare Images Configuration
NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID=your_account_id_here
NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_URL=https://imagedelivery.net
CLOUDFLARE_IMAGES_API_TOKEN=your_api_token_here
```

3. Vervang:
   - `your_account_id_here` met je Cloudflare Account ID
   - `your_api_token_here` met je API Token

4. **BELANGRIJK**: Voeg `.env.local` toe aan `.gitignore` (als deze nog niet bestaat)

## Stap 6: Image IDs Configureren

Na het uploaden van alle images, moet je de Image IDs configureren in `config/site.ts`.

Voor elke image die je uploadt, krijg je een unieke Image ID (bijvoorbeeld: `abc123def456`).

Update `config/site.ts` met de Image IDs. Zie de code voor de exacte structuur.

## Stap 7: Next.js Configuratie

De `next.config.js` is al geconfigureerd om Cloudflare Images te accepteren. De configuratie staat in `next.config.js`:

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'imagedelivery.net',
    },
  ],
}
```

## Stap 8: Testen

1. Start je development server: `npm run dev`
2. Controleer of alle images correct laden
3. Test op verschillende schermformaten (responsive)
4. Controleer de Network tab in DevTools om te zien of images via Cloudflare worden geleverd

## Cloudflare Images Features

### Automatische Optimalisatie
- Cloudflare converteert automatisch naar WebP/AVIF waar mogelijk
- Automatische compressie zonder kwaliteitsverlies

### Transformations
Je kunt transformations toevoegen aan image URLs:
- Resize: `?width=1200&height=1600&fit=crop`
- Quality: `?quality=90`
- Format: Automatisch (WebP/AVIF waar ondersteund)

### CDN Distributie
- Alle images worden wereldwijd gedistribueerd via Cloudflare's CDN
- Snellere laadtijden wereldwijd

## Troubleshooting

### Images laden niet
- Controleer of je Image IDs correct zijn in `config/site.ts`
- Controleer of je environment variables correct zijn ingesteld
- Controleer de browser console voor errors

### API Token werkt niet
- Zorg dat het token de juiste permissions heeft (Cloudflare Images → Edit)
- Controleer of het token niet is verlopen
- Maak een nieuw token aan als nodig

### Images zijn te groot
- Cloudflare Images optimaliseert automatisch, maar je kunt ook transformations gebruiken
- Gebruik de `width` en `height` parameters in de URL

## Kosten

- **Free Tier**: 100.000 images/month
- **Paid Tier**: Vanaf $5/month voor meer images
- Voor dit project is de free tier waarschijnlijk voldoende

## Hulp

- Cloudflare Images Docs: https://developers.cloudflare.com/images/
- Cloudflare Dashboard: https://dash.cloudflare.com

