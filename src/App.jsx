import { useState } from "react";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import CollectionsPage from "./pages/CollectionsPage";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import { CSS } from "./constants/data";

export default function App() {
  const [view, setView] = useState("shop"); // shop | collections | about | product | admin

  // Global state shared across pages: cart + active product
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [active, setActive] = useState(null);

  const addToCart = (p, qty = 1) => {
    setCart((c) => {
      const f = c.find((x) => x.id === p.id);
      if (f) return c.map((x) => (x.id === p.id ? { ...x, qty: x.qty + qty } : x));
      return [...c, { ...p, qty }];
    });
    setCartOpen(true);
  };

  const setQty = (id, d) =>
    setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x)));
  const removeItem = (id) => setCart((c) => c.filter((x) => x.id !== id));
  const cartCount = cart.reduce((a, x) => a + x.qty, 0);
  const cartTotal = cart.reduce((a, x) => a + x.qty * x.price, 0);

  // Open a product on its own page (replaces the old modal)
  const openProduct = (p) => {
    setActive(p);
    setView("product");
    window.scrollTo({ top: 0 });
  };

  const isAdmin = view === "admin";

  return (
    <div className="rs-root">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Storefront chrome is hidden inside the admin portal */}
      {!isAdmin && (
        <Navbar
          view={view}
          setView={setView}
          cartCount={cartCount}
          setCartOpen={setCartOpen}
        />
      )}

      {view === "shop" && (
        <ShopPage addToCart={addToCart} setActive={openProduct} setView={setView} />
      )}
      {view === "collections" && (
        <CollectionsPage addToCart={addToCart} setActive={openProduct} setView={setView} />
      )}
      {view === "about" && <AboutPage setView={setView} />}
      {view === "product" && active && (
        <ProductPage
          product={active}
          addToCart={addToCart}
          onSelect={openProduct}
          onBack={() => { setView("shop"); window.scrollTo({ top: 0 }); }}
        />
      )}
      {isAdmin && <Admin setView={setView} />}

      {!isAdmin && <Footer setView={setView} />}

      {!isAdmin && (
        <CartDrawer
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          cart={cart}
          setQty={setQty}
          removeItem={removeItem}
          cartTotal={cartTotal}
          onSelect={openProduct}
        />
      )}
    </div>
  );
}