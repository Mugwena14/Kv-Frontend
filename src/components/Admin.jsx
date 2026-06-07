import React, { useState } from "react";
import Sidebar from "./admin/Sidebar";
import TopBar from "./admin/TopBar";
import Login from "./admin/Login";
import Dashboard from "./sections/Dashboard";
import Orders from "./sections/Oders";
import Products from "./sections/Products";
import Customers from "./sections/Customers";
import Discounts from "./sections/Discounts";
import Invoices from "./sections/Invoices";
import Settings from "./sections/Settings";
import CoPilot from "./sections/CoPilot";
import { STORE, PRODUCTS, INK, ADMIN } from "../constants/data";
import { LayoutDashboard, ShoppingBag, Package, Users, Percent, FileText, Sparkles, Settings as SettingsIcon } from "lucide-react";

const SECTIONS = {
  dashboard: { title: "Dashboard", icon: LayoutDashboard },
  orders:    { title: "Orders",    icon: ShoppingBag },
  products:  { title: "Products",  icon: Package },
  customers: { title: "Customers", icon: Users },
  discounts: { title: "Discounts", icon: Percent },
  invoices:  { title: "Invoices",  icon: FileText },
  copilot:   { title: "AI Co-pilot", icon: Sparkles },
  settings:  { title: "Settings",  icon: SettingsIcon },
};

const DEFAULT_SETTINGS = {
  storeName: "JV Kourt",
  email: "hello@jvkourt.co.za",
  phone: "+27 21 000 0000",
  announce: "Free delivery on 2 or more items · Shipped via PEP Paxi",
  freeShipQty: 2,
  paxiEnabled: true,
  paxiCode: "JVK-001",
};

export default function Admin({ setView }) {
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lifted store state
  const [orders, setOrders] = useState(STORE.orders);
  const updateOrder = (id, patch) => setOrders((os) => os.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  const [products, setProducts] = useState(PRODUCTS);
  const updateProduct = (id, patch) => setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const [discounts, setDiscounts] = useState(STORE.discounts);
  const addDiscount = (d) => setDiscounts((ds) => [{ ...d, uses: 0 }, ...ds]);
  const disableDiscount = (code) => setDiscounts((ds) => ds.map((d) => (d.code === code ? { ...d, disabled: true } : d)));

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const admin = { name: "ES Makofane", role: "Admin Access", initials: "EM" };

  // Login gate
  if (!authed) {
    return <Login onAuth={() => setAuthed(true)} onCancel={() => { setView?.("shop"); window.scrollTo({ top: 0 }); }} />;
  }

  const renderSection = () => {
    switch (section) {
      case "dashboard": return <Dashboard orders={orders} />;
      case "orders":    return <Orders orders={orders} updateOrder={updateOrder} />;
      case "products":  return <Products products={products} updateProduct={updateProduct} />;
      case "customers": return <Customers customers={STORE.customers} orders={orders} />;
      case "discounts": return <Discounts discounts={discounts} addDiscount={addDiscount} disableDiscount={disableDiscount} />;
      case "invoices":  return <Invoices orders={orders} />;
      case "settings":  return <Settings settings={settings} onSave={setSettings} />;
      case "copilot":   return <CoPilot orders={orders} products={products} customers={STORE.customers} discounts={discounts} updateOrder={updateOrder} updateProduct={updateProduct} addDiscount={addDiscount} />;
      default:          return null;
    }
  };

  return (
    <div className="flex min-h-screen" style={{ background: ADMIN.bg }}>
      <Sidebar
        section={section}
        setSection={setSection}
        onLogout={() => { setAuthed(false); setView?.("shop"); window.scrollTo({ top: 0 }); }}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar title={SECTIONS[section].title} onMenu={() => setMobileOpen(true)} admin={admin} />
        <main className="flex-1 p-5 md:p-8">{renderSection()}</main>
      </div>
    </div>
  );
}