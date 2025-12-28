/**
 * Mapping between blinkitCategories (display) and sections_items_full.json (data)
 * This bridges the visual category grid with the actual subcategory data
 */

import type { UiSection } from './loadSections';

// Map category IDs to section codes
export const categoryToSectionMap: Record<string, string> = {
    // Food & Groceries
    'veg': 'P01',           // Fresh Produce
    'atta': 'P02',          // Grocery, Staples & Packaged Foods
    'oil': 'P02',           // Oils in same section
    'dairy': 'P04',         // Dairy, Bakery & Frozen
    'bakery': 'P04',        // Also in Dairy, Bakery & Frozen
    'munchies': 'P02',      // Snacks in Grocery section
    'tea': 'P05',           // Beverages Drinks & Hydration
    'cold-drinks': 'P05',   // Beverages Drinks & Hydration
    'instant': 'P02',       // Instant Foods in Grocery
    'sweet': 'P02',         // Sweets in Grocery
    'choc': 'P02',          // Chocolates in Grocery
    'sauces': 'P02',        // Condiments in Grocery

    // Personal Care
    'bath': 'P08',          // Personal Care Hygiene & Grooming
    'hair': 'P08',
    'skin': 'P08',
    'oral': 'P08',
    'fem': 'P08',
    'shave': 'P08',
    'deo': 'P08',
    'makeup': 'P09',        // Makeup & Beauty

    // Home & Cleaning
    'laundry': 'P20',       // Household Cleaning & Paper Goods
    'dish': 'P20',
    'clean': 'P20',
    'repel': 'P20',
    'pooja': 'P33',         // Pooja, Gifting & Religious
    'shoe': 'P20',

    // Baby Care
    'diaper': 'P07',        // Baby Products
    'baby-food': 'P07',
    'baby-skin': 'P07',

    // Health & Wellness
    'pharm': 'P19',         // Health, Wellness & Pharmaceuticals
    'supp': 'P10',          // Health Supplements & Fitness
    'sex': 'P19',

    // Meat & Protein
    'meat': 'P03',          // Meat, Eggs & Seafood
    'eggs': 'P03',

    // Snacks & Branded
    'biscuit': 'P02',
    'noodle': 'P02',
    'cereal': 'P02',
    'frozen': 'P04',
    'icecream': 'P04',

    // Other Essentials
    'dry': 'P02',
    'organic': 'P02',
    'batteries': 'P16',     // Hardware Tools & Electrical
    'bulb': 'P16',
    'stationery': 'P24',    // Office School & Art
    'pet': 'P27',           // Pet Care & Supplies

    'spices': 'P02',
    'paneer': 'P04',
    'water': 'P05',
    'pickle': 'P02',
    'syrup': 'P05',
    'energy': 'P05',
};

/**
 * Find the matching section for a category ID
 */
export function findSectionForCategory(categoryId: string, sections: UiSection[]): UiSection | undefined {
    const sectionCode = categoryToSectionMap[categoryId];
    if (!sectionCode) return undefined;
    return sections.find(s => s.section_code === sectionCode);
}

/**
 * Get subcategory image path
 */
export function getSubcategoryImage(slug: string | undefined): string {
    if (!slug) return '/placeholder.svg';
    // Convert slug to image filename format
    const filename = slug.toLowerCase()
        .replace(/\r/g, '')
        .replace(/_/g, '-')
        .replace(/\s+/g, '-');
    return `/category-images/${filename}.png`;
}
