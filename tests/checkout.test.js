import test from "node:test";
import assert from "node:assert/strict";
import { getCheckoutState } from "../src/commerce/checkout.js";
import { addCartLine, createCartState } from "../src/commerce/cart.js";
import { getProduct } from "../src/commerce/catalog.js";

test("empty carts are blocked before checkout", () => {
  assert.deepEqual(getCheckoutState(createCartState(), "demo"), {
    canContinue: false,
    mode: "empty",
    paymentUrl: null,
  });
});

test("demo checkout can show delivery details but never returns a payment URL", () => {
  const cart = addCartLine(createCartState(), getProduct("messi-farewell"), "M", 1);
  assert.deepEqual(getCheckoutState(cart, "demo"), {
    canContinue: true,
    mode: "demo",
    paymentUrl: null,
  });
});

