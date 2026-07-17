/**
 * ===================================================
 * GENERADOR DE FAVICONS
 * ===================================================
 * 
 * Convierte el logo del CECyTEM Aculco en diferentes
 * tamaños de favicon para la pestaña del navegador.
 * 
 * Uso: node convert-favicon.js
 * ===================================================
 */

import sharp from 'sharp';
import fs from 'fs';

const logoPath = './assets/img/logo-aculco.png';

if (!fs.existsSync(logoPath)) {
  console.error('❌ No se encontró el logo en:', logoPath);
  console.log('💡 Asegúrate de que el archivo exista en assets/img/logo-aculco.png');
  process.exit(1);
}

const faviconDir = './public/favicon';
if (!fs.existsSync(faviconDir)) {
  fs.mkdirSync(faviconDir, { recursive: true });
  console.log(' Carpeta favicon creada');
}

async function generateFavicon(inputPath, outputPath, size) {
  try {
    await sharp(inputPath)
      .resize(size, size)
      .toFile(outputPath);
    console.log(`✅ Generado: ${outputPath} (${size}x${size})`);
  } catch (error) {
    console.error(`❌ Error al generar ${outputPath}:`, error.message);
  }
}

async function main() {
  console.log('🎨 Generando favicons...\n');

  await generateFavicon(logoPath, `${faviconDir}/favicon-16x16.png`, 16);
  await generateFavicon(logoPath, `${faviconDir}/favicon-32x32.png`, 32);
  await generateFavicon(logoPath, `${faviconDir}/apple-touch-icon.png`, 180);
  await generateFavicon(logoPath, `${faviconDir}/favicon-192x192.png`, 192);
  await generateFavicon(logoPath, `${faviconDir}/favicon-512x512.png`, 512);

  try {
    await sharp(logoPath)
      .resize(64, 64)
      .toFile(`${faviconDir}/favicon.ico`);
    console.log(`✅ Generado: ${faviconDir}/favicon.ico (64x64)`);
  } catch (error) {
    console.error('❌ Error al generar favicon.ico:', error.message);
  }

  console.log('\n✨ ¡Favicons generados correctamente!');
  console.log('📂 Ubicación: /public/favicon/');
  console.log('🔄 Recarga tu navegador con Ctrl + Shift + R');
}

main();