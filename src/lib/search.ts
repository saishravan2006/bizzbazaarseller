export function matchesQuery(
  it: { label_en: string; code: string; synonyms?: string[] },
  q: string
) {
  if (!q) return true;
  
  const n = q.toLowerCase();
  return [
    it.label_en,
    it.code,
    ...(it.synonyms || [])
  ].join(" ").toLowerCase().includes(n);
}