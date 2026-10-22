import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Graphics";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function resize() {
      if (window.innerWidth > 760) setOpen(false);
    }
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <a
        className="wordmark"
        href="#start"
        aria-label="S + H Grundbau GmbH – Anker- & Pfahltechnik – Startseite"
        onClick={() => setOpen(false)}
      >
        <img
          className="brand-logo"
          src="/brand/sh-grundbau-logo-640.webp"
          srcSet="/brand/sh-grundbau-logo-640.webp 640w, /brand/sh-grundbau-logo-1280.webp 1280w"
          sizes="108px"
          width="640"
          height="452"
          alt="S + H Grundbau GmbH"
          fetchPriority="high"
        />
        <span className="brand-caption" aria-hidden="true">
          S + H Grundbau GmbH <small>Anker- &amp; Pfahltechnik</small>
        </span>
      </a>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        <span>{open ? "Schließen" : "Menü"}</span>
        <span
          className={open ? "hamburger is-open" : "hamburger"}
          aria-hidden="true"
        >
          <i />
          <i />
        </span>
      </button>
      <nav
        id="main-navigation"
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Hauptnavigation"
        onClick={() => setOpen(false)}
      >
        <a href="#leistungen">Leistungen</a>
        <a href="#unternehmen">Unternehmen</a>
        <a href="#kontakt">Kontakt</a>
        <a href="#kontakt" className="button button-dark nav-cta">
          Projekt anfragen <Arrow diagonal />
        </a>
      </nav>
    </header>
  );
}
