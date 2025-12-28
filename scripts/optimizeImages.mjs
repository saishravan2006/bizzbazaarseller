import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../public/category-images');
const outputDir = path.join(__dirname, '../public/category-images-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Target dimensions (for thumbnail display)
const TARGET_WIDTH = 200;

async function optimizeImages() {
    const files = fs.readdirSync(inputDir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));

    console.log(`Found ${files.length} images to optimize...`);
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const outputFile = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        const outputPath = path.join(outputDir, outputFile);

        try {
            const originalStats = fs.statSync(inputPath);
            totalOriginalSize += originalStats.size;

            await sharp(inputPath)
                .resize(TARGET_WIDTH, TARGET_WIDTH, {
                    fit: 'cover',
                    position: 'center'
                })
                .webp({ quality: 85 })
                .toFile(outputPath);

            const optimizedStats = fs.statSync(outputPath);
            totalOptimizedSize += optimizedStats.size;

            const savings = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);
            console.log(`✅ ${file} -> ${outputFile} (${(originalStats.size / 1024).toFixed(0)}KB -> ${(optimizedStats.size / 1024).toFixed(0)}KB, -${savings}%)`);
        } catch (err) {
            console.error(`❌ Failed to optimize ${file}:`, err.message);
        }
    }

    console.log('\n📊 Summary:');
    console.log(`   Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(1)} MB`);
    console.log(`   Optimized total: ${(totalOptimizedSize / 1024 / 1024).toFixed(1)} MB`);
    console.log(`   Total savings: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
}

optimizeImages().catch(console.error);
