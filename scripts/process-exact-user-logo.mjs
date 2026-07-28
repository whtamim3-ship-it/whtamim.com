import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processUserLogo() {
  const rawPath = '/tmp/raw_logo.png';
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  if (!fs.existsSync(rawPath)) {
    console.error('Error: /tmp/raw_logo.png not found');
    process.exit(1);
  }

  // 1. Copy raw original file to /public/logo_original.png
  fs.copyFileSync(rawPath, path.join(publicDir, 'logo_original.png'));

  // 2. Trim transparent margins so the signature logo fits perfectly inside navbar bounds
  const trimmedBuffer = await sharp(rawPath)
    .trim()
    .png()
    .toBuffer();

  const trimmedPath = path.join(publicDir, 'logo.png');
  fs.writeFileSync(trimmedPath, trimmedBuffer);

  const metadata = await sharp(trimmedBuffer).metadata();
  console.log('Trimmed logo metadata:', metadata);

  // 3. Convert trimmed PNG to base64 and create SVG wrapper for /public/logo.svg
  const base64Data = trimmedBuffer.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${metadata.width} ${metadata.height}" width="${metadata.width}" height="${metadata.height}">
  <image href="data:image/png;base64,${base64Data}" width="${metadata.width}" height="${metadata.height}" />
</svg>`;

  fs.writeFileSync(path.join(publicDir, 'logo.svg'), svgContent);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);

  console.log('Successfully saved /public/logo.png, /public/logo.svg, /public/favicon.svg');
}

processUserLogo().catch(err => {
  console.error(err);
  process.exit(1);
});
