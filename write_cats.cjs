const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/sections_items_full.json', 'utf8'));
const cats = data.sections.map(s => s.section_label_en).join('\n');
fs.writeFileSync('categories_utf8.txt', cats, 'utf8');
