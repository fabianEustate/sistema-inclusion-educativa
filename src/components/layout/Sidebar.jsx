'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrollPanel } from 'primereact/scrollpanel';
import styles from './Sidebar.module.css';

export default function Sidebar({ collapsed, role }) {
  const pathname = usePathname();

  // Submenús desplegables
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Menús por rol
  const menus = {
    admin: [
      { label: 'Dashboard', icon: 'pi pi-home', path: '/admin/dashboard' },
      {
        label: 'Estudiantes',
        icon: 'pi pi-graduation-cap',
        submenu: [
          { label: 'Información', path: '/admin/estudiantes/informacion' },
          { label: 'Ficha socioeconómica', path: '/admin/estudiantes/ficha-socioeconomica' },
          { label: 'Consentimiento informado', path: '/admin/estudiantes/consentimiento-informado' },
          { label: 'Inventario Beck', path: '/admin/estudiantes/inventario-beck' },
          { label: 'Visita domiciliaria', path: '/admin/estudiantes/constancia-visita-domiciliaria' },
          { label: 'Discapacidad', path: '/admin/estudiantes/historia-discapacidad' },
          { label: 'Retiro voluntario', path: '/admin/estudiantes/retiro-voluntario' },
        ],
      },
      {
        label: 'Eventos',
        icon: 'pi pi-calendar',
        submenu: [
          { label: 'Lista de eventos', path: '/admin/eventos/lista' },
          { label: 'Crear evento', path: '/admin/eventos/crear' },
        ],
      },
      {
        label: 'Noticias',
        icon: 'pi pi-megaphone',
        submenu: [
          { label: 'Lista de noticias', path: '/admin/noticias/lista' },
          { label: 'Crear noticia', path: '/admin/noticias/crear' },
        ],
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        submenu: [
          { label: 'Crear usuario', path: '/admin/usuarios/crear' },
          { label: 'Lista de usuarios', path: '/admin/usuarios/lista' },
        ],
      },
      { label: 'Agenda', icon: 'pi pi-calendar-clock', path: '/admin/agenda' },
      { label: 'Reporte', icon: 'pi pi-file', path: '/admin/reporte' },
    ],

    psicologo: [
      { label: 'Dashboard', icon: 'pi pi-home', path: '/psicologo/dashboard' },
      { label: 'Estudiantes', icon: 'pi pi-user', path: '/psicologo/estudiantes' },
      { label: 'Evaluaciones', icon: 'pi pi-check-square', path: '/psicologo/evaluaciones' },
      { label: 'Seguimientos', icon: 'pi pi-book', path: '/psicologo/seguimientos' },
    ],

    docente: [
      { label: 'Dashboard', icon: 'pi pi-home', path: '/docente/dashboard' },
      { label: 'Estudiantes', icon: 'pi pi-comments', path: '/docente/estudiantes' },
      { label: 'Informes', icon: 'pi pi-calendar', path: '/docente/informes' },
      { label: 'Reuniones', icon: 'pi pi-users', path: '/docente/reuniones' },
    ],

    tutor: [
      { label: 'Dashboard', icon: 'pi pi-home', path: '/tutor/dashboard' },
      { label: 'Observaciones', icon: 'pi pi-file', path: '/tutor/observaciones' },
      { label: 'Reuniones', icon: 'pi pi-users', path: '/tutor/reuniones' },
      {
        label: 'Tutorias',
        icon: 'pi pi-book',
        submenu: [
          { label: 'Crear tutoria', path: '/tutor/tutorias/crear' },
          { label: 'Lista de tutorias', path: '/tutor/tutorias/lista' },
        ],
      },
    ],
  };

  const currentMenu = menus[role] || [];

  return (
    <aside className={styles.sidebar} style={{ width: collapsed ? '80px' : '250px' }}>
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="logo" className={styles.logoImage} />
        {!collapsed && (
          <div className={styles.logoText}>
            <h4>Universidad</h4>
            <p>Popular del Cesar</p>
          </div>
        )}
      </div>

      <ScrollPanel style={{ flex: 1 }}>
        <nav className={styles.menu}>
          {currentMenu.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <>
                  <div
                    className={`${styles.menuItem} ${styles.expandable}`}
                    onClick={() => toggleMenu(item.label)}
                  >
                    <div className={styles.menuLabel}>
                      <i className={`${item.icon} ${styles.icon}`}></i>
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && (
                      <i
                        className={`pi ${
                          openMenu === item.label ? 'pi-chevron-down' : 'pi-chevron-right'
                        } ${styles.arrowIcon}`}
                      ></i>
                    )}
                  </div>

                  <div
                    className={`${styles.submenu} ${
                      openMenu === item.label && !collapsed ? styles.open : ''
                    }`}
                  >
                    {item.submenu.map((sub, idx) => (
                      <Link key={idx} href={sub.path} passHref>
                        <div
                          className={`${styles.submenuItem} ${
                            pathname === sub.path ? styles.subActive : ''
                          }`}
                        >
                          {sub.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href={item.path} passHref>
                  <div
                    className={`${styles.menuItem} ${
                      pathname === item.path ? styles.active : ''
                    }`}
                  >
                    <i className={`${item.icon} ${styles.icon}`}></i>
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </ScrollPanel>
    </aside>
  );
}
