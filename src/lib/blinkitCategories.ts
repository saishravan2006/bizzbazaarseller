export type BlinkitCategory = {
    id: string;
    label: string;
    image: string;
    path: string;
};

export const blinkitCategories: BlinkitCategory[] = [
    // Row 1 - Top Food Categories
    { id: 'veg', label: 'Vegetables & Fruits', image: '/category-images-optimized/vegetables-fruits.webp', path: '/category/fresh-produce' },
    { id: 'atta', label: 'Atta, Rice & Dal', image: '/category-images-optimized/atta-rice-dal.webp', path: '/category/staples' },
    { id: 'oil', label: 'Oil, Ghee & Masala', image: '/category-images-optimized/oil-ghee.webp', path: '/category/oils-ghee' },
    { id: 'dairy', label: 'Dairy, Bread & Eggs', image: '/category-images-optimized/bread-eggs.webp', path: '/category/dairy' },
    { id: 'bakery', label: 'Bakery & Biscuits', image: '/category-images-optimized/bakery-biscuits.webp', path: '/category/bakery' },
    { id: 'munchies', label: 'Chips & Namkeen', image: '/category-images-optimized/munchies.webp', path: '/category/chips-namkeen' },
    { id: 'tea', label: 'Tea, Coffee & Health Drinks', image: '/category-images-optimized/tea-coffee.webp', path: '/category/tea-coffee' },
    { id: 'cold-drinks', label: 'Cold Drinks & Juices', image: '/category-images-optimized/cold-drinks.webp', path: '/category/beverages' },
    { id: 'instant', label: 'Instant & Frozen Food', image: '/category-images-optimized/instant-frozen-food.webp', path: '/category/instant-food' },
    { id: 'sweet', label: 'Sweet Tooth', image: '/category-images-optimized/indian-sweets.webp', path: '/category/sweets' },
    { id: 'choc', label: 'Chocolates & Candies', image: '/category-images-optimized/Sweet Tooth.webp', path: '/category/chocolates' },
    { id: 'sauces', label: 'Sauces & Spreads', image: '/category-images-optimized/sauces-spreads.webp', path: '/category/sauces' },

    // Personal Care
    { id: 'bath', label: 'Bath & Body', image: '/category-images-optimized/bath-body.webp', path: '/category/bath-body' },
    { id: 'hair', label: 'Hair Care', image: '/category-images-optimized/hair-care.webp', path: '/category/hair-care' },
    { id: 'skin', label: 'Skin & Face', image: '/category-images-optimized/skin-care.webp', path: '/category/skin-care' },
    { id: 'oral', label: 'Oral Care', image: '/category-images-optimized/oral-care.webp', path: '/category/oral-care' },
    { id: 'fem', label: 'Feminine Hygiene', image: '/category-images-optimized/feminine-hygiene.webp', path: '/category/feminine-care' },
    { id: 'shave', label: 'Shaving & Grooming', image: '/category-images-optimized/shaving-grooming.webp', path: '/category/grooming' },
    { id: 'deo', label: 'Deos & Perfumes', image: '/category-images-optimized/fragrances-deos.webp', path: '/category/fragrances' },
    { id: 'makeup', label: 'Makeup & Cosmetics', image: '/category-images-optimized/makeup-cosmetics.webp', path: '/category/makeup' },

    // Home & Cleaning
    { id: 'laundry', label: 'Laundry Detergents', image: '/category-images-optimized/laundry-detergents.webp', path: '/category/laundry' },
    { id: 'dish', label: 'Dishwashing Needs', image: '/category-images-optimized/dishwashing.webp', path: '/category/dishwashing' },
    { id: 'clean', label: 'Floor & Toilet Cleaners', image: '/category-images-optimized/cleaners-disinfectants.webp', path: '/category/cleaners' },
    { id: 'repel', label: 'Repellents & Fresheners', image: '/category-images-optimized/repellents-fresheners.webp', path: '/category/repellents' },
    { id: 'pooja', label: 'Pooja Needs', image: '/category-images-optimized/pooja-needs.webp', path: '/category/pooja-needs' },
    { id: 'shoe', label: 'Shoe Care', image: '/category-images-optimized/shoe-care.webp', path: '/category/shoe-care' },

    // Baby Care
    { id: 'diaper', label: 'Diapers & Wipes', image: '/category-images-optimized/diapers-wipes.webp', path: '/category/diapers' },
    { id: 'baby-food', label: 'Baby Food', image: '/category-images-optimized/baby-food.webp', path: '/category/baby-food' },
    { id: 'baby-skin', label: 'Baby Bath & Skin', image: '/category-images-optimized/baby-bath-skin.webp', path: '/category/baby-skin' },

    // Pharma & Wellness
    { id: 'pharm', label: 'Pharmacy & First Aid', image: '/category-images-optimized/first-aid.webp', path: '/category/pharmacy' },
    { id: 'supp', label: 'Health Supplements', image: '/category-images-optimized/health-supplements.webp', path: '/category/supplements' },
    { id: 'sex', label: 'Sexual Wellness', image: '/category-images-optimized/sexual-wellness.webp', path: '/category/sexual-wellness' },

    // Protein & Meat
    { id: 'meat', label: 'Chicken, Meat & Fish', image: '/category-images-optimized/chicken-meat.webp', path: '/category/meat' },
    { id: 'eggs', label: 'Eggs', image: '/category-images-optimized/bread-eggs.webp', path: '/category/eggs' },

    // Snacks & Branded
    { id: 'biscuit', label: 'Biscuits & Cookies', image: '/category-images-optimized/biscuits-cookies.webp', path: '/category/biscuits' },
    { id: 'noodle', label: 'Noodles & Pasta', image: '/category-images-optimized/noodles-pasta.webp', path: '/category/noodles' },
    { id: 'cereal', label: 'Breakfast Cereals', image: '/category-images-optimized/breakfast-cereals.webp', path: '/category/breakfast' },
    { id: 'frozen', label: 'Frozen Snacks', image: '/category-images-optimized/frozen-snacks.webp', path: '/category/frozen-snacks' },
    { id: 'icecream', label: 'Ice Creams', image: '/category-images-optimized/ice-creams.webp', path: '/category/ice-creams' },

    // Other Essentials
    { id: 'dry', label: 'Dry Fruits', image: '/category-images-optimized/dry-fruits.webp', path: '/category/dry-fruits' },
    { id: 'organic', label: 'Organic & Healthy', image: '/category-images-optimized/organic-healthy.webp', path: '/category/organic' },
    { id: 'batteries', label: 'Batteries & Power', image: '/category-images-optimized/batteries.webp', path: '/category/batteries' },
    { id: 'bulb', label: 'Bulbs & Electricals', image: '/category-images-optimized/bulbs-electricals.webp', path: '/category/electricals' },
    { id: 'stationery', label: 'Stationery Needs', image: '/category-images-optimized/stationery.webp', path: '/category/stationery' },
    { id: 'pet', label: 'Pet Care', image: '/category-images-optimized/dog-food.webp', path: '/category/pet-care' },

    // Additional Categories
    { id: 'spices', label: 'Spices & Masalas', image: '/category-images-optimized/spices-masala.webp', path: '/category/spices' },
    { id: 'paneer', label: 'Paneer & Curd', image: '/category-images-optimized/paneer-curd.webp', path: '/category/dairy-products' },
    { id: 'water', label: 'Water & Soda', image: '/category-images-optimized/water-soda.webp', path: '/category/water' },
    { id: 'pickle', label: 'Pickles & Chutneys', image: '/category-images-optimized/pickles-chutneys.webp', path: '/category/pickles' },
    { id: 'syrup', label: 'Syrups & Concentrates', image: '/category-images-optimized/syrups-concentrates.webp', path: '/category/syrups' },
    { id: 'energy', label: 'Energy Drinks', image: '/category-images-optimized/energy-drinks.webp', path: '/category/energy-drinks' }
];
