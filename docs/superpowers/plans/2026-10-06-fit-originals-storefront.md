# Fit Originals Storefront Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and privately publish a responsive, animated Fit Originals demo storefront whose commerce boundary can later switch to Shopify.

**Architecture:** A Vite-powered React single-page storefront consumes a provider-shaped local catalog. Framework-independent catalog and cart modules own deterministic commerce behavior; React contexts and route views compose the experience and persist cart state locally.

**Tech Stack:** React 18, React Router, Vite, Node test runner, CSS, OpenAI Sites static hosting

**Spec:** `docs/superpowers/specs/2026-10-06-fit-originals-storefront-design.md`

## Global Constraints

- Use the approved oxblood, near-black, warm off-white, and restrained violet visual system.
- Do not collect payment-card data or imply that demo checkout places a real order.
- Support 320px mobile widths through large desktop layouts with no horizontal overflow.
- Respect `prefers-reduced-motion` and provide visible keyboard focus states.
- Keep product and cart domain logic independent of React.

## Review Focus

- Malformed persisted cart data must recover to an empty cart without crashing.
- A sold-out item or a product without a selected size must never enter the cart.
- Repeated product/size additions must merge while different sizes remain separate lines.
- Unknown collection routes must fall back to all products and remain navigable.
- Checkout in demo mode must never render card fields or claim payment success.

---

### Task 1: Commerce Domain and Project Foundation

**Files:**
- Create: `package.json`, `index.html`, `src/data/products.js`
- Create: `src/commerce/catalog.js`, `src/commerce/cart.js`, `src/commerce/provider.js`
- Test: `tests/catalog.test.js`, `tests/cart.test.js`, `tests/provider.test.js`

**Interfaces:**
- Produces: `listProducts(filters)`, `getProduct(slug)`, `createCartState()`, `addCartLine(state, product, size, quantity)`, `updateCartLine(state, key, quantity)`, `cartTotals(state)`, `parseStoredCart(raw)`, and `commerceProvider`.
- Consumes: none.

- [ ] Write catalog tests for category fallback, search, sorting, and INR formatting; run them and confirm missing-module failures.
- [ ] Implement product fixtures and catalog functions; rerun catalog tests to green.
- [ ] Write cart tests for line identity, quantity rules, sold-out protection, totals, and malformed persistence; run them and confirm missing-function failures.
- [ ] Implement cart functions; rerun cart tests and the full suite to green.
- [ ] Write provider contract tests, implement the local provider plus Shopify configuration seam, and run the full suite.
- [ ] Commit the project foundation.

### Task 2: Application Shell and Responsive Catalog

**Files:**
- Create: `src/main.jsx`, `src/App.jsx`, `src/styles.css`
- Create: `src/context/CartContext.jsx`
- Create: `src/components/SiteHeader.jsx`, `src/components/SiteFooter.jsx`, `src/components/ProductCard.jsx`, `src/components/CartDrawer.jsx`
- Create: `src/pages/HomePage.jsx`, `src/pages/CollectionPage.jsx`, `src/pages/ProductPage.jsx`
- Test: `tests/routes.test.js`

**Interfaces:**
- Consumes: commerce functions and `commerceProvider` from Task 1.
- Produces: routable home, collections, and products plus the global cart context.

- [ ] Write route-model tests for category labels, unknown collection fallback, and product lookup; run them red.
- [ ] Implement the application shell, animated hero, editorial home sections, responsive catalog, product details, and cart drawer.
- [ ] Run route tests and the full suite to green, then build the application.
- [ ] Commit the visitor experience.

### Task 3: Checkout Demo and Shopify-Ready Merchant Path

**Files:**
- Create: `src/pages/CheckoutPage.jsx`, `src/pages/ConnectShopifyPage.jsx`
- Create: `src/commerce/checkout.js`
- Test: `tests/checkout.test.js`
- Modify: `src/App.jsx`, `src/styles.css`

**Interfaces:**
- Consumes: cart totals and provider mode from Tasks 1-2.
- Produces: `getCheckoutState(cart, providerMode)` and safe demo checkout/merchant connection routes.

- [ ] Write checkout-state tests proving empty carts are blocked and demo mode never returns a payment URL; run them red.
- [ ] Implement checkout state plus polished checkout and Shopify connection pages.
- [ ] Run the checkout tests and full suite to green, then run a production build.
- [ ] Commit checkout and integration readiness.

### Task 4: Hosting, Browser QA, and Publication

**Files:**
- Create: `.openai/hosting.json`
- Modify only as QA findings require: application source and tests.

**Interfaces:**
- Consumes: the complete built site.
- Produces: a packaged static archive and private Sites deployment.

- [ ] Register the Site once and persist its project ID.
- [ ] Run the full tests and production build.
- [ ] Perform desktop and mobile browser QA for navigation, product selection, cart, checkout safety, motion, and overflow; repair findings test-first.
- [ ] Package the exact pushed commit and deploy it privately.
- [ ] Verify terminal deployment status and record the production URL.

