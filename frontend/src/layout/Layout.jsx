import { useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import CartSidebar from "../components/CartSidebar.jsx";
import MobileBottomNav from "../components/MobileBottomNav.jsx";
import Footer from "../components/Footer.jsx";

export default function Layout({ children }) {
  const location = useLocation();
  const path = location.pathname;

  const exactHide = [
    "/login",
    "/register",
    "/checkout",
    "/admin/orders",
    "/admin/products",
  ];

  const prefixHide = ["/order-success", "/track"];

  const hideChrome =
    exactHide.includes(path) ||
    prefixHide.some((prefix) => path.startsWith(prefix));

  return (
    <>
      {!hideChrome && <Header />}

      {/* main content from routes */}
      {children}

      {!hideChrome && <CartSidebar />}
      {!hideChrome && <MobileBottomNav />}
      {!hideChrome && <Footer />}
    </>
  );
}
