/**
 * Generates all Expo icon assets from the web favicon.svg
 * Run from repo root: node scripts/generate-icons.mjs
 */
import sharp from "sharp";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SVG_PATH = resolve(ROOT, "apps/web/public/favicon.svg");
const ASSETS_DIR = resolve(ROOT, "apps/mobile/assets");

const svgBuffer = readFileSync(SVG_PATH);

// SVG sur fond rouge/coloré → on génère le PNG de base avec fond transparent
// Pour splash et icon principal, on centre sur fond blanc

async function makeIcon(size, outputPath, bg = null) {
  const pipeline = sharp(svgBuffer, { density: 300 }).resize(size, size, {
    fit: "contain",
    background: bg || { r: 0, g: 0, b: 0, alpha: 0 },
  });

  if (bg) {
    await pipeline.flatten({ background: bg }).png().toFile(outputPath);
  } else {
    await pipeline.png().toFile(outputPath);
  }

  console.log(`✓ ${outputPath.replace(ROOT, ".")} (${size}x${size})`);
}

async function makeSplash(outputPath) {
  // Splash: 1242x2436, logo centré (200x200) sur fond blanc
  const iconSize = 200;
  const canvasW = 1242;
  const canvasH = 2436;

  const iconBuf = await sharp(svgBuffer, { density: 300 })
    .resize(iconSize, iconSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      {
        input: iconBuf,
        gravity: "center",
      },
    ])
    .png()
    .toFile(outputPath);

  console.log(
    `✓ ${outputPath.replace(ROOT, ".")} (${canvasW}x${canvasH}, icon centered)`,
  );
}

async function makeAndroidForeground(outputPath) {
  // Adaptive icon foreground: 1024x1024
  // Le safe area est les 66% centraux — on dimensionne l'icône à 512px centré
  const iconSize = 512;
  const canvasSize = 1024;

  const iconBuf = await sharp(svgBuffer, { density: 300 })
    .resize(iconSize, iconSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: iconBuf, gravity: "center" }])
    .png()
    .toFile(outputPath);

  console.log(
    `✓ ${outputPath.replace(ROOT, ".")} (${canvasSize}x${canvasSize}, safe-area centered)`,
  );
}

async function makeAndroidBackground(outputPath) {
  // Fond uni — couleur du app.json: #E6F4FE (bleu clair)
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 3,
      background: { r: 230, g: 244, b: 254 },
    },
  })
    .png()
    .toFile(outputPath);

  console.log(
    `✓ ${outputPath.replace(ROOT, ".")} (1024x1024, #E6F4FE background)`,
  );
}

async function makeAndroidMonochrome(outputPath) {
  // Monochrome: même que foreground mais en niveaux de gris
  const iconSize = 512;
  const canvasSize = 1024;

  const iconBuf = await sharp(svgBuffer, { density: 300 })
    .resize(iconSize, iconSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .greyscale()
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: iconBuf, gravity: "center" }])
    .png()
    .toFile(outputPath);

  console.log(
    `✓ ${outputPath.replace(ROOT, ".")} (${canvasSize}x${canvasSize}, monochrome)`,
  );
}

async function main() {
  console.log("Generating Expo icon assets from favicon.svg...\n");

  // Main iOS/web icon
  await makeIcon(1024, `${ASSETS_DIR}/icon.png`, {
    r: 255,
    g: 255,
    b: 255,
    alpha: 1,
  });

  // Splash screen
  await makeSplash(`${ASSETS_DIR}/splash-icon.png`);

  // Android adaptive icon
  await makeAndroidForeground(`${ASSETS_DIR}/android-icon-foreground.png`);
  await makeAndroidBackground(`${ASSETS_DIR}/android-icon-background.png`);
  await makeAndroidMonochrome(`${ASSETS_DIR}/android-icon-monochrome.png`);

  // Web favicon
  await makeIcon(48, `${ASSETS_DIR}/favicon.png`);

  console.log("\nDone! All assets generated in apps/mobile/assets/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
