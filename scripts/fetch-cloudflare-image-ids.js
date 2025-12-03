/**
 * Cloudflare Images - Fetch Image IDs Script
 * 
 * Dit script haalt alle Image IDs op uit Cloudflare Images en update config/site.ts
 * 
 * Gebruik: node scripts/fetch-cloudflare-image-ids.js
 * 
 * Zorg dat je .env.local correct is ingesteld met:
 * - NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID
 * - CLOUDFLARE_IMAGES_API_TOKEN
 */

const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

const ACCOUNT_ID = process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID
const API_TOKEN = process.env.CLOUDFLARE_IMAGES_API_TOKEN
const CONFIG_FILE = path.join(process.cwd(), 'config', 'site.ts')

if (!ACCOUNT_ID || !API_TOKEN) {
  console.error('❌ Error: NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_ID en CLOUDFLARE_IMAGES_API_TOKEN moeten ingesteld zijn in .env.local')
  process.exit(1)
}

/**
 * Haal alle images op uit Cloudflare Images
 */
async function fetchAllImages() {
  const images = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/images/v1?page=${page}&per_page=100`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(JSON.stringify(data.errors || data))
      }

      if (data.result && data.result.images) {
        images.push(...data.result.images)
        hasMore = data.result.images.length === 100
        page++
      } else {
        hasMore = false
      }
    } catch (error) {
      console.error(`❌ Error fetching images:`, error.message)
      throw error
    }
  }

  return images
}

/**
 * Match image IDs op basis van filename of ID pattern
 */
function matchImageIds(images) {
  const mapping = {
    hero: [],
    statement: { large: null, small: null },
    about: null,
    atelier: null,
    gallery: {
      'series-1': [],
      'series-2': [],
      'series-3': [],
    },
  }

  // Helper om te checken of een image ID of filename matcht met een pattern
  function matches(image, patterns) {
    const id = image.id.toLowerCase()
    const filename = (image.filename || '').toLowerCase()
    
    return patterns.some(pattern => 
      id.includes(pattern.toLowerCase()) || 
      filename.includes(pattern.toLowerCase())
    )
  }

  // Sorteer images op upload datum (nieuwste eerst)
  const sortedImages = [...images].sort((a, b) => 
    new Date(b.uploaded) - new Date(a.uploaded)
  )

  // Match hero images
  const heroPatterns = ['hero-1', 'hero-2', 'hero-3', 'hero1', 'hero2', 'hero3']
  sortedImages.forEach(image => {
    if (matches(image, heroPatterns) && mapping.hero.length < 3) {
      mapping.hero.push(image.id)
    }
  })

  // Match statement images
  sortedImages.forEach(image => {
    if (matches(image, ['statement-large', 'statementlarge', 'statement_large'])) {
      mapping.statement.large = image.id
    } else if (matches(image, ['statement-small', 'statementsmall', 'statement_small'])) {
      mapping.statement.small = image.id
    }
  })

  // Match about image
  sortedImages.forEach(image => {
    if (matches(image, ['gilles-portrait', 'gillesportrait', 'about', 'portrait']) && !mapping.about) {
      mapping.about = image.id
    }
  })

  // Match atelier image
  sortedImages.forEach(image => {
    if (matches(image, ['atelier', 'interior', 'studio']) && !mapping.atelier) {
      mapping.atelier = image.id
    }
  })

  // Match gallery images
  sortedImages.forEach(image => {
    if (matches(image, ['series-1', 'series1', 'series_1'])) {
      if (mapping.gallery['series-1'].length < 2) {
        mapping.gallery['series-1'].push(image.id)
      }
    } else if (matches(image, ['series-2', 'series2', 'series_2'])) {
      if (mapping.gallery['series-2'].length < 2) {
        mapping.gallery['series-2'].push(image.id)
      }
    } else if (matches(image, ['series-3', 'series3', 'series_3'])) {
      if (mapping.gallery['series-3'].length < 2) {
        mapping.gallery['series-3'].push(image.id)
      }
    }
  })

  return mapping
}

/**
 * Update config/site.ts met de Image IDs
 */
function updateConfigFile(imageMapping) {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error(`❌ Error: Config file not found: ${CONFIG_FILE}`)
    process.exit(1)
  }

  let configContent = fs.readFileSync(CONFIG_FILE, 'utf8')

  // Update hero images
  const heroRegex = /hero:\s*\[([^\]]*)\]/s
  const heroIds = imageMapping.hero.map(id => `'${id}'`).join(',\n    ')
  configContent = configContent.replace(
    heroRegex,
    `hero: [\n    ${heroIds}\n  ]`
  )

  // Update statement images
  configContent = configContent.replace(
    /large:\s*'[^']*'/,
    `large: '${imageMapping.statement.large || 'statement-large'}'`
  )
  configContent = configContent.replace(
    /small:\s*'[^']*'/,
    `small: '${imageMapping.statement.small || 'statement-small'}'`
  )

  // Update about image
  configContent = configContent.replace(
    /about:\s*'[^']*'/,
    `about: '${imageMapping.about || 'gilles-portrait'}'`
  )

  // Update atelier image
  configContent = configContent.replace(
    /atelier:\s*'[^']*'/,
    `atelier: '${imageMapping.atelier || 'atelier-interior'}'`
  )

  // Update gallery series
  for (const series of ['series-1', 'series-2', 'series-3']) {
    const seriesRegex = new RegExp(`'${series}':\\s*\\[([^\\]]*)\\]`, 's')
    const seriesIds = imageMapping.gallery[series]
      .map(id => `'${id}'`)
      .join(',\n      ')
    configContent = configContent.replace(
      seriesRegex,
      `'${series}': [\n      ${seriesIds}\n    ]`
    )
  }

  fs.writeFileSync(CONFIG_FILE, configContent, 'utf8')
}

/**
 * Main functie
 */
async function main() {
  console.log('🚀 Fetching Cloudflare Images...\n')

  try {
    const images = await fetchAllImages()
    console.log(`📸 Found ${images.length} images in Cloudflare\n`)

    if (images.length === 0) {
      console.log('⚠️  No images found in Cloudflare Images.')
      console.log('   Make sure you have uploaded images to Cloudflare Images first.')
      process.exit(0)
    }

    // Toon alle images
    console.log('📋 All images in Cloudflare:\n')
    images.forEach((image, index) => {
      console.log(`${index + 1}. ID: ${image.id}`)
      if (image.filename) console.log(`   Filename: ${image.filename}`)
      console.log(`   Uploaded: ${new Date(image.uploaded).toLocaleDateString()}\n`)
    })

    // Match images
    const mapping = matchImageIds(images)
    
    console.log('\n🔍 Matched Image IDs:\n')
    console.log(JSON.stringify(mapping, null, 2))

    // Check of alle images gematcht zijn
    const missing = []
    if (mapping.hero.length < 3) missing.push(`${3 - mapping.hero.length} hero image(s)`)
    if (!mapping.statement.large) missing.push('statement-large')
    if (!mapping.statement.small) missing.push('statement-small')
    if (!mapping.about) missing.push('about (gilles-portrait)')
    if (!mapping.atelier) missing.push('atelier')
    if (mapping.gallery['series-1'].length < 2) missing.push(`${2 - mapping.gallery['series-1'].length} series-1 image(s)`)
    if (mapping.gallery['series-2'].length < 2) missing.push(`${2 - mapping.gallery['series-2'].length} series-2 image(s)`)
    if (mapping.gallery['series-3'].length < 2) missing.push(`${2 - mapping.gallery['series-3'].length} series-3 image(s)`)

    if (missing.length > 0) {
      console.log('\n⚠️  Warning: Some images could not be automatically matched:')
      missing.forEach(item => console.log(`   - ${item}`))
      console.log('\n   You may need to manually update config/site.ts with the correct Image IDs.')
    }

    // Update config file
    console.log('\n📝 Updating config/site.ts...')
    updateConfigFile(mapping)
    console.log('✅ Config file updated!')

    console.log('\n✅ Done! Your website should now display images from Cloudflare.')
    console.log('   Run "npm run dev" to test.')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

main().catch(console.error)

