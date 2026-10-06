import { useState } from "react";
import { Link } from "react-router-dom";
import { getCheckoutState } from "../commerce/checkout.js";
import { formatINR } from "../commerce/catalog.js";
import { useCart } from "../context/CartContext.jsx";

export function CheckoutPage() {
  const { state, totals } = useCart();
  const checkout = getCheckoutState(state, "demo");
  const [previewReady, setPreviewReady] = useState(false);

  if (!checkout.canContinue) {
    return (
      <section className="checkout-empty">
        <p className="eyebrow">Checkout / 00</p>
        <h1>Your matchday bag is empty.</h1>
        <p>Add a jersey and choose its size before continuing.</p>
        <Link className="button button-dark" to="/collections/all">Find your jersey <span>↗</span></Link>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-main">
        <Link className="checkout-brand" to="/">FIT.ORIGINALS</Link>
        <div className="checkout-steps" aria-label="Checkout progress"><span className="complete">Bag</span><b>—</b><span className="active">Delivery</span><b>—</b><span>Shopify payment</span></div>
        <p className="eyebrow">Step 02 / Delivery</p>
        <h1>Where should<br />the story go?</h1>
        <div className="demo-banner"><strong>Demo checkout</strong><span>No information is sent or stored. Secure payment activates when Shopify is connected.</span></div>
        <form className="checkout-form" onSubmit={(event) => { event.preventDefault(); setPreviewReady(true); }}>
          <label><span>Email</span><input type="email" placeholder="you@example.com" required /></label>
          <div className="form-row"><label><span>First name</span><input type="text" placeholder="First name" required /></label><label><span>Last name</span><input type="text" placeholder="Last name" required /></label></div>
          <label><span>Address</span><input type="text" placeholder="Street and house number" required /></label>
          <div className="form-row"><label><span>City</span><input type="text" placeholder="City" required /></label><label><span>PIN code</span><input type="text" inputMode="numeric" pattern="[0-9]{6}" placeholder="6-digit PIN" required /></label></div>
          <label><span>Phone</span><input type="tel" placeholder="Phone number" required /></label>
          <button className="checkout-continue" type="submit"><span>Preview final step</span><span>Shopify next ↗</span></button>
          {previewReady ? <div className="checkout-preview" role="status"><strong>Delivery step previewed.</strong><p>In live mode, the next action creates a Shopify cart and opens Shopify’s secure checkout. No order or payment was created here.</p><Link to="/connect-shopify">See Shopify setup →</Link></div> : null}
        </form>
      </div>
      <aside className="order-summary">
        <p className="eyebrow">Order summary / {String(totals.itemCount).padStart(2, "0")}</p>
        <div className="summary-lines">
          {state.lines.map((line) => <article key={line.key}><div className="summary-image"><img src={line.image} alt={line.alt} /><span>{line.quantity}</span></div><div><h2>{line.title}</h2><p>Size {line.size}</p></div><strong>{formatINR(line.price * line.quantity)}</strong></article>)}
        </div>
        <div className="summary-totals"><div><span>Subtotal</span><strong>{formatINR(totals.subtotal)}</strong></div><div><span>Shipping</span><strong>Free</strong></div><div className="summary-total"><span>Total</span><strong>{formatINR(totals.subtotal)}</strong></div></div>
        <p className="summary-note">Final inventory, taxes, discounts, and payment will be validated by Shopify in live mode.</p>
      </aside>
    </section>
  );
}

