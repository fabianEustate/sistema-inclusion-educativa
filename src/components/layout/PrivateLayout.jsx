'use client';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AccessibilityMenu from '@/components/accessibility/AccessibilityMenu';
import styles from './PrivateLayout.module.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../../app/globals.css';
import '@/styles/variables.css';

export default function PrivateLayout({ children, role }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.container}>
      <Sidebar collapsed={collapsed} role={role} />
      <div className={styles.content}>
        <Topbar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className={styles.mainContent}>{children}</main>
      </div>
      <AccessibilityMenu />
    </div>
  );
}
