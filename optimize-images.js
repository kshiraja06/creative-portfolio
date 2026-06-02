const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const QUALITY = 80; // WebP quality (0-100)
const SIZES = [400, 800, 1200, 1600]; // Responsive sizes
const ASSETS_DIR = path.join(__dirname, 'assets');

// Process all images in assets directory
async function optimizeImages(dir, baseDir = ASSETS_DIR) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await optimizeImages(fullPath, baseDir);
    } else if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(item)) {
      await processImage(fullPath, baseDir);
    }
  }
}

async function processImage(imagePath, baseDir) {
  const relativePath = path.relative(baseDir, imagePath);
  const ext = path.extname(imagePath);
  const name = path.basename(imagePath, ext);
  const webpPath = imagePath.replace(ext, '.webp');
  
  console.log(`Processing: ${relativePath}`);
  
  try {
    // Get original metadata
    const metadata = await sharp(imagePath).metadata();
    const { width, height } = metadata;
    
    // Create WebP version at original size
    await sharp(imagePath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);
    
    console.log(`  ✓ Created WebP: ${path.basename(webpPath)} (${(fs.statSync(webpPath).size / 1024).toFixed(1)} KB)`);
    
    // Create responsive sizes for larger images
    if (width > 800) {
      for (const size of SIZES) {
        if (size < width) {
          const sizedWebpPath = imagePath.replace(ext, `-${size}.webp`);
          
          await sharp(imagePath)
            .resize(size, null, { 
              withoutEnlargement: true,
              fit: 'inside'
            })
            .webp({ quality: QUALITY })
            .toFile(sizedWebpPath);
          
          console.log(`  ✓ Created ${size}px WebP: ${path.basename(sizedWebpPath)}`);
        }
      }
    }
    
  } catch (error) {
    console.error(`  ✗ Error processing ${relativePath}:`, error.message);
  }
}

// Run optimization
console.log('Starting image optimization...\n');
optimizeImages(ASSETS_DIR)
  .then(() => console.log('\n✓ Image optimization complete!'))
  .catch(err => console.error('Error:', err));
