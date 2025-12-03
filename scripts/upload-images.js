/**
 * Cloudflare Images Upload Script
 * 
 * Dit script upload alle images uit de public/images folder naar Cloudflare Images
 * 
 * Gebruik: node scripts/upload-images.js
 * 
 * Zorg dat je .env.local correct is ingesteld met:
 * - NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID
 * - CLOUDFLARE_IMAGES_API_TOKEN
 */

const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
const fetch = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

const ACCOUNT_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID
const API_TOKEN = process.env.CLOUDFLARE_IMAGES_API_TOKEN
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images')

if (!ACCOUNT_ID || !API_TOKEN) {
  console.error('❌ Error: NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID en CLOUDFLARE_IMAGES_API_TOKEN moeten ingesteld zijn in .env.local')
  process.exit(1)
}

// Mapping van lokale paths naar Cloudflare Image IDs (na upload)
const imageMapping = {}

/**
 * Upload een image naar Cloudflare Images
 */
async function uploadImage(filePath, imageId) {
  const formData = new FormData()
  formData.append('file', fs.createReadStream(filePath))
  formData.append('id', imageId)

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: formData,
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(JSON.stringify(data.errors || data))
    }

    return data.result
  } catch (error) {
    console.error(`❌ Error uploading ${filePath}:`, error.message)
    throw error
  }
}

/**
 * Recursief alle images vinden in een directory
 */
function findImages(dir, basePath = '') {
  const files = fs.readdirSync(dir)
  const images = []

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      images.push(...findImages(filePath, path.join(basePath, file)))
    } else if (/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
      const relativePath = path.join(basePath, file).replace(/\\/g, '/')
      images.push({
        fullPath: filePath,
        relativePath: relativePath,
        name: file,
      })
    }
  }

  return images
}

/**
 * Genereer een Image ID op basis van het pad
 */
function generateImageId(relativePath) {
  // Verwijder /images/ prefix en extensie, vervang / door -
  return relativePath
    .replace(/^images\//, '')
    .replace(/\.[^.]+$/, '')
    .replace(/\//g, '-')
    .toLowerCase()
}

/**
 * Main upload functie
 */
async function main() {
  console.log('🚀 Starting Cloudflare Images upload...\n')

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Error: Images directory not found: ${IMAGES_DIR}`)
    process.exit(1)
  }

  const images = findImages(IMAGES_DIR)
  console.log(`📸 Found ${images.length} images to upload\n`)

  const results = []

  for (const image of images) {
    const imageId = generateImageId(image.relativePath)
    console.log(`📤 Uploading: ${image.relativePath} → ${imageId}`)

    try {
      const result = await uploadImage(image.fullPath, imageId)
      results.push({
        localPath: image.relativePath,
        imageId: result.id,
        filename: image.name,
      })
      console.log(`✅ Uploaded: ${result.id}\n`)
    } catch (error) {
      console.error(`❌ Failed to upload ${image.relativePath}\n`)
      results.push({
        localPath: image.relativePath,
        imageId: null,
        filename: image.name,
        error: error.message,
      })
    }

    // Kleine delay om rate limiting te voorkomen
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  // Genereer config output
  console.log('\n📋 Upload Results:\n')
  console.log('Copy deze Image IDs naar config/site.ts:\n')

  const configOutput = {
    hero: [],
    statement: {},
    about: '',
    atelier: '',
    gallery: {
      'series-1': [],
      'series-2': [],
      'series-3': [],
    },
  }

  for (const result of results) {
    if (!result.imageId) continue

    const path = result.localPath

    if (path.startsWith('images/hero/')) {
      configOutput.hero.push(result.imageId)
    } else if (path.startsWith('images/statement/')) {
      if (path.includes('large')) {
        configOutput.statement.large = result.imageId
      } else if (path.includes('small')) {
        configOutput.statement.small = result.imageId
      }
    } else if (path.startsWith('images/about/')) {
      configOutput.about = result.imageId
    } else if (path.startsWith('images/atelier/')) {
      configOutput.atelier = result.imageId
    } else if (path.includes('series-1')) {
      configOutput.gallery['series-1'].push({
        imageId: result.imageId,
        alt: result.filename,
      })
    } else if (path.includes('series-2')) {
      configOutput.gallery['series-2'].push({
        imageId: result.imageId,
        alt: result.filename,
      })
    } else if (path.includes('series-3')) {
      configOutput.gallery['series-3'].push({
        imageId: result.imageId,
        alt: result.filename,
      })
    }
  }

  console.log(JSON.stringify(configOutput, null, 2))
  console.log('\n✅ Upload complete!')
}

main().catch(console.error)



