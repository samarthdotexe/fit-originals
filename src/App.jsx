import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CartDrawer } from "./components/CartDrawer.jsx";
import { SiteFooter } from "./components/SiteFooter.jsx";
import { SiteHeader } from "./components/SiteHeader.jsx";
import { CollectionPage } from "./pages/CollectionPage.jsx";
import { CheckoutPage } from "./pages/CheckoutPage.jsx";
import { ConnectShopifyPage } from "./pages/ConnectShopifyPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { ProductPage } from "./pages/ProductPage.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="site-shell">
      <ScrollToTop />
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections/:category" element={<CollectionPage />} />
          <Route path="/collections" element={<CollectionPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/connect-shopify" element={<ConnectShopifyPage />} />
          <Route path="*" element={<CollectionPage />} />
        </Routes>
      </main>
      <SiteFooter />
      <CartDrawer />
    </div>
  );
}
