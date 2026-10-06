import { getProduct, listProducts } from "./catalog.js";

export function getShopifyConfig(env = {}) {
  const domain = String(env.VITE_SHOPIFY_STORE_DOMAIN ?? "").trim();
  const token = String(env.VITE_SHOPIFY_STOREFRONT_TOKEN ?? "").trim();
  return { enabled: Boolean(domain && token), domain, token };
}

export const commerceProvider = {
  mode: "demo",
  async getProducts(filters = {}) {
    return listProducts(filters);
  },
  async getProduct(slug) {
    return getProduct(slug);
  },
};

