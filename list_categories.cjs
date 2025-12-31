const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/sections_items_full.json', 'utf8'));
data.sections.forEach(s => console.log(s.section_label_en));
