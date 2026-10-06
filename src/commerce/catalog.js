import { categories, products } from "../data/products.js";

const categorySlugs = new Set(categories.map((category) => category.slug));

export function normalizeCategory(value = "all") {
  const normalized = String(value).trim().toLowerCase();
  return normalized === "all" || categorySlugs.has(normalized) ? normalized : "all";
}

export function categoryLabel(value) {
  const normalized = normalizeCategory(value);
  return normalized === "all"
    ? "All Jerseys"
    : categories.find((category) => category.slug === normalized).label;
}

export function listProducts({ category = "all", query = "", sort = "featured" } = {}) {
  const normalizedCategory = normalizeCategory(category);
  const normalizedQuery = String(query).trim().toLowerCase();
  const result = products.filter((product) => {
    const categoryMatches = normalizedCategory === "all" || product.category === normalizedCategory;
    const haystack = `${product.title} ${product.team} ${product.category}`.toLowerCase();
    return categoryMatches && (!normalizedQuery || haystack.includes(normalizedQuery));
  });

  if (sort === "price-asc") return result.toSorted((a, b) => a.price - b.price);
  if (sort === "price-desc") return result.toSorted((a, b) => b.price - a.price);
  if (sort === "title") return result.toSorted((a, b) => a.title.localeCompare(b.title));
  return result.toSorted((a, b) => Number(b.featured) - Number(a.featured));
}

export function getProduct(slug) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function formatINR(paise) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export { categories, products };

