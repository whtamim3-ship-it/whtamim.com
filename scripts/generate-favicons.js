import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateFavicons() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const svgPath = path.join(publicDir, 'favicon.svg');
  if (!fs.existsSync(svgPath)) {
    console.error('favicon.svg not found!');
    return;
  }

  const svgBuffer = fs.readFileSync(svgPath);

  const targets = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
    { name: 'favicon.ico', size: 32 }
  ];

  for (const { name, size } of targets) {
    const outputPath = path.join(publicDir, name);
    await sharp(svgBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(outputPath);
    console.log(`Generated ${name} (${size}x${size})`);
  }

  console.log('All favicons generated successfully!');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
