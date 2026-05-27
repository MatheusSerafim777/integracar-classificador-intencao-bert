import { Link, NavLink, Outlet, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "../../assets/images/logo-removebg-preview.png";

export function Root() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F8FBFF", color: "#102A43" }}>
      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid #D6E8F7" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,94,184,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={logo}
                alt="IntegraCAR"
                className="h-10 w-auto max-w-[150px] object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight" style={{ color: "#005EB8" }}>
                  IntegraCAR
                </span>
                <span className="text-xs" style={{ color: "#5B7C99", letterSpacing: "0.02em" }}>
                  Classificador BERT
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { label: "Classificador", action: () => scrollTo("classifier") },
                { label: "Como funciona", action: () => scrollTo("how-it-works") },
                { label: "Tecnologias", action: () => scrollTo("technologies") },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-blue-50 cursor-pointer"
                  style={{ color: "#2F4F68", fontWeight: 500 }}
                >
                  {item.label}
                </button>
              ))}
              <NavLink
                to="/docs"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive ? "bg-blue-50" : "hover:bg-blue-50"
                  }`
                }
                style={{ color: "#2F4F68", fontWeight: 500 }}
              >
                Documentação
              </NavLink>
              <button
                onClick={() => scrollTo("classifier")}
                className="ml-2 px-4 py-2 rounded-xl text-sm text-white font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-md flex items-center gap-1"
                style={{ background: "linear-gradient(135deg, #005EB8 0%, #E63B8C 100%)" }}
              >
                Testar agora <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </nav>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: "#005EB8" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t px-4 py-3 flex flex-col gap-1" style={{ borderColor: "#D6E8F7", background: "white" }}>
            {[
              { label: "Classificador", action: () => scrollTo("classifier") },
              { label: "Como funciona", action: () => scrollTo("how-it-works") },
              { label: "Tecnologias", action: () => scrollTo("technologies") },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="text-left px-4 py-2.5 rounded-lg text-sm hover:bg-blue-50"
                style={{ color: "#2F4F68", fontWeight: 500 }}
              >
                {item.label}
              </button>
            ))}
            <NavLink
              to="/docs"
              className="px-4 py-2.5 rounded-lg text-sm hover:bg-blue-50"
              style={{ color: "#2F4F68", fontWeight: 500 }}
            >
              Documentação
            </NavLink>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-4 text-center border-t"
        style={{ borderColor: "#D6E8F7", background: "white" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="IntegraCAR" className="h-8 w-auto max-w-[120px] object-contain" />
            <span className="text-sm font-semibold" style={{ color: "#005EB8" }}>IntegraCAR</span>
          </div>
          <p className="text-sm" style={{ color: "#6D7F90" }}>
            IntegraCAR — Classificador de Intenções com BERT
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm hover:underline" style={{ color: "#5B7C99" }}>Início</Link>
            <Link to="/docs" className="text-sm hover:underline" style={{ color: "#5B7C99" }}>Documentação</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
