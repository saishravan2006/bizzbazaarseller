export type BlinkitCategory = {
    id: string;
    label: string;
    image: string;
    path: string; // The navigation path or query param
};

export const blinkitCategories: BlinkitCategory[] = [
    // 1. Vegetables & Fruits
    { id: 'veg', label: 'Vegetables & Fruits', image: '/category-images/vegetables-fruits.png', path: '/category/fresh-produce' },
    { id: 'atta', label: 'Atta, Rice & Dal', image: '/category-images/atta-rice-dal.png', path: '/category/staples' },
    { id: 'oil', label: 'Oil, Ghee & Masala', image: '/category-images/oil-ghee.png', path: '/category/oils-ghee' },
    { id: 'dairy', label: 'Dairy, Bread & Eggs', image: '/category-images/bread-eggs.png', path: '/category/dairy' },
    { id: 'bakery', label: 'Bakery & Biscuits', image: '/category-images/bakery-biscuits.png', path: '/category/bakery' },
    { id: 'munchies', label: 'Chips & Namkeen', image: '/category-images/munchies.png', path: '/category/chips-namkeen' },
    { id: 'tea', label: 'Tea, Coffee & Health Drinks', image: '/category-images/tea-coffee.png', path: '/category/tea-coffee' },
    { id: 'cold-drinks', label: 'Cold Drinks & Juices', image: '/category-images/cold-drinks.png', path: '/category/beverages' },
    { id: 'instant', label: 'Instant & Frozen Food', image: '/category-images/instant-frozen-food.png', path: '/category/instant-food' },
    { id: 'sweet', label: 'Sweet Tooth', image: '/category-images/indian-sweets.png', path: '/category/sweets' },
    { id: 'choc', label: 'Chocolates & Candies', image: '/category-images/Sweet Tooth.png', path: '/category/chocolates' },
    { id: 'sauces', label: 'Sauces & Spreads', image: '/category-images/sauces-spreads.png', path: '/category/sauces' },

    // 2. Personal Care
    { id: 'bath', label: 'Bath & Body', image: '/category-images/bath-body.png', path: '/category/bath-body' },
    { id: 'hair', label: 'Hair Care', image: '/category-images/hair-care.png', path: '/category/hair-care' },
    { id: 'skin', label: 'Skin & Face', image: '/category-images/skin-care.png', path: '/category/skin-care' },
    { id: 'oral', label: 'Oral Care', image: '/category-images/oral-care.png', path: '/category/oral-care' },
    { id: 'fem', label: 'Feminine Hygiene', image: '/category-images/feminine-hygiene.png', path: '/category/feminine-care' },
    { id: 'shave', label: 'Shaving & Grooming', image: '/category-images/shaving-grooming.png', path: '/category/grooming' },
    { id: 'deo', label: 'Deos & Perfumes', image: '/category-images/fragrances-deos.png', path: '/category/fragrances' },
    { id: 'makeup', label: 'Makeup & Cosmetics', image: '/category-images/makeup-cosmetics.png', path: '/category/makeup' },

    // 3. Home & Cleaning
    { id: 'laundry', label: 'Laundry Detergents', image: '/category-images/laundry-detergents.png', path: '/category/laundry' },
    { id: 'dish', label: 'Dishwashing Needs', image: '/category-images/dishwashing.png', path: '/category/dishwashing' },
    { id: 'clean', label: 'Floor & Toilet Cleaners', image: '/category-images/cleaners-disinfectants.png', path: '/category/cleaners' },
    { id: 'repel', label: 'Repellents & Fresheners', image: '/category-images/repellents-fresheners.png', path: '/category/repellents' },
    { id: 'pooja', label: 'Pooja Needs', image: '/category-images/pooja-needs.png', path: '/category/pooja-needs' },
    { id: 'shoe', label: 'Shoe Care', image: '/category-images/shoe-care.png', path: '/category/shoe-care' },

    // 4. Baby Care
    { id: 'diaper', label: 'Diapers & Wipes', image: '/category-images/diapers-wipes.png', path: '/category/diapers' },
    { id: 'baby-food', label: 'Baby Food', image: '/category-images/baby-food.png', path: '/category/baby-food' },
    { id: 'baby-skin', label: 'Baby Bath & Skin', image: '/category-images/baby-bath-skin.png', path: '/category/baby-skin' },

    // 5. Pharma & Wellness
    { id: 'pharm', label: 'Pharmacy & First Aid', image: '/category-images/first-aid.png', path: '/category/pharmacy' },
    { id: 'supp', label: 'Health Supplements', image: '/category-images/health-supplements.png', path: '/category/supplements' },
    { id: 'sex', label: 'Sexual Wellness', image: '/category-images/sexual-wellness.png', path: '/category/sexual-wellness' },

    // 6. Protein & Meat
    { id: 'meat', label: 'Chicken, Meat & Fish', image: '/category-images/chicken-meat.png', path: '/category/meat' },
    { id: 'eggs', label: 'Eggs', image: '/category-images/bread-eggs.png', path: '/category/eggs' }, // Using bread-eggs for now if specific eggs missing

    // 7. Snacks & Branded
    { id: 'biscuit', label: 'Biscuits & Cookies', image: '/category-images/biscuits-cookies.png', path: '/category/biscuits' },
    { id: 'noodle', label: 'Noodles & Pasta', image: '/category-images/noodles-pasta.png', path: '/category/noodles' },
    { id: 'cereal', label: 'Breakfast Cereals', image: '/category-images/breakfast-cereals.png', path: '/category/breakfast' },
    { id: 'frozen', label: 'Frozen Snacks', image: '/category-images/frozen-snacks.png', path: '/category/frozen-snacks' },
    { id: 'icecream', label: 'Ice Creams', image: '/category-images/ice-creams.png', path: '/category/ice-creams' },

    // 8. Other Essentials
    { id: 'dry', label: 'Dry Fruits', image: '/category-images/dry-fruits.png', path: '/category/dry-fruits' },
    { id: 'organic', label: 'Organic & Healthy', image: '/category-images/organic-healthy.png', path: '/category/organic' },
    { id: 'batteries', label: 'Batteries & Power', image: '/category-images/batteries.png', path: '/category/batteries' },
    { id: 'bulb', label: 'Bulbs & Electricals', image: '/category-images/bulbs-electricals.png', path: '/category/electricals' },
    { id: 'stationery', label: 'Stationery Needs', image: '/category-images/stationery.png', path: '/category/stationery' },
    { id: 'pet', label: 'Pet Care', image: '/category-images/dog-food.png', path: '/category/pet-care' },

    // Additional slots to reach 52 if needed, using variations or verified files
    { id: 'spices', label: 'Spices & Masalas', image: '/category-images/spices-masala.png', path: '/category/spices' },
    { id: 'paneer', label: 'Paneer & Curd', image: '/category-images/paneer-curd.png', path: '/category/dairy-products' },
    { id: 'water', label: 'Water & Soda', image: '/category-images/water-soda.png', path: '/category/water' },
    { id: 'pickle', label: 'Pickles & Chutneys', image: '/category-images/pickles-chutneys.png', path: '/category/pickles' },
    { id: 'syrup', label: 'Syrups & Concentrates', image: '/category-images/syrups-concentrates.png', path: '/category/syrups' },
    { id: 'energy', label: 'Energy Drinks', image: '/category-images/energy-drinks.png', path: '/category/energy-drinks' }
];

