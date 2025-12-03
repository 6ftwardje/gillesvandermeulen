# Netlify Secrets Scanning - Oplossing

## Probleem

Netlify's secrets scanning detecteert Cloudflare Images Account IDs in de build output en blokkeert de build. Dit gebeurt omdat `NEXT_PUBLIC_*` environment variables worden ingebouwd in client-side JavaScript.

## Oplossing

De Cloudflare Images Account IDs zijn **publieke identifiers**, geen geheimen. Ze zijn bedoeld om in client-side code te worden gebruikt.

### Optie 1: Via Netlify UI (Aanbevolen)

1. Ga naar je Netlify dashboard
2. Navigeer naar **Site settings** → **Build & deploy** → **Environment**
3. Voeg deze environment variable toe:
   - **Key:** `SECRETS_SCAN_OMIT_KEYS`
   - **Value:** `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID,NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ACCOUNT_ID`

### Optie 2: Via netlify.toml

De `netlify.toml` is al geconfigureerd met `SECRETS_SCAN_OMIT_KEYS`, maar als dit niet werkt, gebruik dan Optie 1.

### Optie 3: Secrets Scanning Volledig Uitschakelen (Niet Aanbevolen)

Als je secrets scanning volledig wilt uitschakelen (niet aanbevolen voor security):

1. Ga naar **Site settings** → **Build & deploy** → **Environment**
2. Voeg toe:
   - **Key:** `SECRETS_SCAN_ENABLED`
   - **Value:** `false`

**Waarschuwing:** Dit schakelt secrets scanning volledig uit voor je site. Gebruik dit alleen als je zeker weet dat je geen echte secrets in je code hebt.

## Waarom Dit Veilig Is

- Cloudflare Images Account IDs zijn **publieke identifiers**
- Ze zijn bedoeld om in URLs te worden gebruikt
- Ze geven geen toegang tot je account zonder API token
- Ze zijn vergelijkbaar met een publieke S3 bucket naam

## Verificatie

Na het toevoegen van `SECRETS_SCAN_OMIT_KEYS`:
1. Trigger een nieuwe deploy
2. De build zou nu moeten slagen
3. Check de build logs om te bevestigen dat secrets scanning deze keys overslaat

## Meer Informatie

- [Netlify Secrets Scanning Docs](https://docs.netlify.com/security/secrets-scanning/)
- [Environment Variables in Netlify](https://docs.netlify.com/environment-variables/overview/)

