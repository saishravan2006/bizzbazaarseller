// Final generator script - combines all parts and generates the JSON
const fs = require('fs');
const path = require('path');

// Import all parts
const { categoriesPart2 } = require('./categoriesPart2.js');
const { categoriesPart3 } = require('./categoriesPart3.js');
const { categoriesPart4 } = require('./categoriesPart4.js');
const { categoriesPart5 } = require('./categoriesPart5.js');

// Part 1 - inline for simplicity
const categoriesPart1 = [
    {
        code: "P01", slug: "FRESH_PRODUCE", label: "Fresh Produce", icon: "apple", items: [
            { code: "P01.C01", slug: "CUT_PEELED_AND_PREPPED_PRODUCE", icon: "scissors" },
            { code: "P01.C02", slug: "EDIBLE_FLOWERS_WRAPPERS_AND_CULINARY_LEAVES", icon: "flower" },
            { code: "P01.C03", slug: "FRESH_FRUITS", icon: "apple" },
            { code: "P01.C04", slug: "FRESH_VEGETABLES", icon: "carrot" },
            { code: "P01.C05", slug: "FROZEN_FRUITS_AND_VEGETABLES", icon: "snowflake" },
            { code: "P01.C06", slug: "MUSHROOMS_AND_FUNGI", icon: "circle" },
            { code: "P01.C07", slug: "ORGANIC_AND_RESIDUE_FREE_PRODUCE", icon: "leaf" },
            { code: "P01.C09", slug: "SPROUTS_MICROGREENS_AND_SHOOTS", icon: "sprout" }
        ]
    },
    {
        code: "P02", slug: "GROCERY_STAPLES_AND_PACKAGED_FOODS", label: "Grocery, Staples & Packaged Foods", icon: "shopping-cart", items: [
            { code: "P02.C01", slug: "BAKING_AND_DESSERT_INGREDIENTS", icon: "cake" },
            { code: "P02.C02", slug: "BISCUITS_COOKIES_CAKES_AND_RUSKS", icon: "cookie" },
            { code: "P02.C03", slug: "BREAKFAST_JAMS_AND_SPREADS", icon: "sandwich" },
            { code: "P02.C04", slug: "CANNED_JARRED_AND_DEHYDRATED_FOODS", icon: "package" },
            { code: "P02.C05", slug: "CHAAT_STREET_AND_REGIONAL_ESSENTIALS", icon: "utensils" },
            { code: "P02.C06", slug: "CONDIMENTS_SAUCES_AND_VINEGARS", icon: "flask-conical" },
            { code: "P02.C07", slug: "COOKING_PASTES_STOCKS_AND_BASES", icon: "soup" },
            { code: "P02.C08", slug: "DRY_FRUITS_NUTS_SEEDS_AND_TRAIL_MIX", icon: "nut" },
            { code: "P02.C09", slug: "FASTING_AND_RELIGIOUS_FOODS", icon: "heart" },
            { code: "P02.C10", slug: "HEALTH_ORGANIC_AND_DIET_FOODS", icon: "salad" },
            { code: "P02.C11", slug: "INSTANT_FOODS_PASTA_AND_NOODLES", icon: "utensils" },
            { code: "P02.C12", slug: "MISCELLANEOUS_AND_CATCH_ALL", icon: "box" },
            { code: "P02.C13", slug: "OILS_FATS_AND_GHEE", icon: "droplet" },
            { code: "P02.C14", slug: "PAPADS_FRYUMS_AND_APPALAMS", icon: "circle" },
            { code: "P02.C15", slug: "PICKLES_CHUTNEYS_AND_PODIS", icon: "jar" },
            { code: "P02.C16", slug: "READY_TO_COOK_AND_BATTERS", icon: "chef-hat" },
            { code: "P02.C17", slug: "READY_TO_EAT", icon: "utensils-crossed" },
            { code: "P02.C18", slug: "SNACKS_NAMKEEN_AND_READY_MUNCH", icon: "popcorn" },
            { code: "P02.C19", slug: "SPICES_MASALAS_HERBS_AND_PASTES", icon: "flame" },
            { code: "P02.C20", slug: "STAPLES_AND_GRAINS", icon: "wheat" },
            { code: "P02.C21", slug: "SUGARS_SALTS_AND_SWEETENERS", icon: "candy" },
            { code: "P02.C22", slug: "SWEETS_MITHAI_AND_CONFECTIONERY", icon: "candy" },
            { code: "P02.C23", slug: "THICKENERS_ADDITIVES_AND_CULINARY_AIDS", icon: "beaker" },
            { code: "P02.C24", slug: "WORLD_FOODS_AND_GOURMET", icon: "globe" }
        ]
    },
    {
        code: "P03", slug: "DAIRY_BAKERY_AND_EGGS", label: "Dairy, Bakery & Eggs", icon: "milk", items: [
            { code: "P03.C01", slug: "BUTTER_GHEE_AND_CREAM", icon: "droplet" },
            { code: "P03.C02", slug: "CAKES_PASTRIES_DONUTS_AND_MUFFINS", icon: "cake" },
            { code: "P03.C03", slug: "CHEESE", icon: "slice" },
            { code: "P03.C04", slug: "CHILLED_AND_AMBIENT_DAIRY_DESSERTS", icon: "ice-cream" },
            { code: "P03.C05", slug: "CONDENSED_EVAPORATED_AND_MILK_POWDERS", icon: "package" },
            { code: "P03.C06", slug: "COOKIES_KHARI_RUSKS_AND_TEA_SNACKS", icon: "cookie" },
            { code: "P03.C07", slug: "CURD_YOGURT_AND_CULTURED_PRODUCTS", icon: "cup-soda" },
            { code: "P03.C08", slug: "DAIRY_ALTERNATIVES", icon: "leaf" },
            { code: "P03.C09", slug: "EGGS_AND_EGG_PRODUCTS", icon: "egg" },
            { code: "P03.C10", slug: "FRESH_BAKERY_BREADS_BUNS_AND_FLATBREADS", icon: "croissant" },
            { code: "P03.C11", slug: "FROZEN_AND_PAR_BAKED_BAKERY", icon: "snowflake" },
            { code: "P03.C12", slug: "ICE_CREAMS_AND_FROZEN_DESSERTS", icon: "ice-cream" },
            { code: "P03.C13", slug: "MILK_AND_MILK_BEVERAGES", icon: "milk" },
            { code: "P03.C14", slug: "PANEER_CHHENA_KHOYA_AND_TRADITIONAL_DAIRY", icon: "square" },
            { code: "P03.C15", slug: "SAVOURY_BAKERY_SANDWICHES_AND_READY_BAKES", icon: "sandwich" }
        ]
    },
    {
        code: "P04", slug: "MEAT_SEAFOOD_AND_FROZEN", label: "Meat, Seafood & Frozen", icon: "beef", items: [
            { code: "P04.C02", slug: "BONES_BROTHS_FATS_AND_COOKING_AIDS", icon: "soup" },
            { code: "P04.C03", slug: "CANNED_AND_SHELF_STABLE_MEATS_SEAFOOD", icon: "package" },
            { code: "P04.C04", slug: "CURED_SMOKED_AND_COLD_CUTS", icon: "beef" },
            { code: "P04.C05", slug: "DRIED_SALTED_AND_FERMENTED_SEAFOOD", icon: "fish" },
            { code: "P04.C06", slug: "FRESH_BUFFALO_AND_BEEF", icon: "beef" },
            { code: "P04.C07", slug: "FRESH_MUTTON_LAMB_GOAT", icon: "beef" },
            { code: "P04.C08", slug: "FRESH_PORK", icon: "beef" },
            { code: "P04.C09", slug: "FRESH_POULTRY", icon: "bird" },
            { code: "P04.C10", slug: "FROZEN_APPETIZERS_AND_SNACKS", icon: "snowflake" },
            { code: "P04.C11", slug: "FROZEN_MEAT_AND_POULTRY", icon: "snowflake" },
            { code: "P04.C12", slug: "FROZEN_READY_MEALS", icon: "utensils" },
            { code: "P04.C13", slug: "FROZEN_SEAFOOD", icon: "fish" },
            { code: "P04.C14", slug: "GAME_AND_SPECIALTY_MEATS", icon: "target" },
            { code: "P04.C15", slug: "MARINATED_AND_READY_TO_COOK", icon: "chef-hat" },
            { code: "P04.C16", slug: "PLANT_BASED_AND_MOCK_MEATS", icon: "leaf" },
            { code: "P04.C17", slug: "SEAFOOD_FISH", icon: "fish" },
            { code: "P04.C18", slug: "SEAFOOD_SHELLFISH_AND_CEPHALOPODS", icon: "shell" }
        ]
    },
    {
        code: "P05", slug: "BEVERAGES", label: "Beverages (Non-Alcoholic)", icon: "coffee", items: [
            { code: "P05.C01", slug: "BUBBLE_TEA_SMOOTHIES_AND_CAFE_RTD", icon: "cup-soda" },
            { code: "P05.C02", slug: "CARBONATED_SOFT_DRINKS_AND_SODAS", icon: "glass-water" },
            { code: "P05.C03", slug: "COCONUT_WATER_AND_PLANT_WATERS", icon: "droplets" },
            { code: "P05.C04", slug: "COFFEE_DECOCTIONS_AND_RTD_COFFEES", icon: "coffee" },
            { code: "P05.C05", slug: "DAIRY_BEVERAGES_AND_ALTERNATIVES", icon: "milk" },
            { code: "P05.C06", slug: "ENERGY_SPORTS_AND_ELECTROLYTE_DRINKS", icon: "zap" },
            { code: "P05.C07", slug: "FUNCTIONAL_AND_WELLNESS_BEVERAGES", icon: "heart-pulse" },
            { code: "P05.C08", slug: "JUICES_NECTARS_AND_FRUIT_DRINKS", icon: "citrus" },
            { code: "P05.C09", slug: "MALT_COCOA_AND_NUTRITIONAL_DRINKS", icon: "cup-soda" },
            { code: "P05.C10", slug: "MOCKTAIL_MIXERS_SODAS_AND_BAR_ESSENTIALS", icon: "martini" },
            { code: "P05.C11", slug: "NON_ALCOHOLIC_MALT_AND_0_0_BEVERAGES", icon: "beer" },
            { code: "P05.C12", slug: "PACKAGED_WATER_AND_ICE", icon: "droplets" },
            { code: "P05.C13", slug: "PACKAGING_AND_ON_THE_GO_FORMATS", icon: "package" },
            { code: "P05.C14", slug: "POWDERED_DRINK_MIXES", icon: "flask-conical" },
            { code: "P05.C15", slug: "SYRUPS_SQUASHES_CORDIALS_AND_CRUSHES", icon: "flask-conical" },
            { code: "P05.C16", slug: "TEA_INFUSIONS_AND_RTD_ICED_TEA", icon: "coffee" },
            { code: "P05.C17", slug: "TRADITIONAL_INDIAN_BEVERAGES", icon: "cup-soda" },
            { code: "P05.C18", slug: "WATER_ENHANCERS_AND_ADD_INS", icon: "droplet" }
        ]
    },
    {
        code: "P06", slug: "ALCOHOLIC_BEVERAGES", label: "Alcoholic Beverages (State-Regulated)", icon: "wine", flags: ["STATE_REGULATED"], items: [
            { code: "P06.C01", slug: "AGAVE_SPIRITS", icon: "glass-water" },
            { code: "P06.C02", slug: "BEER_AND_FERMENTED_MALT", icon: "beer" },
            { code: "P06.C03", slug: "BRANDY_COGNAC_AND_GRAPE_SPIRITS", icon: "wine" },
            { code: "P06.C04", slug: "CIDER_PERRY_MEAD_AND_HARD_SELTZER", icon: "apple" },
            { code: "P06.C06", slug: "FORTIFIED_AND_AROMATISED_WINES", icon: "wine" },
            { code: "P06.C07", slug: "GIN", icon: "martini" },
            { code: "P06.C08", slug: "INDIAN_TRADITIONAL_AND_COUNTRY_LIQUORS", icon: "flask-conical" },
            { code: "P06.C09", slug: "LIQUEURS_APERITIFS_AND_BITTERS", icon: "wine" },
            { code: "P06.C10", slug: "OTHER_INTERNATIONAL_SPIRITS", icon: "globe" },
            { code: "P06.C11", slug: "PACKAGING_FORMATS_AND_GIFT_PACKS", icon: "gift" },
            { code: "P06.C12", slug: "READY_TO_DRINK_AND_COCKTAILS", icon: "martini" },
            { code: "P06.C13", slug: "RUM", icon: "glass-water" },
            { code: "P06.C14", slug: "VODKA", icon: "glass-water" },
            { code: "P06.C15", slug: "WHISKY_WHISKEY", icon: "glass-water" },
            { code: "P06.C16", slug: "WINE", icon: "wine" }
        ]
    },
    {
        code: "P07", slug: "TOBACCO_AND_SMOKING", label: "Tobacco & Smoking (State-Regulated, 18+)", icon: "flame", flags: ["STATE_REGULATED", "AGE_18_PLUS"], items: [
            { code: "P07.C01", slug: "BIDIS_BEEDIS", icon: "cigarette" },
            { code: "P07.C02", slug: "CAR_AND_ON_THE_GO_SMOKING", icon: "car" },
            { code: "P07.C03", slug: "CIGAR_TOOLS_HUMIDORS_AND_STORAGE", icon: "box" },
            { code: "P07.C04", slug: "CIGARETTES", icon: "cigarette" },
            { code: "P07.C05", slug: "CIGARS_AND_CIGARILLOS", icon: "cigarette" },
            { code: "P07.C07", slug: "HERBAL_NON_TOBACCO_SHISHA", icon: "leaf" },
            { code: "P07.C08", slug: "HOOKAH_ACCESSORIES_AND_CHARCOAL", icon: "flame" },
            { code: "P07.C09", slug: "HOOKAH_SHISHA", icon: "wind" },
            { code: "P07.C10", slug: "LIGHTERS_MATCHES_AND_FUELS", icon: "flame" },
            { code: "P07.C11", slug: "PIPE_TOBACCO_AND_PIPES", icon: "wind" },
            { code: "P07.C12", slug: "PIPE_TOOLS_AND_CARE", icon: "wrench" },
            { code: "P07.C13", slug: "ROLL_YOUR_OWN_AND_MAKE_YOUR_OWN", icon: "scissors" },
            { code: "P07.C14", slug: "SMOKELESS_TOBACCO", icon: "package" },
            { code: "P07.C15", slug: "SNUFF", icon: "package" }
        ]
    },
    {
        code: "P08", slug: "PERSONAL_CARE_BEAUTY_AND_GROOMING", label: "Personal Care, Beauty & Grooming", icon: "sparkles", items: [
            { code: "P08.C02", slug: "AYURVEDA_HERBAL_AND_NATURAL_BEAUTY", icon: "leaf" },
            { code: "P08.C03", slug: "BATH_AND_BODY", icon: "bath" },
            { code: "P08.C04", slug: "BEAUTY_TOOLS_AND_APPLIANCES", icon: "scissors" },
            { code: "P08.C05", slug: "BODY_ART_MEHENDI_AND_ACCESSORIES", icon: "palette" },
            { code: "P08.C06", slug: "FEMININE_CARE", icon: "heart" },
            { code: "P08.C07", slug: "FOOT_CARE_AND_PERSONAL_HYGIENE_ADD_ONS", icon: "footprints" },
            { code: "P08.C08", slug: "FRAGRANCES", icon: "sparkles" },
            { code: "P08.C09", slug: "HAIR_ACCESSORIES_AND_STYLING_AIDS", icon: "scissors" },
            { code: "P08.C10", slug: "HAIR_CARE_AND_STYLING", icon: "scissors" },
            { code: "P08.C11", slug: "HAIR_COLOUR_AND_HENNA", icon: "palette" },
            { code: "P08.C12", slug: "MAKE_UP", icon: "sparkles" },
            { code: "P08.C13", slug: "MEN_S_SHAVING_AND_BEARD_CARE", icon: "scissors" },
            { code: "P08.C14", slug: "NAILS_AND_HAND_CARE", icon: "hand" },
            { code: "P08.C15", slug: "ORAL_CARE", icon: "smile" },
            { code: "P08.C16", slug: "SALON_AND_PROFESSIONAL_SUPPLIES", icon: "scissors" },
            { code: "P08.C17", slug: "SKIN_CARE", icon: "droplet" },
            { code: "P08.C18", slug: "SPA_MASSAGE_AND_BODY_WELLNESS", icon: "heart" },
            { code: "P08.C19", slug: "TISSUES_WIPES_AND_COTTON", icon: "square" },
            { code: "P08.C20", slug: "TRAVEL_KITS_AND_GIFTS", icon: "gift" },
            { code: "P08.C21", slug: "WOMEN_S_HAIR_REMOVAL_AND_INTIMATE_CARE", icon: "sparkles" }
        ]
    },
    {
        code: "P09", slug: "HEALTH_OTC_AND_PHARMACY", label: "Health, OTC & Pharmacy (India)", icon: "pill", items: [
            { code: "P09.C01", slug: "AYUSH_AND_TRADITIONAL_MEDICINE", icon: "leaf" },
            { code: "P09.C02", slug: "CARDIO_BP_AND_RESPIRATORY_CARE", icon: "heart-pulse" },
            { code: "P09.C03", slug: "COLD_COUGH_FLU_AND_ALLERGY", icon: "thermometer" },
            { code: "P09.C04", slug: "DIABETES_CARE", icon: "activity" },
            { code: "P09.C05", slug: "DIGESTIVE_HEALTH_AND_STOMACH_CARE", icon: "pill" },
            { code: "P09.C06", slug: "ELDERLY_AND_HOME_HEALTH_CARE", icon: "accessibility" },
            { code: "P09.C07", slug: "EYE_EAR_AND_NOSE_CARE", icon: "eye" },
            { code: "P09.C08", slug: "FIRST_AID_AND_WOUND_CARE", icon: "bandaid" },
            { code: "P09.C10", slug: "HOME_DIAGNOSTICS_AND_SELF_TESTS", icon: "test-tube" },
            { code: "P09.C11", slug: "MEDICAL_AND_SURGICAL_CONSUMABLES", icon: "syringe" },
            { code: "P09.C12", slug: "MOTHER_BABY_AND_CHILD_HEALTH", icon: "baby" },
            { code: "P09.C13", slug: "PAIN_FEVER_AND_INFLAMMATION", icon: "thermometer" },
            { code: "P09.C14", slug: "PHARMACY_PRESCRIPTION_MEDICINES", icon: "pill" },
            { code: "P09.C16", slug: "SEXUAL_WELLNESS", icon: "heart" },
            { code: "P09.C17", slug: "SKIN_FUNGAL_AND_DERMATOLOGY", icon: "droplet" },
            { code: "P09.C18", slug: "TRAVEL_HEALTH_AND_OUTDOOR", icon: "plane" },
            { code: "P09.C19", slug: "VITAMINS_MINERALS_AND_NUTRACEUTICALS", icon: "pill" }
        ]
    },
    {
        code: "P10", slug: "BABY_KIDS_AND_MATERNITY", label: "Baby, Kids & Maternity (India)", icon: "baby", items: [
            { code: "P10.C01", slug: "BATHING_SKIN_AND_GROOMING", icon: "bath" },
            { code: "P10.C02", slug: "CLOTHING_AND_ACCESSORIES", icon: "shirt" },
            { code: "P10.C04", slug: "DIAPERS_WIPES_AND_POTTY", icon: "baby" },
            { code: "P10.C05", slug: "FEEDING_NURSING_AND_WEANING", icon: "cup-soda" },
            { code: "P10.C06", slug: "FOOTWEAR", icon: "footprints" },
            { code: "P10.C07", slug: "HEALTH_AND_SAFETY", icon: "shield" },
            { code: "P10.C08", slug: "INFANT_AND_TODDLER_NUTRITION", icon: "apple" },
            { code: "P10.C09", slug: "KIDS_TECH_AND_WEARABLES", icon: "watch" },
            { code: "P10.C10", slug: "LAUNDRY_CLEANING_AND_HOME_CARE", icon: "spray-can" },
            { code: "P10.C11", slug: "LEARNING_BOOKS_AND_SCHOOL", icon: "book" },
            { code: "P10.C12", slug: "MATERNITY_AND_NURSING", icon: "heart" },
            { code: "P10.C13", slug: "NURSERY_AND_SLEEP", icon: "moon" },
            { code: "P10.C14", slug: "PARTY_GIFTS_AND_OCCASIONS", icon: "gift" },
            { code: "P10.C15", slug: "SPORTS_CYCLES_AND_OUTDOOR_PLAY", icon: "bike" },
            { code: "P10.C16", slug: "TOYS_GAMES_AND_HOBBIES", icon: "gamepad-2" },
            { code: "P10.C17", slug: "TRADITIONAL_AND_CEREMONIAL", icon: "sparkles" },
            { code: "P10.C18", slug: "TRAVEL_GEAR_AND_OUTDOOR", icon: "briefcase" }
        ]
    }
];

// Combine all categories
const allCategories = [
    ...categoriesPart1,
    ...categoriesPart2,
    ...categoriesPart3,
    ...categoriesPart4,
    ...categoriesPart5
];

// Convert slug to readable label
function slugToLabel(slug) {
    return slug
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .replace(/ And /g, ' & ')
        .replace(/ S /g, "'s ")
        .replace(/^S /, "S ")
        .replace(/ 0 0 /g, " 0.0% ");
}

// Build sections
const sections = allCategories.map(cat => ({
    section_code: cat.code,
    section_slug: cat.slug,
    section_label_en: cat.label,
    icon: cat.icon,
    ...(cat.flags && { flags: cat.flags }),
    items: cat.items.map(item => ({
        code: item.code,
        slug: item.slug,
        label_en: slugToLabel(item.slug),
        icon: item.icon
    }))
}));

const output = { sections };

// Write to file
const outputPath = path.join(__dirname, '../public/sections_items_full.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log('✅ Generated sections_items_full.json');
console.log(`   - ${sections.length} categories`);
console.log(`   - ${sections.reduce((sum, s) => sum + s.items.length, 0)} subcategories`);
