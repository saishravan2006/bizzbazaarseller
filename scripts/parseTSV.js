// Script to parse TSV data and generate complete sections_items_full.json
const fs = require('fs');
const path = require('path');

// Icon mapping for parent categories
const parentIcons = {
    P01: "apple", P02: "shopping-cart", P03: "milk", P04: "beef", P05: "coffee",
    P06: "wine", P07: "flame", P08: "sparkles", P09: "pill", P10: "baby",
    P11: "paw-print", P12: "spray-can", P13: "utensils", P14: "sofa", P15: "armchair",
    P16: "party-popper", P17: "pen-tool", P18: "book", P19: "gamepad-2", P20: "dumbbell",
    P21: "music", P22: "smartphone", P23: "tv", P24: "camera", P25: "wifi",
    P26: "washing-machine", P27: "lightbulb", P28: "battery-charging", P29: "hammer", P30: "building",
    P31: "paint-bucket", P32: "factory", P33: "package", P34: "boxes", P35: "car",
    P36: "zap", P37: "briefcase", P38: "watch", P39: "shirt", P40: "shopping-bag",
    P41: "baby", P42: "footprints", P43: "scissors", P44: "sun", P45: "palette",
    P46: "stethoscope", P47: "graduation-cap", P48: "sprout", P49: "gift", P50: "snowflake",
    P51: "home", P52: "shield"
};

// Subcategory icon suggestions based on keywords
function getSubcategoryIcon(slug) {
    const s = slug.toLowerCase();
    if (s.includes('fruit')) return 'apple';
    if (s.includes('vegetable')) return 'carrot';
    if (s.includes('meat') || s.includes('beef') || s.includes('mutton') || s.includes('pork')) return 'beef';
    if (s.includes('poultry') || s.includes('bird')) return 'bird';
    if (s.includes('seafood') || s.includes('fish')) return 'fish';
    if (s.includes('frozen') || s.includes('ice') || s.includes('cold')) return 'snowflake';
    if (s.includes('organic') || s.includes('herbal') || s.includes('natural')) return 'leaf';
    if (s.includes('dairy') || s.includes('milk')) return 'milk';
    if (s.includes('bakery') || s.includes('bread') || s.includes('cake')) return 'cake';
    if (s.includes('cheese')) return 'cheese';
    if (s.includes('egg')) return 'egg';
    if (s.includes('coffee')) return 'coffee';
    if (s.includes('tea')) return 'coffee';
    if (s.includes('juice') || s.includes('drink') || s.includes('beverage')) return 'cup-soda';
    if (s.includes('wine') || s.includes('alcohol')) return 'wine';
    if (s.includes('beer')) return 'beer';
    if (s.includes('baby') || s.includes('infant') || s.includes('newborn') || s.includes('toddler') || s.includes('kids') || s.includes('child')) return 'baby';
    if (s.includes('pet') || s.includes('dog') || s.includes('cat')) return 'paw-print';
    if (s.includes('clean') || s.includes('wash') || s.includes('laundry')) return 'spray-can';
    if (s.includes('kitchen') || s.includes('cook') || s.includes('utensil')) return 'utensils';
    if (s.includes('furniture') || s.includes('sofa') || s.includes('bed')) return 'sofa';
    if (s.includes('light') || s.includes('lamp')) return 'lightbulb';
    if (s.includes('decor') || s.includes('art') || s.includes('craft')) return 'palette';
    if (s.includes('book') || s.includes('education') || s.includes('learn')) return 'book';
    if (s.includes('toy') || s.includes('game') || s.includes('play')) return 'gamepad-2';
    if (s.includes('sport') || s.includes('fitness') || s.includes('gym')) return 'dumbbell';
    if (s.includes('music') || s.includes('audio') || s.includes('sound')) return 'music';
    if (s.includes('phone') || s.includes('mobile')) return 'smartphone';
    if (s.includes('computer') || s.includes('laptop') || s.includes('pc')) return 'laptop';
    if (s.includes('tv') || s.includes('television')) return 'tv';
    if (s.includes('camera') || s.includes('photo')) return 'camera';
    if (s.includes('car') || s.includes('auto') || s.includes('vehicle')) return 'car';
    if (s.includes('bike') || s.includes('cycle')) return 'bike';
    if (s.includes('electric') || s.includes('power') || s.includes('battery')) return 'zap';
    if (s.includes('tool') || s.includes('hardware')) return 'wrench';
    if (s.includes('paint')) return 'paint-bucket';
    if (s.includes('safety') || s.includes('security')) return 'shield';
    if (s.includes('medical') || s.includes('health') || s.includes('pharma')) return 'pill';
    if (s.includes('beauty') || s.includes('skin') || s.includes('hair')) return 'sparkles';
    if (s.includes('fashion') || s.includes('wear') || s.includes('cloth')) return 'shirt';
    if (s.includes('shoe') || s.includes('footwear')) return 'footprints';
    if (s.includes('jewel') || s.includes('gold') || s.includes('diamond')) return 'gem';
    if (s.includes('watch')) return 'watch';
    if (s.includes('bag') || s.includes('luggage') || s.includes('travel')) return 'briefcase';
    if (s.includes('gift') || s.includes('party')) return 'gift';
    if (s.includes('plant') || s.includes('garden') || s.includes('seed')) return 'sprout';
    if (s.includes('farm') || s.includes('agri')) return 'tractor';
    if (s.includes('water')) return 'droplets';
    if (s.includes('fire') || s.includes('flame')) return 'flame';
    if (s.includes('home') || s.includes('house')) return 'home';
    if (s.includes('office') || s.includes('work')) return 'building';
    if (s.includes('storage') || s.includes('container') || s.includes('box')) return 'box';
    if (s.includes('cable') || s.includes('wire')) return 'cable';
    if (s.includes('printer') || s.includes('print')) return 'printer';
    if (s.includes('monitor') || s.includes('display') || s.includes('screen')) return 'monitor';
    return 'circle'; // default
}

// Convert slug to readable label
function slugToLabel(slug) {
    return slug
        .split('_')
        .map(word => {
            // Handle special cases
            if (word === 'AND') return '&';
            if (word === 'S') return "'s";
            if (word === 'RTD') return 'RTD';
            if (word === 'OTC') return 'OTC';
            if (word === 'DIY') return 'DIY';
            if (word === 'IT') return 'IT';
            if (word === 'AI') return 'AI';
            if (word === 'EV') return 'EV';
            if (word === 'TV') return 'TV';
            if (word === 'DJ') return 'DJ';
            if (word === 'PA') return 'PA';
            if (word === 'AV') return 'AV';
            if (word === 'HVAC') return 'HVAC';
            if (word === 'IOT') return 'IoT';
            if (word === 'UPS') return 'UPS';
            if (word === 'LED') return 'LED';
            if (word === 'PPE') return 'PPE';
            if (word === 'CCTV') return 'CCTV';
            if (word === 'CAD') return 'CAD';
            if (word === 'CAM') return 'CAM';
            if (word === 'B2B') return 'B2B';
            if (word === 'D2C') return 'D2C';
            if (word === 'RFID') return 'RFID';
            if (word === 'PV') return 'PV';
            if (word === 'MRO') return 'MRO';
            if (word === 'MICE') return 'MICE';
            if (word === 'DTH') return 'DTH';
            if (word === 'OTG') return 'OTG';
            if (word === 'SMPS') return 'SMPS';
            if (word === 'EMS') return 'EMS';
            if (word === 'ELV') return 'ELV';
            if (word === 'CSSD') return 'CSSD';
            if (word === 'GI') return 'GI';
            if (word === 'STEM') return 'STEM';
            if (word === 'K') return 'K';
            if (word === '12') return '12';
            if (word === 'FX') return 'FX';
            if (word === 'FPV') return 'FPV';
            if (word === 'UAV') return 'UAV';
            if (word === 'SOHO') return 'SOHO';
            if (word === 'POS') return 'POS';
            if (word === 'QA') return 'QA';
            if (word === 'ETP') return 'ETP';
            if (word === 'ENT') return 'ENT';
            if (word === 'OTT') return 'OTT';
            if (word === '0') return '0.0%';
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ')
        .replace(/ S /g, "'s ")
        .replace(/^S /, '')
        .replace(/ & /g, ' & ')
        .replace(/K 12/g, 'K-12')
        .replace(/0\.0% 0\.0%/g, '0.0%')
        .replace(/  +/g, ' ')
        .trim();
}

// TSV data (parsed from user input)
const tsvData = `P01	FRESH_PRODUCE	Fresh Produce	P01.C01	CUT_PEELED_AND_PREPPED_PRODUCE
P01	FRESH_PRODUCE	Fresh Produce	P01.C02	EDIBLE_FLOWERS_WRAPPERS_AND_CULINARY_LEAVES
P01	FRESH_PRODUCE	Fresh Produce	P01.C03	FRESH_FRUITS
P01	FRESH_PRODUCE	Fresh Produce	P01.C04	FRESH_VEGETABLES
P01	FRESH_PRODUCE	Fresh Produce	P01.C05	FROZEN_FRUITS_AND_VEGETABLES
P01	FRESH_PRODUCE	Fresh Produce	P01.C06	MUSHROOMS_AND_FUNGI
P01	FRESH_PRODUCE	Fresh Produce	P01.C07	ORGANIC_AND_RESIDUE_FREE_PRODUCE
P01	FRESH_PRODUCE	Fresh Produce	P01.C09	SPROUTS_MICROGREENS_AND_SHOOTS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C01	BAKING_AND_DESSERT_INGREDIENTS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C02	BISCUITS_COOKIES_CAKES_AND_RUSKS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C03	BREAKFAST_JAMS_AND_SPREADS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C04	CANNED_JARRED_AND_DEHYDRATED_FOODS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C05	CHAAT_STREET_AND_REGIONAL_ESSENTIALS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C06	CONDIMENTS_SAUCES_AND_VINEGARS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C07	COOKING_PASTES_STOCKS_AND_BASES
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C08	DRY_FRUITS_NUTS_SEEDS_AND_TRAIL_MIX
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C09	FASTING_AND_RELIGIOUS_FOODS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C10	HEALTH_ORGANIC_AND_DIET_FOODS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C11	INSTANT_FOODS_PASTA_AND_NOODLES
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C12	MISCELLANEOUS_AND_CATCH_ALL
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C13	OILS_FATS_AND_GHEE
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C14	PAPADS_FRYUMS_AND_APPALAMS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C15	PICKLES_CHUTNEYS_AND_PODIS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C16	READY_TO_COOK_AND_BATTERS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C17	READY_TO_EAT
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C18	SNACKS_NAMKEEN_AND_READY_MUNCH
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C19	SPICES_MASALAS_HERBS_AND_PASTES
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C20	STAPLES_AND_GRAINS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C21	SUGARS_SALTS_AND_SWEETENERS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C22	SWEETS_MITHAI_AND_CONFECTIONERY
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C23	THICKENERS_ADDITIVES_AND_CULINARY_AIDS
P02	GROCERY_STAPLES_AND_PACKAGED_FOODS	Grocery, Staples & Packaged Foods	P02.C24	WORLD_FOODS_AND_GOURMET
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C01	BUTTER_GHEE_AND_CREAM
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C02	CAKES_PASTRIES_DONUTS_AND_MUFFINS
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C03	CHEESE
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C04	CHILLED_AND_AMBIENT_DAIRY_DESSERTS
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C05	CONDENSED_EVAPORATED_AND_MILK_POWDERS
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C06	COOKIES_KHARI_RUSKS_AND_TEA_SNACKS
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C07	CURD_YOGURT_AND_CULTURED_PRODUCTS
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C08	DAIRY_ALTERNATIVES
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C09	EGGS_AND_EGG_PRODUCTS
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C10	FRESH_BAKERY_BREADS_BUNS_AND_FLATBREADS
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C11	FROZEN_AND_PAR_BAKED_BAKERY
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C12	ICE_CREAMS_AND_FROZEN_DESSERTS
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C13	MILK_AND_MILK_BEVERAGES
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C14	PANEER_CHHENA_KHOYA_AND_TRADITIONAL_DAIRY
P03	DAIRY_BAKERY_AND_EGGS	Dairy, Bakery & Eggs	P03.C15	SAVOURY_BAKERY_SANDWICHES_AND_READY_BAKES`;

// Parse TSV
const lines = tsvData.trim().split('\n');
const sections = new Map();

for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split('\t');
    if (parts.length < 5) continue;

    const [parentCode, parentSlug, parentLabel, childCode, childSlug] = parts;

    if (!sections.has(parentCode)) {
        sections.set(parentCode, {
            section_code: parentCode,
            section_slug: parentSlug,
            section_label_en: parentLabel,
            icon: parentIcons[parentCode] || 'circle',
            items: []
        });
    }

    sections.get(parentCode).items.push({
        code: childCode,
        slug: childSlug,
        label_en: slugToLabel(childSlug),
        icon: getSubcategoryIcon(childSlug)
    });
}

// Convert to array and sort
const sectionsArray = Array.from(sections.values()).sort((a, b) => {
    const numA = parseInt(a.section_code.slice(1));
    const numB = parseInt(b.section_code.slice(1));
    return numA - numB;
});

const output = { sections: sectionsArray };

// Write output
const outputPath = path.join(__dirname, '../public/sections_items_full.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log('✅ Generated sections_items_full.json');
console.log(`   - ${sectionsArray.length} parent categories`);
console.log(`   - ${sectionsArray.reduce((sum, s) => sum + s.items.length, 0)} subcategories`);
