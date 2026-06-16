import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const TARGET_DIRS = [
  'public/indoor',
  'public/outdoor',
  'public/clubhouse',
  'public/images',
  'public/img',
  'public/img/amenities'
];

async function processDirectory(dirPath) {
  const absoluteDir = path.resolve(dirPath);
  try {
    const entries = await fs.readdir(absoluteDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      
      const filePath = path.join(absoluteDir, entry.name);
      const ext = path.extname(entry.name).toLowerCase();
      
      if (ext === '.png') {
        await processPng(filePath);
      } else if (ext === '.jpg' || ext === '.jpeg') {
        await processJpg(filePath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }
}

async function processPng(filePath) {
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const baseName = path.basename(filePath, ext);
  const destPath = path.join(dir, `${baseName}.jpg`);
  
  try {
    const stats = await fs.stat(filePath);
    const originalSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    // Check if the file is a valid non-empty PNG
    if (stats.size < 1000) {
      console.log(`ℹ️ Skipping tiny/empty file: ${path.basename(filePath)} (${stats.size} bytes)`);
      return;
    }
    
    console.log(`⏳ Processing PNG: ${path.basename(filePath)} (${originalSizeMB} MB)`);
    
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    let pipeline = image;
    if (metadata.width && metadata.width > 1920) {
      pipeline = pipeline.resize({ width: 1920, fit: 'inside', withoutEnlargement: true });
    }
    
    await pipeline
      .jpeg({ quality: 80, progressive: true })
      .toFile(destPath);
      
    const newStats = await fs.stat(destPath);
    const newSizeKB = (newStats.size / 1024).toFixed(1);
    
    // Delete the original PNG file
    await fs.unlink(filePath);
    console.log(`✅ Converted & Deleted: ${path.basename(filePath)} ➔ ${baseName}.jpg (${newSizeKB} KB, resized to max 1920px)`);
  } catch (error) {
    console.error(`❌ Error converting ${path.basename(filePath)}:`, error.message);
  }
}

async function processJpg(filePath) {
  try {
    const stats = await fs.stat(filePath);
    const originalSizeKB = (stats.size / 1024).toFixed(1);
    
    // Check if image is already small
    if (stats.size < 500 * 1024) {
      // Small file, let's check metadata width just in case it's huge in dimensions but highly compressed
      const image = sharp(filePath);
      const metadata = await image.metadata();
      if (!metadata.width || metadata.width <= 1920) {
        // Absolutely fine as is
        return;
      }
    }
    
    console.log(`⏳ Optimizing JPEG: ${path.basename(filePath)} (${originalSizeKB} KB)`);
    
    const image = sharp(filePath);
    const metadata = await image.metadata();
    const tempPath = `${filePath}.temp`;
    
    let pipeline = image;
    if (metadata.width && metadata.width > 1920) {
      pipeline = pipeline.resize({ width: 1920, fit: 'inside', withoutEnlargement: true });
    }
    
    await pipeline
      .jpeg({ quality: 80, progressive: true })
      .toFile(tempPath);
      
    const tempStats = await fs.stat(tempPath);
    if (tempStats.size < stats.size) {
      await fs.unlink(filePath);
      await fs.rename(tempPath, filePath);
      const newSizeKB = (tempStats.size / 1024).toFixed(1);
      console.log(`✅ Optimized JPEG in-place: ${path.basename(filePath)} (${newSizeKB} KB, resized to max 1920px)`);
    } else {
      // Temp is somehow larger, discard it
      await fs.unlink(tempPath);
      console.log(`ℹ️ JPEG already optimal: ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${path.basename(filePath)}:`, error.message);
  }
}

async function run() {
  console.log('🚀 Starting Gallery Image Compression...');
  for (const dir of TARGET_DIRS) {
    console.log(`\n📂 Scanning directory: ${dir}`);
    await processDirectory(dir);
  }
  console.log('\n🎉 Gallery Image Compression finished!');
}

run();
