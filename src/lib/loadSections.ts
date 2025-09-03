export type UiItem = {
  code: string;
  label_en: string;
  icon?: string;
  synonyms?: string[];
  flags?: string[];
  is_wholesale?: boolean;
};

export type UiSection = {
  section_code: string;
  section_label_en: string;
  items: UiItem[];
};

export type SectionsDoc = {
  sections: UiSection[];
};

export async function loadSections(): Promise<SectionsDoc> {
  try {
    const r = await fetch("/sections_items_full.json", { cache: "no-store" });
    if (!r.ok) throw new Error("missing");
    return await r.json() as SectionsDoc;
  } catch (e) {
    return {
      sections: [
        {
          section_code: "STUB",
          section_label_en: "Stub",
          items: [
            {
              code: "STORE_STUB",
              label_en: "Stub Store"
            }
          ]
        }
      ]
    };
  }
}