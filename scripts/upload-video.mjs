import { put } from '@vercel/blob';
import { readFileSync } from 'fs';
import { join } from 'path';

async function uploadVideo() {
  try {
    // Read the video file
    const videoPath = join(process.cwd(), 'public/videos/zenora_hero_optimized.mp4');
    const videoBuffer = readFileSync(videoPath);
    
    // Upload to Vercel Blob
    const blob = await put('zenora_hero_optimized.mp4', videoBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    
    console.log('✅ Video uploaded successfully!');
    console.log('📹 Video URL:', blob.url);
    console.log('\nUpdate your Hero.tsx with this URL:');
    console.log(`src="${blob.url}"`);
    
  } catch (error) {
    console.error('❌ Error uploading video:', error.message);
    process.exit(1);
  }
}

uploadVideo();
