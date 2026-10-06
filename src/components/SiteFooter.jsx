import { Link } from "react-router-dom";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow">Football · Style · Culture</p>
          <h2>Wear the story.<br />Own the moment.</h2>
        </div>
        <Link className="circle-link" to="/collections/all" aria-label="Shop all jerseys">↗</Link>
      </div>
      <div className="footer-grid">
        <div>
          <Link className="footer-wordmark" to="/">FIT.ORIGINALS</Link>
          <p>Every jersey tells a story.</p>
        </div>
        <div className="footer-links">
          <p>Collections</p>
          <Link to="/collections/retro">Retro jerseys</Link>
          <Link to="/collections/player">Player version</Link>
          <Link to="/collections/fan">Fan version</Link>
          <Link to="/collections/sets">Jersey sets</Link>
        </div>
        <div className="footer-links">
          <p>Connect</p>
          <a href="https://www.instagram.com/fit.orginals" target="_blank" rel="noreferrer">Instagram ↗</a>
          <Link to="/connect-shopify">Merchant setup</Link>
          <a href="https://cwuaqi-8x.myshopify.com/pages/contact" target="_blank" rel="noreferrer">Current store support ↗</a>
        </div>
        <form className="footer-signup" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="footer-email">First access to new drops</label>
          <div><input id="footer-email" type="email" placeholder="Email address" /><button type="submit" aria-label="Subscribe">→</button></div>
          <small>Demo signup — no data is sent.</small>
        </form>
      </div>
      <div className="footer-bottom"><span>© 2026 Fit Originals</span><span>Built for the culture</span><span>India</span></div>
    </footer>
  );
}
