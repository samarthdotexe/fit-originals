import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatINR, listProducts } from "../commerce/catalog.js";
import { ProductCard } from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import { resolveProductPage } from "../routes.js";

export function ProductPage() {
  const { slug } = useParams();
  const { status, product } = resolveProductPage(slug);
  const { addItem } = useCart();
  const [size, setSize] = useState("");
  const [error, setError] = useState("");

  if (status === "missing") {
    return <section className="missing-page"><p className="eyebrow">404 / Offside</p><h1>This jersey left the pitch.</h1><Link className="button button-dark" to="/collections/all">Back to all jerseys</Link></section>;
  }

  const related = listProducts({ category: product.category }).filter((item) => item.id !== product.id).slice(0, 3);
  function handleAdd() {
    try {
      addItem(product, size);
      setError("");
    } catch (caught) {
      setError(caught.message);
    }
  }

  return (
    <>
      <section className="product-page">
        <div className={`product-gallery tone-${product.tone}`}>
          <span className="gallery-label">{product.badge}</span>
          <img src={product.image} alt={product.alt} />
          <div className="gallery-index">FIT / {product.category.toUpperCase()} / 26—27</div>
        </div>
        <div className="product-info">
          <Link className="back-link" to={`/collections/${product.category}`}>← Back to {product.category}</Link>
          <p className="eyebrow">{product.team} · {product.category} version</p>
          <h1>{product.title}</h1>
          <div className="detail-price"><strong>{formatINR(product.price)}</strong>{product.compareAt ? <del>{formatINR(product.compareAt)}</del> : null}<span>Inclusive of taxes</span></div>
          <p className="product-description">{product.description}</p>
          <div className="size-head"><strong>Select size</strong><button type="button" onClick={() => document.getElementById("size-guide")?.scrollIntoView({ behavior: "smooth" })}>Size guide ↘</button></div>
          <div className="size-grid" role="group" aria-label="Choose a size">
            {product.sizes.map((item) => <button className={size === item ? "selected" : ""} type="button" key={item} onClick={() => { setSize(item); setError(""); }}>{item}</button>)}
          </div>
          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <button className="add-button" type="button" onClick={handleAdd} disabled={!product.available}><span>{product.available ? "Add to bag" : "Sold out"}</span><span>{formatINR(product.price)} ↗</span></button>
          <div className="product-promises"><div><b>01</b><span>Free India shipping</span></div><div><b>02</b><span>Size help available</span></div><div><b>03</b><span>Quality checked</span></div></div>
          <details><summary>Product details <span>+</span></summary><p>Comfortable football-shirt construction with clean crest, sponsor, and panel detailing. Exact fabric and fit specifications will sync from Shopify when the live catalog is connected.</p></details>
          <details><summary>Care guide <span>+</span></summary><p>Cold wash inside out. Do not iron prints. Air dry away from direct heat.</p></details>
        </div>
      </section>
      <section id="size-guide" className="size-guide section">
        <div><p className="eyebrow">Fit notes</p><h2>Choose your<br />matchday fit.</h2></div>
        <div className="size-table"><div><span>Size</span><span>Chest</span><span>Length</span></div>{[["S","36–38","27"],["M","38–40","28"],["L","40–42","29"],["XL","42–44","30"],["2XL","44–46","31"]].map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}{cell !== row[0] ? '"' : ""}</span>)}</div>)}</div>
      </section>
      {related.length ? <section className="section related-section"><div className="section-heading"><div><p className="eyebrow">Keep looking</p><h2>Same version. New story.</h2></div></div><div className="product-grid related-grid">{related.map((item, index) => <ProductCard product={item} index={index} key={item.id} />)}</div></section> : null}
    </>
  );
}

