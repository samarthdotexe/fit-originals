import test from "node:test";
import assert from "node:assert/strict";
import {
  addCartLine,
  cartTotals,
  createCartState,
  parseStoredCart,
  removeCartLine,
  updateCartLine,
} from "../src/commerce/cart.js";
import { getProduct } from "../src/commerce/catalog.js";

test("same product and size merge while different sizes stay separate", () => {
  const product = getProduct("real-madrid-away-26-27");
  let state = addCartLine(createCartState(), product, "M", 1);
  state = addCartLine(state, product, "M", 2);
  state = addCartLine(state, product, "L", 1);

  assert.equal(state.lines.length, 2);
  assert.equal(state.lines.find((line) => line.size === "M").quantity, 3);
  assert.equal(state.lines.find((line) => line.size === "L").quantity, 1);
});

test("missing sizes and sold-out products are rejected", () => {
  const product = getProduct("real-madrid-away-26-27");
  assert.throws(() => addCartLine(createCartState(), product, ""), /Select a size/);
  assert.throws(
    () => addCartLine(createCartState(), { ...product, available: false }, "M"),
    /sold out/i,
  );
});

test("quantity updates clamp to one and explicit removal deletes the line", () => {
  const product = getProduct("real-madrid-away-26-27");
  const added = addCartLine(createCartState(), product, "M", 2);
  const key = added.lines[0].key;
  const clamped = updateCartLine(added, key, 0);
  assert.equal(clamped.lines[0].quantity, 1);
  assert.equal(removeCartLine(clamped, key).lines.length, 0);
});

test("cart totals use paise and item quantities", () => {
  const product = getProduct("real-madrid-away-26-27");
  const state = addCartLine(createCartState(), product, "M", 2);
  assert.deepEqual(cartTotals(state), { itemCount: 2, subtotal: 159800 });
});

test("malformed persisted carts recover to an empty cart", () => {
  assert.deepEqual(parseStoredCart("not json"), createCartState());
  assert.deepEqual(parseStoredCart('{"lines":"wrong"}'), createCartState());
});

