/**
 * Optimize new company photos: convert JPEG → WebP, resize to max 1200px width, quality 80.
 * Output organized into public/images/facility/ and public/images/products/ subfolders.
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const SOURCE = resolve('D:/RUPTECH_NEW/RupTech_New_photose_updated');
const PUBLIC = resolve('D:/RUPTECH_NEW/RupTech-Website-main/ruptech-website/public/images');

// Map each source file to its optimized destination and clean filename
const imageMap = [
  // Factory images → facility/
  { src: 'FActory image.jpeg',                 dest: 'facility/factory-interior-1.webp' },
  { src: 'FActory image -2.jpeg',              dest: 'facility/factory-interior-2.webp' },
  { src: 'Factory Image -3.jpeg',              dest: 'facility/factory-interior-3.webp' },

  // CNC machines → facility/
  { src: 'Full Lazer cutting machine.jpeg',    dest: 'facility/laser-cutting-full.webp' },
  { src: 'Lazer Cutting machine.jpeg',         dest: 'facility/laser-cutting-closeup.webp' },
  { src: 'CNC_shearing machine.jpeg',          dest: 'facility/cnc-shearing-machine.webp' },
  { src: 'CNC_turret punching machine amada.jpeg', dest: 'facility/cnc-turret-punch-amada.webp' },
  { src: 'CNC_forming machine.jpeg',           dest: 'facility/cnc-forming-machine.webp' },
  { src: 'Spot Welding.jpeg',                  dest: 'facility/spot-welding-new.webp' },

  // Sheet metal fabrication → facility/
  { src: 'Sheet Metal Fabrication.jpeg',       dest: 'facility/sheet-metal-fabrication-1.webp' },
  { src: 'Sheet metal fabrication2 .jpeg',     dest: 'facility/sheet-metal-fabrication-2.webp' },

  // Powder coating → facility/
  { src: 'Powder Coating oven.jpeg',           dest: 'facility/powder-coating-oven.webp' },
  { src: 'Powder Coting with Canopy.jpeg',     dest: 'facility/powder-coating-canopy-1.webp' },
  { src: 'Powder Coting with Canopy-2.jpeg',   dest: 'facility/powder-coating-canopy-2.webp' },

  // Products → products/
  { src: 'Agri Panel with canopy.jpeg',        dest: 'products/agri-panel-canopy.webp' },
  { src: 'Agri Panel Double door with canopy.jpeg', dest: 'products/agri-panel-double-door-canopy.webp' },
  { src: 'Fire product.jpeg',                  dest: 'products/fire-product-panel.webp' },
];

async function optimize() {
  // Ensure destination dirs exist
  const dirs = [...new Set(imageMap.map(m => join(PUBLIC, m.dest.split('/')[0])))];
  for (const d of dirs) {
    await mkdir(d, { recursive: true });
  }

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const mapping of imageMap) {
    const input = join(SOURCE, mapping.src);
    const output = join(PUBLIC, mapping.dest);

    try {
      const info = await sharp(input).metadata();
      const originalSize = (await import('node:fs')).statSync(input).size;
      totalOriginal += originalSize;

      // Resize to max 1200px width, maintain aspect ratio
      const result = await sharp(input)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toFile(output);

      totalOptimized += result.size;

      const savings = ((1 - result.size / originalSize) * 100).toFixed(1);
      console.log(
        `✓ ${mapping.src} → ${mapping.dest}  ` +
        `(${(originalSize / 1024).toFixed(0)}KB → ${(result.size / 1024).toFixed(0)}KB, -${savings}%)`
      );
    } catch (err) {
      console.error(`✗ ${mapping.src}: ${err.message}`);
    }
  }

  console.log('\n─────────────────────────────────────────');
  console.log(`Total: ${(totalOriginal / 1024).toFixed(0)}KB → ${(totalOptimized / 1024).toFixed(0)}KB`);
  console.log(`Overall savings: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
}

optimize();
