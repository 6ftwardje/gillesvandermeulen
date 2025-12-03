# Netlify Environment Variables Checklist

## Cloudflare Images Configuration

Zorg dat deze environment variables zijn ingesteld in je Netlify dashboard:

### ✅ Verplicht voor Cloudflare Images:

1. **`NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID`**
   - Je Cloudflare API Account ID
   - Waarde: `ea1f598971ddfc4de86d39ec4533c41a`
   - Gebruikt voor API calls

2. **`NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ACCOUNT_ID`** ⚠️ **BELANGRIJK!**
   - Je Cloudflare Delivery Account ID
   - Waarde: `ITLtsL1PDcZ_8LHvX4dxbQ`
   - Gebruikt in image URLs
   - **Dit is vaak anders dan de API Account ID!**

### ✅ Optioneel:

3. **`NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_URL`**
   - Meestal niet nodig om te wijzigen
   - Standaard: `https://imagedelivery.net`

## Hoe te vinden:

### Delivery Account ID vinden:

1. Maak een API call naar een image:
```bash
curl -H "Authorization: Bearer <jouw_api_token>" \
  https://api.cloudflare.com/client/v4/accounts/ea1f598971ddfc4de86d39ec4533c41a/images/v1/ad402027-d330-414d-13ea-391d835e5900
```

2. In de response, kijk naar de `variants` array:
```json
{
  "result": {
    "variants": [
      "https://imagedelivery.net/ITLtsL1PDcZ_8LHvX4dxbQ/ad402027-d330-414d-13ea-391d835e5900/public"
    ]
  }
}
```

3. De Delivery Account ID is het deel tussen `imagedelivery.net/` en de image ID:
   - In dit voorbeeld: `ITLtsL1PDcZ_8LHvX4dxbQ`

## Netlify Dashboard:

1. Ga naar je Netlify site dashboard
2. Navigeer naar **Site settings** → **Environment variables**
3. Voeg alle bovenstaande variabelen toe
4. **Trigger een nieuwe deploy** na het toevoegen van variabelen

## Testen:

Na het deployen, check:
- Open je website in de browser
- Open Developer Tools → Network tab
- Check of image requests naar `imagedelivery.net` gaan
- Check of de URLs de juiste Delivery Account ID bevatten

## Troubleshooting:

**404 errors op images?**
- ✅ Check of `NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ACCOUNT_ID` is ingesteld
- ✅ Check of de Delivery Account ID correct is (kan anders zijn dan API Account ID)
- ✅ Check of je een nieuwe deploy hebt gedaan na het toevoegen van variabelen

**Images laden niet?**
- ✅ Check browser console voor errors
- ✅ Check Network tab om te zien welke URLs worden gebruikt
- ✅ Verify dat de image IDs correct zijn in `config/site.ts`

