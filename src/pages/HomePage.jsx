import { Link } from "react-router-dom";
import { categories, listProducts } from "../commerce/catalog.js";
import { ProductCard } from "../components/ProductCard.jsx";

const heroRows = [
  { text: "FIT ORIGINALS", direction: "left" },
  { text: "EVERY JERSEY", direction: "right" },
  { text: "TELLS A STORY", direction: "left", accent: true },
  { text: "FOOTBALL CULTURE", direction: "right" },
  { text: "FIT ORIGINALS", direction: "left" },
];

export function HomePage() {
  const featured = listProducts().slice(0, 4);
  const heroProduct = featured[0];

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title" className="sr-only">Fit Originals — every jersey tells a story</h1>
        <div className="hero-rows" aria-hidden="true">
          {heroRows.map((row, index) => (
            <div className={`hero-row ${row.direction} ${row.accent ? "accent" : ""}`} key={`${row.text}-${index}`}>
              <div><span>{row.text}</span><span>{row.text}</span><span>{row.text}</span></div>
            </div>
          ))}
        </div>
        <div className="hero-product" aria-hidden="true">
          <img src={heroProduct.image} alt="" />
        </div>
        <div className="hero-caption">
          <p>New season · 2026/27</p>
          <p>Football · style · culture</p>
        </div>
        <Link className="hero-arrow" to="/collections/all" aria-label="Shop the jersey collection">↗</Link>
      </section>

      <section className="section latest-section">
        <div className="section-heading">
          <div><p className="eyebrow">Fresh from the tunnel</p><h2>Latest drops</h2></div>
          <Link className="arrow-link" to="/collections/all">Shop all <span>↗</span></Link>
        </div>
        <div className="product-grid featured-grid">
          {featured.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
        </div>
      </section>

      <section className="category-runway" aria-labelledby="category-title">
        <div className="runway-intro">
          <p className="eyebrow">Find your fit</p>
          <h2 id="category-title">Five ways to<br />wear the game.</h2>
          <p>From the shirts that shaped history to match-ready cuts and complete sets.</p>
        </div>
        <div className="category-list">
          {categories.map((category) => (
            <Link to={`/collections/${category.slug}`} key={category.slug}>
              <span>{category.index}</span><strong>{category.label}</strong><b>↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="story-section">
        <div className="story-image">
          <img src="https://cdn.shopify.com/s/files/1/0799/0876/5845/files/A5573AC2-D809-414E-8F55-98C35910340A.webp?v=1790892085" alt="Argentina retro football jersey from the Fit Originals collection" loading="lazy" />
          <span>Archive / 2014</span>
        </div>
        <div className="story-copy">
          <p className="eyebrow">More than a jersey</p>
          <h2>The colours.<br />The players.<br /><em>The memory.</em></h2>
          <p>A shirt can take you back in seconds. To the final, the goal, the player you tried to become in the street outside.</p>
          <Link className="button button-light" to="/collections/retro">Enter the archive <span>↗</span></Link>
        </div>
      </section>

      <section className="version-guide section">
        <div className="section-heading">
          <div><p className="eyebrow">Choose your version</p><h2>Made for your matchday.</h2></div>
          <p className="section-note">Same badge. Different feel. Pick the construction that fits how you wear football.</p>
        </div>
        <div className="version-grid">
          <article className="version-card version-player">
            <span className="version-number">01</span>
            <p className="eyebrow">Player version</p>
            <h3>Closer. Lighter.<br />Match inspired.</h3>
            <ul><li>Athletic fit</li><li>Lightweight feel</li><li>Performance details</li></ul>
            <Link to="/collections/player">Shop player <span>↗</span></Link>
          </article>
          <article className="version-card version-fan">
            <span className="version-number">02</span>
            <p className="eyebrow">Fan version</p>
            <h3>Relaxed. Durable.<br />Everyday ready.</h3>
            <ul><li>Comfort fit</li><li>Easy layering</li><li>Supporter finish</li></ul>
            <Link to="/collections/fan">Shop fan <span>↗</span></Link>
          </article>
        </div>
      </section>

      <section className="community-section">
        <div className="community-orbit"><span>FIT.</span><b>⚽</b><span>ORIGINALS</span></div>
        <p className="eyebrow">Join the community</p>
        <h2>THE GAME LIVES<br />BEYOND 90.</h2>
        <p>Follow new drops, customer fits, restocks, and the football culture behind every shirt.</p>
        <a className="button button-dark" href="https://www.instagram.com/fit.orginals" target="_blank" rel="noreferrer">@fit.orginals <span>↗</span></a>
      </section>
    </>
  );
}

