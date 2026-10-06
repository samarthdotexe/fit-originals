import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categories, listProducts } from "../commerce/catalog.js";
import { ProductCard } from "../components/ProductCard.jsx";
import { resolveCollectionPage } from "../routes.js";

export function CollectionPage() {
  const { category = "all" } = useParams();
  const basePage = resolveCollectionPage(category);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const visibleProducts = useMemo(
    () => listProducts({ category: basePage.category, query, sort }),
    [basePage.category, query, sort],
  );

  return (
    <section className="collection-page">
      <header className="collection-hero">
        <p className="eyebrow">Fit Originals / Collection</p>
        <h1>{basePage.title}</h1>
        <div className="collection-meta"><span>{String(visibleProducts.length).padStart(2, "0")} jerseys</span><span>Sizes S—2XL</span></div>
      </header>
      <nav className="collection-tabs" aria-label="Collections">
        <Link className={basePage.category === "all" ? "active" : ""} to="/collections/all">All</Link>
        {categories.map((item) => <Link className={basePage.category === item.slug ? "active" : ""} key={item.slug} to={`/collections/${item.slug}`}>{item.shortLabel}</Link>)}
      </nav>
      <div className="catalog-toolbar">
        <label className="search-field"><span className="sr-only">Search jerseys</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search team or jersey" /><b>⌕</b></label>
        <label className="sort-field"><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured first</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="title">A—Z</option></select></label>
      </div>
      {visibleProducts.length ? (
        <div className="product-grid collection-grid">{visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
      ) : (
        <div className="no-results"><span>00</span><h2>No jerseys found.</h2><p>Try another team name or clear your search.</p><button className="text-button" type="button" onClick={() => setQuery("")}>Clear search</button></div>
      )}
    </section>
  );
}

