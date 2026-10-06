import test from "node:test";
import assert from "node:assert/strict";
import { commerceProvider, getShopifyConfig } from "../src/commerce/provider.js";

test("local commerce provider exposes demo products through the shared contract", async () => {
  assert.equal(commerceProvider.mode, "demo");
  const products = await commerceProvider.getProducts({ category: "retro" });
  assert.equal(products.length, 3);
  assert.equal(products.every((product) => product.category === "retro"), true);
  assert.equal((await commerceProvider.getProduct("messi-farewell")).team, "Barcelona");
});

test("Shopify activation requires both a domain and public storefront token", () => {
  assert.deepEqual(getShopifyConfig({}), { enabled: false, domain: "", token: "" });
  assert.deepEqual(
    getShopifyConfig({
      VITE_SHOPIFY_STORE_DOMAIN: "cwuaqi-8x.myshopify.com",
      VITE_SHOPIFY_STOREFRONT_TOKEN: "public-token",
    }),
    { enabled: true, domain: "cwuaqi-8x.myshopify.com", token: "public-token" },
  );
});

