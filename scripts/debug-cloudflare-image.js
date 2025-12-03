/**
 * Debug script voor Cloudflare Images
 * 
 * Dit script test of de Cloudflare Images configuratie correct is
 */

// Simuleer environment variables (in Next.js worden deze automatisch geladen)
// Voor dit script moeten we ze handmatig instellen of uit .env.local lezen
const fs = require('fs')
const path = require('path')

// Probeer .env.local te lezen
let envVars = {}
try {
  const envFile = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envFile)) {
    const content = fs.readFileSync(envFile, 'utf8')
    content.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/)
      if (match) {
        envVars[match[1].trim()] = match[2].trim()
      }
    })
  }
} catch (error) {
  console.log('Could not read .env.local')
}

const ACCOUNT_ID = envVars.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID || process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID
const DELIVERY_URL = envVars.NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_URL || process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_URL || 'https://imagedelivery.net'

console.log('🔍 Cloudflare Images Debug\n')
console.log('Environment Variables:')
console.log(`  NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID: ${ACCOUNT_ID || '❌ NOT SET'}`)
console.log(`  NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_URL: ${DELIVERY_URL}\n`)

if (!ACCOUNT_ID) {
  console.log('❌ ERROR: NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID is not set!')
  console.log('   Zorg dat je .env.local bestand deze variabele bevat.')
  process.exit(1)
}

// Test Image ID uit config
const TEST_IMAGE_ID = 'ad402027-d330-414d-13ea-391d835e5900'
const EXPECTED_ACCOUNT_ID = 'ea1f598971ddfc4de86d39ec4533c41a' // Uit curl command

console.log('Test Image ID:', TEST_IMAGE_ID)
console.log('Expected Account ID (from curl):', EXPECTED_ACCOUNT_ID)
console.log('Configured Account ID:', ACCOUNT_ID)
console.log('')

if (ACCOUNT_ID !== EXPECTED_ACCOUNT_ID) {
  console.log('⚠️  WARNING: Account ID mismatch!')
  console.log(`   Configured: ${ACCOUNT_ID}`)
  console.log(`   Expected: ${EXPECTED_ACCOUNT_ID}`)
  console.log('   Update je .env.local met de juiste Account ID\n')
}

// Genereer URL
function getCloudflareImageUrl(imageId, variant = 'public', options = {}) {
  const { width, height, fit = 'cover' } = options
  const params = new URLSearchParams()
  if (width) params.append('width', width.toString())
  if (height) params.append('height', height.toString())
  if (fit) params.append('fit', fit)
  
  const queryString = params.toString()
  const baseUrl = `${DELIVERY_URL}/${ACCOUNT_ID}/${imageId}/${variant}`
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

const imageUrl = getCloudflareImageUrl(TEST_IMAGE_ID, 'public', { fit: 'cover' })
console.log('Generated URL:')
console.log(`  ${imageUrl}\n`)

// Test of URL correct is
const expectedUrl = `https://imagedelivery.net/${EXPECTED_ACCOUNT_ID}/${TEST_IMAGE_ID}/public?fit=cover`
console.log('Expected URL (with correct Account ID):')
console.log(`  ${expectedUrl}\n`)

// Test met fetch
console.log('Testing URL...')
const fetch = require('node-fetch')
fetch(imageUrl, { method: 'HEAD' })
  .then(response => {
    console.log(`Status: ${response.status} ${response.statusText}`)
    if (response.ok) {
      console.log('✅ URL is accessible!')
    } else {
      console.log('❌ URL returned error')
      console.log('   Check of de Account ID correct is in .env.local')
    }
  })
  .catch(error => {
    console.log('❌ Error fetching URL:', error.message)
  })

