'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollPanel } from 'primereact/scrollpanel';
import styles from './Sidebar.module.css';

export default function Sidebar({ collapsed }) {
  const pathname = usePathname();

  // Estados para submenús
  const [showStudentsSubmenu, setShowStudentsSubmenu] = useState(false);
  const [showEventsSubmenu, setShowEventsSubmenu] = useState(false);
  const [showNewsSubmenu, setShowNewsSubmenu] = useState(false);
  const [showUsersSubmenu, setShowUsersSubmenu] = useState(false);

  // 🔹 Abre automáticamente los submenús según la ruta actual
  useEffect(() => {
    if (pathname.startsWith('/dashboard/estudiantes')) setShowStudentsSubmenu(true);
    if (pathname.startsWith('/dashboard/eventos')) setShowEventsSubmenu(true);
    if (pathname.startsWith('/dashboard/noticias')) setShowNewsSubmenu(true);
    if (pathname.startsWith('/dashboard/usuarios')) setShowUsersSubmenu(true);
  }, [pathname]);

  const menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', path: '/dashboard' },
    { label: 'Analytics', icon: 'pi pi-chart-line', path: '/dashboard/analytics' },
    { label: 'Agenda', icon: 'pi pi-calendar-clock', path: '/dashboard/agenda' },
    { label: 'Reporte', icon: 'pi pi-file', path: '/dashboard/reporte' },
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

  const usersSubmenu = [
    { label: 'Crear usuario', path: '/dashboard/usuarios/crear' },
    { label: 'Lista de usuarios', path: '/dashboard/usuarios/lista' },
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
                <div className={`${styles.menuItem} ${isActive ? styles.active : ''}`}>
                  <i className={`${item.icon} ${styles.icon}`}></i>
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}

          {/* ===== ESTUDIANTES ===== */}
          <ExpandableMenu
            collapsed={collapsed}
            label="Estudiantes"
            icon="pi pi-graduation-cap"
            isOpen={showStudentsSubmenu}
            onClick={() => setShowStudentsSubmenu(!showStudentsSubmenu)}
            submenu={studentSubmenu}
            pathname={pathname}
          />

          {/* ===== EVENTOS ===== */}
          <ExpandableMenu
            collapsed={collapsed}
            label="Eventos"
            icon="pi pi-calendar"
            isOpen={showEventsSubmenu}
            onClick={() => setShowEventsSubmenu(!showEventsSubmenu)}
            submenu={eventsSubmenu}
            pathname={pathname}
          />

          {/* ===== NOTICIAS ===== */}
          <ExpandableMenu
            collapsed={collapsed}
            label="Noticias"
            icon="pi pi-megaphone"
            isOpen={showNewsSubmenu}
            onClick={() => setShowNewsSubmenu(!showNewsSubmenu)}
            submenu={newsSubmenu}
            pathname={pathname}
          />

          {/* ===== USUARIOS ===== */}
          <ExpandableMenu
            collapsed={collapsed}
            label="Usuarios"
            icon="pi pi-users"
            isOpen={showUsersSubmenu}
            onClick={() => setShowUsersSubmenu(!showUsersSubmenu)}
            submenu={usersSubmenu}
            pathname={pathname}
          />
        </nav>
      </ScrollPanel>
    </aside>
  );
}

/* ===== COMPONENTE REUTILIZABLE DE SUBMENÚ ===== */
function ExpandableMenu({ collapsed, label, icon, isOpen, onClick, submenu, pathname }) {
  return (
    <>
      <div className={`${styles.menuItem} ${styles.expandable}`} onClick={onClick}>
        <div className={styles.menuLabel}>
          <i className={`${icon} ${styles.icon}`}></i>
          {!collapsed && <span>{label}</span>}
        </div>
        {!collapsed && (
          <i
            className={`pi ${isOpen ? 'pi-chevron-down' : 'pi-chevron-right'} ${styles.arrowIcon}`}
          ></i>
        )}
      </div>

      <div className={`${styles.submenu} ${isOpen && !collapsed ? styles.open : ''}`}>
        {submenu.map((sub, index) => {
          const isSubActive = pathname === sub.path;
          return (
            <Link key={index} href={sub.path} passHref>
              <div
                className={`${styles.submenuItem} ${isSubActive ? styles.subActive : ''}`}
              >
                {sub.label}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
