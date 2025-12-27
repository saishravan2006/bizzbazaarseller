const fs = require('fs');
const path = require('path');

const icons = { P01: "apple", P02: "shopping-cart", P03: "milk", P04: "beef", P05: "coffee", P06: "wine", P07: "flame", P08: "sparkles", P09: "pill", P10: "baby", P11: "paw-print", P12: "spray-can", P13: "utensils", P14: "sofa", P15: "armchair", P16: "party-popper", P17: "pen-tool", P18: "book", P19: "gamepad-2", P20: "dumbbell", P21: "music", P22: "smartphone", P23: "tv", P24: "camera", P25: "wifi", P26: "washing-machine", P27: "lightbulb", P28: "battery-charging", P29: "hammer", P30: "building", P31: "paint-bucket", P32: "factory", P33: "package", P34: "boxes", P35: "car", P36: "zap", P37: "briefcase", P38: "watch", P39: "shirt", P40: "shopping-bag", P41: "baby", P42: "footprints", P43: "scissors", P44: "sun", P45: "palette", P46: "stethoscope", P47: "graduation-cap", P48: "sprout", P49: "gift", P50: "snowflake", P51: "home", P52: "shield" };

function slugToLabel(s) {
    return s.split('_').map(w => w === 'AND' ? '&' : w.charAt(0) + w.slice(1).toLowerCase()).join(' ').replace(/ S /g, "'s ");
}

function getIcon(s) {
    const l = s.toLowerCase();
    if (l.includes('fruit')) return 'apple';
    if (l.includes('vegetable')) return 'carrot';
    if (l.includes('meat') || l.includes('beef')) return 'beef';
    if (l.includes('fish') || l.includes('seafood')) return 'fish';
    if (l.includes('frozen') || l.includes('ice')) return 'snowflake';
    if (l.includes('organic') || l.includes('herbal')) return 'leaf';
    if (l.includes('dairy') || l.includes('milk')) return 'milk';
    if (l.includes('bakery') || l.includes('cake')) return 'cake';
    if (l.includes('egg')) return 'egg';
    if (l.includes('coffee')) return 'coffee';
    if (l.includes('baby') || l.includes('infant')) return 'baby';
    if (l.includes('pet') || l.includes('dog')) return 'paw-print';
    if (l.includes('clean') || l.includes('wash')) return 'spray-can';
    if (l.includes('kitchen') || l.includes('cook')) return 'utensils';
    if (l.includes('furniture')) return 'sofa';
    if (l.includes('light')) return 'lightbulb';
    if (l.includes('book')) return 'book';
    if (l.includes('toy') || l.includes('game')) return 'gamepad-2';
    if (l.includes('sport') || l.includes('fitness')) return 'dumbbell';
    if (l.includes('phone') || l.includes('mobile')) return 'smartphone';
    if (l.includes('camera')) return 'camera';
    if (l.includes('car') || l.includes('vehicle')) return 'car';
    if (l.includes('electric') || l.includes('power')) return 'zap';
    if (l.includes('tool')) return 'wrench';
    if (l.includes('safety')) return 'shield';
    if (l.includes('health') || l.includes('medical')) return 'pill';
    if (l.includes('beauty') || l.includes('skin')) return 'sparkles';
    if (l.includes('fashion') || l.includes('wear')) return 'shirt';
    if (l.includes('shoe') || l.includes('footwear')) return 'footprints';
    if (l.includes('jewel')) return 'gem';
    if (l.includes('watch')) return 'watch';
    if (l.includes('bag') || l.includes('travel')) return 'briefcase';
    if (l.includes('gift')) return 'gift';
    if (l.includes('plant') || l.includes('garden')) return 'sprout';
    if (l.includes('water')) return 'droplets';
    if (l.includes('home')) return 'home';
    return 'circle';
}

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.tsv'));
const sections = new Map();

files.forEach(file => {
    const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    content.trim().split('\n').forEach(line => {
        if (!line.trim()) return;
        const [pCode, pSlug, pLabel, cCode, cSlug] = line.split('\t');
        if (!pCode || !cCode) return;

        if (!sections.has(pCode)) {
            sections.set(pCode, {
                section_code: pCode,
                section_slug: pSlug,
                section_label_en: pLabel,
                icon: icons[pCode] || 'circle',
                items: []
            });
        }
        sections.get(pCode).items.push({
            code: cCode,
            slug: cSlug,
            label_en: slugToLabel(cSlug),
            icon: getIcon(cSlug)
        });
    });
});

const arr = Array.from(sections.values()).sort((a, b) => parseInt(a.section_code.slice(1)) - parseInt(b.section_code.slice(1)));
fs.writeFileSync(path.join(__dirname, '../public/sections_items_full.json'), JSON.stringify({ sections: arr }, null, 2));
console.log('Done:', arr.length, 'categories,', arr.reduce((s, x) => s + x.items.length, 0), 'subcategories');
