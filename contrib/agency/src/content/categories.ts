/**
 * Portfolio categories.
 * - Order here = order of the filter buttons.
 * - A category is only shown when at least one portfolio item uses it,
 *   so you can keep future categories here without empty filters appearing.
 * - To add a category: add an entry, then use its `id` in portfolio.ts.
 */
export const categories = [
  { id: "furniture", label: { en: "Furniture & Interiors", ar: "أثاث وديكور" } },
  { id: "curtains", label: { en: "Curtains", ar: "ستائر" } },
  { id: "education", label: { en: "Education", ar: "تعليم" } },
  { id: "food", label: { en: "Food & Restaurants", ar: "مطاعم وأكل" } },
  { id: "real-estate", label: { en: "Real Estate", ar: "عقارات" } },
  { id: "events", label: { en: "Events", ar: "إيفنتات" } },
  { id: "ai", label: { en: "AI Videos", ar: "فيديوهات AI" } },
  { id: "designs", label: { en: "Designs", ar: "تصميمات" } },
  { id: "commercial", label: { en: "Commercial", ar: "إعلانات تجارية" } },
  { id: "other", label: { en: "Other Projects", ar: "مشاريع أخرى" } },
] as const;

export type CategoryId = (typeof categories)[number]["id"];
