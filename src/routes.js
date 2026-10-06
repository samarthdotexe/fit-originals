import { categoryLabel, getProduct, listProducts, normalizeCategory } from "./commerce/catalog.js";

export function resolveCollectionPage(category) {
  const normalized = normalizeCategory(category);
  return {
    category: normalized,
    title: categoryLabel(normalized),
    products: listProducts({ category: normalized }),
  };
}

export function resolveProductPage(slug) {
  const product = getProduct(slug);
  return product ? { status: "found", product } : { status: "missing", product: null };
}

