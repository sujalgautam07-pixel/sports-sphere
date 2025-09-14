import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-10 sm:pb-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
