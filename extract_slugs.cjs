const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/sections_items_full.json', 'utf8'));
const cats = data.sections.map(s => ({
    label: s.section_label_en,
    slug: s.section_slug
}));
fs.writeFileSync('categories_slugs.json', JSON.stringify(cats, null, 2), 'utf8');
