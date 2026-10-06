import { Link } from "react-router-dom";

const steps = [
  { number: "01", title: "Create a public Storefront token", copy: "In Shopify Admin, install or open the Headless sales channel and create Storefront API access for products, variants, and carts." },
  { number: "02", title: "Add two environment values", copy: "Set the existing myshopify.com domain and a public Storefront API token in the site runtime. Keep private Admin API credentials server-side." },
  { number: "03", title: "Switch the commerce provider", copy: "The adapter maps Shopify products to the existing card, product, cart, and collection interfaces. The visual storefront stays unchanged." },
  { number: "04", title: "Send payment to Shopify", copy: "At checkout, the provider creates a Shopify cart and redirects to Shopify’s hosted payment page. Card data never touches this site." },
];

export function ConnectShopifyPage() {
  return (
    <section className="connect-page">
      <header className="connect-hero">
        <p className="eyebrow">Merchant setup / Shopify ready</p>
        <h1>One store.<br />A sharper front.</h1>
        <p>Keep products, stock, orders, discounts, and payments in Shopify Admin. Use this custom storefront as the presentation layer customers see.</p>
        <div className="connection-status"><span /> Demo catalog active</div>
      </header>
      <div className="connect-layout">
        <div className="connect-steps">
          {steps.map((step) => <article key={step.number}><span>{step.number}</span><div><h2>{step.title}</h2><p>{step.copy}</p></div></article>)}
        </div>
        <aside className="connection-card">
          <p className="eyebrow">Activation values</p>
          <code>VITE_SHOPIFY_STORE_DOMAIN</code>
          <code>VITE_SHOPIFY_STOREFRONT_TOKEN</code>
          <div className="connection-list"><div><span>Catalog sync</span><b>Ready</b></div><div><span>Variant sizes</span><b>Ready</b></div><div><span>Cart handoff</span><b>Ready</b></div><div><span>Secure payments</span><b>On connection</b></div></div>
          <a className="button button-dark button-wide" href="https://admin.shopify.com" target="_blank" rel="noreferrer">Open Shopify Admin <span>↗</span></a>
          <Link className="text-button" to="/">Return to storefront</Link>
        </aside>
      </div>
      <div className="admin-strip"><p className="eyebrow">Your admin workflow</p><h2>Add product <span>→</span> set sizes + stock <span>→</span> publish <span>→</span> live here</h2></div>
    </section>
  );
}
