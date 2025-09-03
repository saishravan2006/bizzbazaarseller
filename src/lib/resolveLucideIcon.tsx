import * as Icons from "lucide-react";

const ALIAS: Record<string, string> = {
  building: "Building2",
  pc: "Laptop",
  bike: "Bicycle",
  "washing-machine": "WashingMachine",
  beef: "Drumstick",
  carrot: "Apple",
  settings: "Settings",
  flower: "Flower2",
  candy: "Candy"
};

const toPascal = (s: string) =>
  s.replace(/[-_ ]+/g, " ")
    .split(" ")
    .map(w => w ? w[0].toUpperCase() + w.slice(1) : "")
    .join("");

export function resolveLucideIcon(name?: string) {
  if (!name) return Icons.Store as any;
  
  const keys = [
    name,
    ALIAS[name],
    toPascal(name),
    toPascal(name.toLowerCase())
  ].filter(Boolean) as string[];
  
  for (const k of keys) {
    if ((Icons as any)[k]) return (Icons as any)[k];
  }
  
  return Icons.Store as any;
}