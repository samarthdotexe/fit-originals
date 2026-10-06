import { Link } from "react-router-dom";
import { formatINR } from "../commerce/catalog.js";

export function ProductCard({ product, index = 0 }) {
  return (
    <article className="product-card" style={{ "--delay": `${index * 50}ms` }}>
      <Link className={`product-image tone-${product.tone}`} to={`/products/${product.slug}`}>
        <span className="product-badge">{product.badge}</span>
        <img src={product.image} alt={product.alt} loading="lazy" />
        <span className="product-view">View jersey ↗</span>
      </Link>
      <div className="product-meta">
        <div>
          <p>{product.team} · {product.category}</p>
          <h3><Link to={`/products/${product.slug}`}>{product.title}</Link></h3>
        </div>
        <div className="price-block">
          <strong>{formatINR(product.price)}</strong>
          {product.compareAt ? <del>{formatINR(product.compareAt)}</del> : null}
        </div>
      </div>
    </article>
  );
}

