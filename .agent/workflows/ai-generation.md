---
description: AI image generation workflow for category images - automatically continues when hitting rate limits
---

# AI Category Image Generation Workflow

This workflow generates AI images for all 52 product categories in the BizzBazaar seller platform.

## Steps

1. Read the categories from `categories_utf8.txt`
2. For each category, generate an image using the `generate_image` tool with a descriptive prompt
3. Save each image to `public/category-images/` with a slug-based filename
4. If rate limited, open a new chat and continue from where you left off
5. Track progress by checking which images already exist

## Image Generation Prompts

Each image should be:
- A clean, modern product photography style
- Featured products representing the category
- Professional lighting, white or gradient background
- No text overlays
- Square aspect ratio suitable for category cards

## Categories List (52 total)

1. Fresh Produce
2. Grocery, Staples & Packaged Foods
3. Dairy, Bakery & Eggs
4. Meat, Seafood & Frozen
5. Beverages (Non-Alcoholic)
6. Alcoholic Beverages (State-Regulated)
7. Tobacco & Smoking (State-Regulated, 18+)
8. Personal Care, Beauty & Grooming
9. Health, OTC & Pharmacy (India)
10. Baby, Kids & Maternity (India)
11. Pet & Veterinary (India)
12. Home Care & Cleaning (India)
13. Kitchenware, Cookware & Dining (India)
14. Home & Living (Furnishings & Decor) - India
15. Furniture & Mattresses (India)
16. Event, Wedding & Decor (India)
17. Stationery, Art & Office Supplies (India)
18. Books, Media & Hobbies (India)
19. Toys, Kids Hobbies & Party (India)
20. Sports, Fitness & Outdoors (India)
21. Musical Instruments & Pro Audio (India)
22. Mobiles, Computers & Accessories (India)
23. Consumer Electronics & Entertainment (India)
24. Cameras & Surveillance Drones (India)
25. Smart Home & IoT (India)
26. Large Appliances (India)
27. Electricals & Lighting (India)
28. Power Backup, Solar & Energy (India)
29. Tools, Hardware & Home Improvement (India)
30. Building & Construction Materials (India)
31. Paints, Chemicals & Surface Care (India)
32. Industrial, MRO & Safety (India)
33. Packaging, Printing & Signage (India)
34. Raw Materials & Commodities (B2B, India)
35. Automotive & Two-Wheelers (India)
36. EV & e-Mobility (Personal, India)
37. Luggage, Travel & Outdoor Gear (India)
38. Watches, Jewellery & Precious (India)
39. Fashion - Men (India)
40. Fashion - Women (India)
41. Fashion - Kids & Infants (India)
42. Footwear (India)
43. Apparel Materials, Tailoring & Accessories (India)
44. Religious, Puja & Festive (India)
45. Handloom, Handicrafts & Ethnic Specialties (India)
46. Medical & Hospital Equipment (India)
47. Education, Lab & Scientific (India)
48. Agriculture, Gardening & Irrigation (India)
49. Digital Goods & Gift Cards (India)
50. Winter & Seasonal Utilities (India)
51. Household Services Consumables (India)
52. Safety, Security & Surveillance (India)

// turbo-all
