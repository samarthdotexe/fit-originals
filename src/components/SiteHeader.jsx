import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const navItems = [
  ["/collections/retro", "Retro"],
  ["/collections/club", "Club"],
  ["/collections/player", "Player"],
  ["/collections/fan", "Fan"],
  ["/collections/sets", "Sets"],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { totals, openCart } = useCart();

  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    document.body.classList.toggle("nav-locked", menuOpen);
    return () => document.body.classList.remove("nav-locked");
  }, [menuOpen]);

  return (
    <>
      <div className="announcement" role="status">
        <span>Free shipping across India</span>
        <span className="announcement-center">New season · 26/27</span>
        <span>Easy size support</span>
      </div>
      <header className="site-header">
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span className="sr-only">Toggle navigation</span>
        </button>
        <nav className="desktop-nav nav-left" aria-label="Primary navigation">
          {navItems.slice(0, 3).map(([href, label]) => (
            <NavLink key={href} to={href}>{label}</NavLink>
          ))}
        </nav>
        <Link className="wordmark" to="/" aria-label="Fit Originals home">
          <span>FIT.</span>ORIGINALS
        </Link>
        <nav className="desktop-nav nav-right" aria-label="Secondary navigation">
          {navItems.slice(3).map(([href, label]) => (
            <NavLink key={href} to={href}>{label}</NavLink>
          ))}
          <button className="cart-button" type="button" onClick={openCart} aria-label={`Open cart with ${totals.itemCount} items`}>
            Cart <span>{String(totals.itemCount).padStart(2, "0")}</span>
          </button>
        </nav>
        <button className="mobile-cart" type="button" onClick={openCart} aria-label={`Open cart with ${totals.itemCount} items`}>
          Bag <span>{totals.itemCount}</span>
        </button>
      </header>
      <div id="mobile-navigation" className={`mobile-navigation ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <p className="eyebrow">Shop by collection</p>
        {navItems.map(([href, label], index) => (
          <NavLink key={href} to={href} tabIndex={menuOpen ? 0 : -1}>
            <span>0{index + 1}</span>{label}<b>↗</b>
          </NavLink>
        ))}
        <div className="mobile-nav-foot">Every jersey tells a story.</div>
      </div>
    </>
  );
}

