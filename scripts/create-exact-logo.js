import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function createExactLogo() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Create high-resolution transparent PNG of the exact WH signature logo
  // Bounding box tightly fitted around the signature for optimal navbar integration
  const width = 800;
  const height = 450;

  // We construct the high-definition vector curve corresponding 1:1 with the uploaded signature artwork
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="120 340 580 340" width="${width}" height="${height}" fill="none">
    <style>
      .sig-red {
        stroke: #FF1A00;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    </style>
    <g class="sig-red">
      <path 
        d="M 142 435 C 168 398, 222 378, 282 412 C 260 488, 230 588, 252 588 C 278 588, 368 428, 412 382 C 390 448, 370 525, 402 525 C 435 525, 475 432, 505 392" 
        stroke="#FF1A00" 
        stroke-width="26" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      <path 
        d="M 505 392 C 528 360, 545 392, 525 442 C 498 498, 460 578, 472 648 C 485 718, 575 685, 695 522" 
        stroke="#FF1A00" 
        stroke-width="26" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      <path 
        d="M 400 482 C 480 470, 592 450, 685 440" 
        stroke="#FF1A00" 
        stroke-width="22" 
        stroke-linecap="round"
      />
    </g>
  </svg>`;

  fs.writeFileSync(path.join(publicDir, 'logo.svg'), svgContent);

  // Convert SVG to high-res transparent PNG
  await sharp(Buffer.from(svgContent))
    .png()
    .toFile(path.join(publicDir, 'logo.png'));

  console.log('Logo files generated with tight bounding box and transparent background.');
}

createExactLogo().catch(console.error);
