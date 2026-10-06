import test from "node:test";
import assert from "node:assert/strict";
import { scrollPageToTop } from "../src/browser.js";

test("scroll helper never leaks a browser return value into React effect cleanup", () => {
  const asyncBrowserScroll = () => Promise.resolve();
  assert.equal(scrollPageToTop(asyncBrowserScroll), undefined);
});

