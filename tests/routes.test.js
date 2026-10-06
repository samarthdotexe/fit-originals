import test from "node:test";
import assert from "node:assert/strict";
import { resolveCollectionPage, resolveProductPage } from "../src/routes.js";

test("known collection routes expose visitor-facing labels and scoped products", () => {
  const page = resolveCollectionPage("retro");
  assert.equal(page.category, "retro");
  assert.equal(page.title, "Retro Jerseys");
  assert.equal(page.products.length, 3);
});

test("unknown collection routes remain navigable by falling back to all jerseys", () => {
  const page = resolveCollectionPage("unknown");
  assert.equal(page.category, "all");
  assert.equal(page.title, "All Jerseys");
  assert.equal(page.products.length, 14);
});

test("product routes distinguish found and missing products", () => {
  assert.equal(resolveProductPage("messi-farewell").status, "found");
  assert.deepEqual(resolveProductPage("not-a-jersey"), { status: "missing", product: null });
});

