# Fit Originals Storefront Design

## Intent

Build a premium, responsive football-jersey storefront for Fit Originals that feels like an editorial sports campaign rather than a generic Shopify theme. The first release uses a curated local catalog based on the current store and keeps Shopify behind a replaceable commerce adapter. Real payments remain disabled until Shopify credentials are supplied.

## Brand Direction

- Palette: oxblood red, near-black, warm off-white, and a restrained electric violet accent inspired by the supplied typography reference.
- Typography: oversized condensed display type for campaign moments; clean geometric sans serif for navigation and commerce details.
- Motion: a full-viewport repeated-word hero with one highlighted line, continuous horizontal drift, subtle image reveal, and reduced-motion support.
- Voice: direct, football-culture-led, youthful, and concise. Avoid invented performance claims or unverified statistics.

## Visitor Experience

The landing page opens with the animated hero, then moves through featured drops, category navigation, an editorial story panel, jersey-version guidance, sizing, and a final collection call to action. The catalog supports Retro, Club, Player Version, Fan Version, and Jersey Sets. Product cards open detail views with size selection, stock state, price, and add-to-cart behavior.

The cart is a responsive slide-over with quantity changes, removal, totals, and a clear demo-checkout transition. Checkout collects no payment data; it presents an order summary and explains that secure payment will be handed to Shopify once connected.

## Application Architecture

Use React with Vite and client-side routing. Product data is exposed through a `CommerceProvider` interface with a local implementation for this release and a documented Shopify implementation boundary. Cart state is stored locally so it survives refreshes. Pure catalog and cart functions remain framework-independent and receive focused automated tests.

## Page and Component Structure

- Global shell: announcement strip, responsive navigation, search, cart trigger, footer, and motion/accessibility preferences.
- Home: animated hero, latest drops, category runway, quality comparison, community/Instagram callout, newsletter.
- Collections: filterable and sortable catalog with category-aware routes.
- Product: image-led detail page, size selector, product facts, quantity, and related items.
- Cart: slide-over and dedicated empty/filled states.
- Checkout demo: contact and delivery mockup, order summary, Shopify activation notice, no payment form.
- Merchant connection: concise integration page describing the environment variables and switch needed to enable Shopify products, admin publishing, checkout, and payments.

## Data and Commerce Rules

- Local products use current Fit Originals names, representative prices, sizes, and Shopify-hosted product imagery.
- Prices are stored in integer paise and formatted as INR.
- A cart line is uniquely identified by product ID and selected size.
- Adding the same product/size increments quantity; different sizes create separate lines.
- Quantity never falls below one through increment/decrement controls; explicit removal deletes a line.
- Sold-out products cannot be added.
- Checkout never implies a real order was placed while demo mode is active.

## Responsive and Accessibility Requirements

- Layouts must remain usable from 320px mobile widths through large desktop screens.
- Navigation collapses without hiding collection access; dialogs and drawers are keyboard operable and labeled.
- Visible focus styles, sufficient contrast, semantic landmarks, alt text, and reduced-motion behavior are required.
- Product grids, typography, and controls must avoid horizontal overflow at every breakpoint.

## Shopify Activation Boundary

The UI consumes a provider contract rather than importing demo data directly. A future Shopify provider will read the store domain and Storefront API token from runtime configuration, map Shopify products and variants to the same product model, create Shopify carts, and redirect customers to Shopify-hosted checkout. Product creation and publishing remain in Shopify Admin; this site does not duplicate merchant authentication or raw card handling.

## Verification

- Automated tests cover filtering, category normalization, price formatting, cart line identity, quantity behavior, totals, persistence parsing, and demo checkout safety.
- A production build must complete without warnings or broken imports.
- Browser QA covers desktop and mobile navigation, hero motion/reduced motion, category browsing, product size selection, cart updates, and checkout messaging.

