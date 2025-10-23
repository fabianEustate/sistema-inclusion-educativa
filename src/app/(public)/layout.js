'use client';
import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../globals.css';
import '@/styles/variables.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './layoutPublic.css';
import AccessibilityMenu from '@/components/accessibility/AccessibilityMenu';

export default function PublicLayout({ children }) {
  const pathname = usePathname();
  const isInicio = pathname.includes('/inicio');

  return (
    <html lang="es">
      <body>
        {/* ======= HEADER INSTITUCIONAL ======= */}
        <header className="public-header" role="banner" aria-label="Encabezado institucional">
          <div className="header-container">
            {/* LOGO */}
            <div className="header-logo" tabIndex={0}>
              <img
                src="/logo.png"
                alt="Logo de la Universidad Popular del Cesar"
                className="logo"
              />
              <span className="header-title">Universidad Popular del Cesar</span>
            </div>

            {/* NAV LINKS */}
            <nav
              className="header-nav"
              role="navigation"
              aria-label="Navegación principal del sitio"
            >
              <Link href="/inicio" aria-current={pathname === '/public/inicio'}>
                Inicio
              </Link>
              <Link href="/eventos" aria-current={pathname === '/public/eventos'}>
                Eventos
              </Link>
              <Link href="/noticias" aria-current={pathname === '/public/noticias'}>
                Noticias
              </Link>
              <Link href="/login">Ingresar</Link>
            </nav>
          </div>
        </header>

        {/* ======= CONTENIDO ======= */}
        <main>{children}</main>

        {/* ======= FOOTER ======= */}
        <footer className="public-footer" role="contentinfo">
          <p>
            © {new Date().getFullYear()} Universidad Popular del Cesar — Oficina de Bienestar
            Institucional. Todos los derechos reservados.
          </p>
        </footer>
        <AccessibilityMenu />
      </body>
    </html>
  );
}
