import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { formatINR } from "../commerce/catalog.js";
import { useCart } from "../context/CartContext.jsx";

export function CartDrawer() {
  const { state, totals, isOpen, closeCart, updateItem, removeItem } = useCart();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    closeRef.current?.focus();
    const onKeyDown = (event) => event.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKeyDown);
    document.body.classList.add("drawer-locked");
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("drawer-locked");
    };
  }, [isOpen, closeCart]);

  return (
    <>
      <button className={`drawer-backdrop ${isOpen ? "is-open" : ""}`} aria-label="Close cart" tabIndex={isOpen ? 0 : -1} onClick={closeCart} />
      <aside className={`cart-drawer ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen} aria-label="Shopping cart">
        <div className="cart-head">
          <div>
            <p className="eyebrow">Your selection</p>
            <h2>Matchday bag <span>{totals.itemCount}</span></h2>
          </div>
          <button ref={closeRef} className="icon-button" type="button" onClick={closeCart} aria-label="Close cart">×</button>
        </div>
        {state.lines.length ? (
          <>
            <div className="cart-lines">
              {state.lines.map((line) => (
                <article className="cart-line" key={line.key}>
                  <Link to={`/products/${line.slug}`} onClick={closeCart}><img src={line.image} alt={line.alt} /></Link>
                  <div className="cart-line-copy">
                    <div>
                      <h3>{line.title}</h3>
                      <p>Size {line.size}</p>
                    </div>
                    <div className="line-actions">
                      <div className="quantity-control" aria-label={`Quantity for ${line.title}`}>
                        <button type="button" onClick={() => updateItem(line.key, line.quantity - 1)} aria-label="Decrease quantity">−</button>
                        <span>{line.quantity}</span>
                        <button type="button" onClick={() => updateItem(line.key, line.quantity + 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <strong>{formatINR(line.price * line.quantity)}</strong>
                    </div>
                    <button className="remove-line" type="button" onClick={() => removeItem(line.key)}>Remove</button>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><strong>{formatINR(totals.subtotal)}</strong></div>
              <p>Shipping is free across India. Taxes and secure payment are handled when Shopify is connected.</p>
              <Link className="button button-dark button-wide" to="/checkout" onClick={closeCart}>Continue to checkout <span>↗</span></Link>
              <button className="text-button" type="button" onClick={closeCart}>Keep shopping</button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <span className="empty-ball">↗</span>
            <h3>Your bag is waiting.</h3>
            <p>Start with a new-season drop or bring an icon back from the archive.</p>
            <Link className="button button-dark" to="/collections/all" onClick={closeCart}>Explore all jerseys</Link>
          </div>
        )}
      </aside>
    </>
  );
}

