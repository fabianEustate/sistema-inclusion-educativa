'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollPanel } from 'primereact/scrollpanel';
import styles from './Sidebar.module.css';

export default function Sidebar({ collapsed }) {
  const pathname = usePathname();

  const [showStudentsSubmenu, setShowStudentsSubmenu] = useState(false);
  const [showEventsSubmenu, setShowEventsSubmenu] = useState(false);
  const [showNewsSubmenu, setShowNewsSubmenu] = useState(false);

  // 🔹 Abre automáticamente el submenú según la ruta actual
  useEffect(() => {
    if (pathname.startsWith('/dashboard/estudiantes')) setShowStudentsSubmenu(true);
    if (pathname.startsWith('/dashboard/eventos')) setShowEventsSubmenu(true);
    if (pathname.startsWith('/dashboard/noticias')) setShowNewsSubmenu(true);
  }, [pathname]);

  const menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', path: '/dashboard' },
    { label: 'Analytics', icon: 'pi pi-chart-line', path: '/dashboard/analytics' },
    { label: 'Agenda', icon: 'pi pi-calendar-clock', path: '/dashboard/agenda' },
  ];

  const studentSubmenu = [
    { label: 'Información del estudiante', path: '/dashboard/estudiantes/informacion' },
    { label: 'Ficha socioeconómica', path: '/dashboard/estudiantes/ficha-socioeconomica' },
    { label: 'Consentimiento informado', path: '/dashboard/estudiantes/consentimiento-informado' },
    { label: 'Inventario de Beck', path: '/dashboard/estudiantes/inventario-beck' },
    { label: 'Constancia de visita domiciliaria', path: '/dashboard/estudiantes/constancia-visita-domiciliaria' },
    { label: 'Historia de personas con discapacidad', path: '/dashboard/estudiantes/historia-discapacidad' },
    { label: 'Retiro voluntario', path: '/dashboard/estudiantes/retiro-voluntario' },
  ];

  const eventsSubmenu = [
    { label: 'Lista de eventos', path: '/dashboard/eventos/lista' },
    { label: 'Crear evento', path: '/dashboard/eventos/crear' },
  ];

  const newsSubmenu = [
    { label: 'Lista de noticias', path: '/dashboard/noticias/lista' },
    { label: 'Crear noticia', path: '/dashboard/noticias/crear' },
  ];

  return (
    <aside
      className={styles.sidebar}
      style={{
        width: collapsed ? '80px' : '250px',
      }}
    >
      {/* ===== LOGO ===== */}
      <div className={styles.logoContainer}>
        {!collapsed ? (
          <div className={styles.logoInfo}>
            <img src="/logo.png" alt="logo" className={styles.logoImage} />
            <div>
              <h4>Universidad</h4>
              <p>Popular del Cesar</p>
            </div>
          </div>
        ) : (
          <img src="/logo.png" alt="logo" className={styles.logoImage} />
        )}
      </div>

      {/* ===== MENÚ CON SCROLL ===== */}
      <ScrollPanel style={{ flex: 1, overflow: 'hidden' }}>
        <nav className={styles.menu}>
          {/* ===== ITEMS PRINCIPALES ===== */}
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.path;
            return (
              <Link key={idx} href={item.path} passHref>
                <div
                  className={`${styles.menuItem} ${isActive ? styles.active : ''}`}
                >
                  <i className={`${item.icon} ${styles.icon}`}></i>
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}

          {/* ===== ESTUDIANTES ===== */}
          <div
            className={`${styles.menuItem} ${styles.expandable}`}
            onClick={() => setShowStudentsSubmenu(!showStudentsSubmenu)}
          >
            <div className={styles.menuLabel}>
              <i className={`pi pi-graduation-cap ${styles.icon}`}></i>
              {!collapsed && <span>Estudiantes</span>}
            </div>
            {!collapsed && (
              <i
                className={`pi ${
                  showStudentsSubmenu ? 'pi-chevron-down' : 'pi-chevron-right'
                } ${styles.arrowIcon}`}
              ></i>
            )}
          </div>

          <div
            className={`${styles.submenu} ${
              showStudentsSubmenu && !collapsed ? styles.open : ''
            }`}
          >
            {studentSubmenu.map((sub, index) => {
              const isSubActive = pathname === sub.path;
              return (
                <Link key={index} href={sub.path} passHref>
                  <div
                    className={`${styles.submenuItem} ${
                      isSubActive ? styles.subActive : ''
                    }`}
                  >
                    {sub.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ===== EVENTOS ===== */}
          <div
            className={`${styles.menuItem} ${styles.expandable}`}
            onClick={() => setShowEventsSubmenu(!showEventsSubmenu)}
          >
            <div className={styles.menuLabel}>
              <i className={`pi pi-calendar ${styles.icon}`}></i>
              {!collapsed && <span>Eventos</span>}
            </div>
            {!collapsed && (
              <i
                className={`pi ${
                  showEventsSubmenu ? 'pi-chevron-down' : 'pi-chevron-right'
                } ${styles.arrowIcon}`}
              ></i>
            )}
          </div>

          <div
            className={`${styles.submenu} ${
              showEventsSubmenu && !collapsed ? styles.open : ''
            }`}
          >
            {eventsSubmenu.map((sub, index) => {
              const isSubActive = pathname === sub.path;
              return (
                <Link key={index} href={sub.path} passHref>
                  <div
                    className={`${styles.submenuItem} ${
                      isSubActive ? styles.subActive : ''
                    }`}
                  >
                    {sub.label}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ===== NOTICIAS ===== */}
          <div
            className={`${styles.menuItem} ${styles.expandable}`}
            onClick={() => setShowNewsSubmenu(!showNewsSubmenu)}
          >
            <div className={styles.menuLabel}>
              <i className={`pi pi-megaphone ${styles.icon}`}></i>
              {!collapsed && <span>Noticias</span>}
            </div>
            {!collapsed && (
              <i
                className={`pi ${
                  showNewsSubmenu ? 'pi-chevron-down' : 'pi-chevron-right'
                } ${styles.arrowIcon}`}
              ></i>
            )}
          </div>

          <div
            className={`${styles.submenu} ${
              showNewsSubmenu && !collapsed ? styles.open : ''
            }`}
          >
            {newsSubmenu.map((sub, index) => {
              const isSubActive = pathname === sub.path;
              return (
                <Link key={index} href={sub.path} passHref>
                  <div
                    className={`${styles.submenuItem} ${
                      isSubActive ? styles.subActive : ''
                    }`}
                  >
                    {sub.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </ScrollPanel>
    </aside>
  );
}
