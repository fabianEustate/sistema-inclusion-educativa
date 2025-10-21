'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../globals.css';
import '@/styles/variables.css';
import AccessibilityMenu from '@/components/accessibility/AccessibilityMenu';

export default function PrivateLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <html lang="es">
      <body>
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f4f9' }}>
          <Sidebar collapsed={collapsed} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Topbar onToggleSidebar={() => setCollapsed(!collapsed)} />
            <main style={{ flex: 1, overflowY: 'auto' }}>{children}</main>
          </div>
        </div>
        <AccessibilityMenu />
      </body>
    </html>
  );
}
