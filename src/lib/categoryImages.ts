// Category code to image path mapping
// Maps each master category (P01-P52) to its corresponding image file

export const categoryImages: Record<string, string> = {
    'P01': '/category-icons/frutables2.jfif',                           // Fresh Produce
    'P02': '/category-icons/groceries.jfif',                            // Grocery, Staples & Packaged Foods
    'P03': '/category-icons/dairy products.jfif',                       // Dairy, Bakery & Eggs
    'P04': '/category-icons/protiens.jfif',                             // Meat, Seafood & Frozen
    'P05': '/category-icons/juice.jfif',                                // Beverages (Non-Alcoholic) - juice
    'P06': '/category-icons/drinks2.jfif',                              // Alcoholic Beverages - drinks
    'P07': '/category-icons/smoke.jfif',                                // Tobacco & Smoking (18+)
    'P08': '/category-icons/luxury accessories2.jfif',                  // Personal Care, Beauty & Grooming
    'P09': '/category-icons/medical instruments2.jfif',                 // Health, OTC & Pharmacy
    'P10': '/category-icons/baby1.jfif',                                // Baby, Kids & Maternity
    'P11': '/category-icons/pet2.jfif',                                 // Pet & Veterinary
    'P12': '/category-icons/cleaning2.jfif',                            // Home Care & Cleaning
    'P13': '/category-icons/saaman2.jfif',                              // Kitchenware, Cookware & Dining
    'P14': '/category-icons/home appliances2.jfif',                     // Home & Living (Furnishings & Décor)
    'P15': '/category-icons/furnitures2.jfif',                          // Furniture & Mattresses
    'P16': '/category-icons/Event, Wedding.jpeg',                       // Event, Wedding & Décor
    'P17': '/category-icons/stationaries.jfif',                         // Stationery, Art & Office Supplies
    'P18': '/category-icons/cds.jfif',                                  // Books, Media & Hobbies
    'P19': '/category-icons/toys.jfif',                                 // Toys, Kids Hobbies & Party
    'P20': '/category-icons/sports.jfif',                               // Sports, Fitness & Outdoors
    'P21': '/category-icons/Musical Instruments & Pro Audio.jpeg',      // Musical Instruments & Pro Audio
    'P22': '/category-icons/computers and mobile2.jfif',                // Mobiles, Computers & Accessories
    'P23': '/category-icons/Consumer Electronics & Entertaiment.jpeg',  // Consumer Electronics & Entertainment
    'P24': '/category-icons/cameras2.jfif',                             // Cameras & Surveillance Drones
    'P25': '/category-icons/wifi router2.jfif',                         // Smart Home & IoT
    'P26': '/category-icons/elecronics.jfif',                           // Large Appliances
    'P27': '/category-icons/electricals.jfif',                          // Electricals & Lighting
    'P28': '/category-icons/solar.jfif',                                // Power Backup, Solar & Energy
    'P29': '/category-icons/hardware tools.jfif',                       // Tools, Hardware & Home Improvement
    'P30': '/category-icons/construction materials2.jfif',              // Building & Construction Materials
    'P31': '/category-icons/Paints, Chemicals & Surface Care.jpeg',     // Paints, Chemicals & Surface Care
    'P32': '/category-icons/industrial safety equipment2.jfif',         // Industrial, MRO & Safety
    'P33': '/category-icons/packaging materials2.jfif',                 // Packaging, Printing & Signage
    'P34': '/category-icons/Raw Materials & Commodities (B2B).jpeg',    // Raw Materials & Commodities (B2B)
    'P35': '/category-icons/automotive accessories including cars.jfif', // Automotive & Two-Wheelers
    'P36': '/category-icons/electrical vehical2.jfif',                  // EV & e-Mobility
    'P37': '/category-icons/travel bags2.jfif',                         // Luggage, Travel & Outdoor Gear
    'P38': '/category-icons/Watches, Jewellery & Precious.jpeg',        // Watches, Jewellery & Precious
    'P39': '/category-icons/mens fashion2.jfif',                        // Fashion – Men
    'P40': '/category-icons/womens fashion.jfif',                       // Fashion – Women
    'P41': '/category-icons/kids clothing2.jfif',                       // Fashion – Kids & Infants
    'P42': '/category-icons/footwears.jfif',                            // Footwear
    'P43': '/category-icons/tailoring materials2.jfif',                 // Apparel Materials, Tailoring & Accessories
    'P44': '/category-icons/religious items2.jfif',                     // Religious, Puja & Festive
    'P45': '/category-icons/handcrafted items2.jfif',                   // Handloom, Handicrafts & Ethnic Specialties
    'P46': '/category-icons/safety equipment2.jfif',                    // Medical & Hospital Equipment
    'P47': '/category-icons/scientific equipments.jfif',                // Education, Lab & Scientific
    'P48': '/category-icons/gardening.jfif',                            // Agriculture, Gardening & Irrigation
    'P49': '/category-icons/Digital Goods & Gift Cards.jpeg',           // Digital Goods & Gift Cards
    'P50': '/category-icons/Sweater.jfif',                              // Winter & Seasonal Utilities
    'P51': '/category-icons/household service.jfif',                    // Household Services Consumables
    'P52': '/category-icons/cards2.jfif',                               // Safety, Security & Surveillance
};

// Get image for a category, with fallback
export const getCategoryImage = (code: string): string | null => {
    return categoryImages[code] || null;
};
