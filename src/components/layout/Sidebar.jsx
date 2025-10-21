'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollPanel } from 'primereact/scrollpanel';
import styles from './Sidebar.module.css'; // 👈 nuevo archivo CSS Module

export default function Sidebar({ collapsed }) {
  const pathname = usePathname();
  const [showStudentsSubmenu, setShowStudentsSubmenu] = useState(false);

  // 🔹 Si estás en una ruta de estudiantes, el submenú se abre automáticamente
  useEffect(() => {
    if (pathname.startsWith('/dashboard/estudiantes')) {
      setShowStudentsSubmenu(true);
    }
  }, [pathname]);

  const menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', path: '/dashboard' },
    { label: 'Analytics', icon: 'pi pi-chart-line', path: '/dashboard/analytics' },
    { label: 'Reports', icon: 'pi pi-chart-bar', path: '/dashboard/reports' },
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
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.path;
            return (
              <Link key={idx} href={item.path} passHref>
                <div
                  className={`${styles.menuItem} ${
                    isActive ? styles.active : ''
                  }`}
                >
                  <i className={`${item.icon} ${styles.icon}`}></i>
                  {!collapsed && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}

          {/* ===== MÓDULO DE ESTUDIANTES ===== */}
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

          {/* ===== SUBMENÚ ===== */}
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
        </nav>
      </ScrollPanel>
    </aside>
  );
}
