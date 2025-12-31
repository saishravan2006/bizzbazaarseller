import json

try:
    with open('public/sections_items_full.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for section in data.get('sections', []):
        code = section.get('section_code')
        slug = section.get('section_slug')
        print(f"{code}:{slug}")
except Exception as e:
    print(f"Error: {e}")
