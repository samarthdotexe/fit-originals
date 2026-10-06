import test from "node:test";
import assert from "node:assert/strict";
import {
  formatINR,
  getProduct,
  listProducts,
  normalizeCategory,
} from "../src/commerce/catalog.js";

test("unknown collection routes fall back to all products", () => {
  assert.equal(normalizeCategory("mystery-drop"), "all");
  assert.equal(listProducts({ category: "mystery-drop" }).length >= 10, true);
});

test("catalog search is case-insensitive and category aware", () => {
  const results = listProducts({ category: "fan", query: "madrid" });
  assert.equal(results.length, 2);
  assert.equal(results.every((product) => product.category === "fan"), true);
});

test("catalog sorting orders by integer price", () => {
  const results = listProducts({ sort: "price-asc" });
  assert.equal(results[0].price, 41900);
  assert.equal(results.at(-1).price, 159900);
});

test("product lookup and INR formatting expose visitor-ready values", () => {
  assert.equal(getProduct("real-madrid-away-26-27").title, "Real Madrid Away 26/27");
  assert.equal(formatINR(79900), "₹799");
});

