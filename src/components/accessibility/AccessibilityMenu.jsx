'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'primereact/button';
import styles from './AccessibilityMenu.module.css';

const STORAGE_KEY = 'accessibility_prefs';

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [contrast, setContrast] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [colorBlind, setColorBlind] = useState(false);
  const [grayscale, setGrayscale] = useState(false);

  /* -----------------------
     Cargar preferencias
  ----------------------- */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        if (prefs.fontSize) setFontSize(prefs.fontSize);
        if (prefs.contrast !== undefined) setContrast(prefs.contrast);
        if (prefs.darkMode !== undefined) setDarkMode(prefs.darkMode);
        if (prefs.colorBlind !== undefined) setColorBlind(prefs.colorBlind);
        if (prefs.grayscale !== undefined) setGrayscale(prefs.grayscale);
      } catch (e) {
        console.warn('Error al leer preferencias de accesibilidad', e);
      }
    }
  }, []);

  /* -----------------------
     Aplicar cambios visuales
     - usa clases y también style.filter inline para grayscale
     - si activas grayscale se desactivan otros modos
  ----------------------- */
  useEffect(() => {
    const root = document.documentElement;

    // Limpia primero (clases y style.filter)
    root.classList.remove('contrast-1', 'contrast-2', 'dark-mode', 'daltonic', 'grayscale-mode');
    root.style.filter = ''; // limpia cualquier filter inline

    // Si se activa grayscale, priorizamos y limpiamos otras opciones
    if (grayscale) {
      // desactiva otros modos en estado (evita mezcla)
      if (darkMode) setDarkMode(false);
      if (colorBlind) setColorBlind(false);
      if (contrast !== 0) setContrast(0);

      // aplica filter inline (más seguro que depender solo de CSS)
      root.style.filter = 'grayscale(100%)';
      // también añadimos clase por compatibilidad con CSS si la necesitas
      root.classList.add('grayscale-mode');
    } else {
      // aplicar el resto de modos si grayscale no está activo
      if (contrast === 1) root.classList.add('contrast-1');
      if (contrast === 2) root.classList.add('contrast-2');
      if (darkMode) root.classList.add('dark-mode');
      if (colorBlind) root.classList.add('daltonic');
    }

    // font-size global
    root.style.fontSize = `${100 + (fontSize - 1) * 10}%`;

    // Guardar preferencias
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ fontSize, contrast, darkMode, colorBlind, grayscale })
    );
  }, [fontSize, contrast, darkMode, colorBlind, grayscale]);

  /* -----------------------
     Shortcut Ctrl+U
  ----------------------- */
  const handleShortcut = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, [handleShortcut]);

  /* -----------------------
     Reset preferencias
  ----------------------- */
  const resetPreferences = () => {
    setFontSize(1);
    setContrast(0);
    setDarkMode(false);
    setColorBlind(false);
    setGrayscale(false);

    // limpiar almacenamiento y estilos en DOM
    localStorage.removeItem(STORAGE_KEY);
    const root = document.documentElement;
    root.classList.remove('contrast-1', 'contrast-2', 'dark-mode', 'daltonic', 'grayscale-mode');
    root.style.filter = '';
    root.style.fontSize = '100%';
  };

  /* -----------------------
     Helpers para toggles que evitan mezclas
  ----------------------- */

  const toggleGrayscale = () => {
    setGrayscale((g) => {
      const next = !g;
      if (next) {
        // si vamos a activar grayscale, apagar otros estados inmediatamente
        setDarkMode(false);
        setColorBlind(false);
        setContrast(0);
      }
      return next;
    });
  };

  const toggleDark = () => {
    setDarkMode((d) => {
      const next = !d;
      if (next && grayscale) setGrayscale(false); // desactivar grayscale si se activa dark
      return next;
    });
  };

  const toggleColorBlind = () => {
    setColorBlind((c) => {
      const next = !c;
      if (next && grayscale) setGrayscale(false);
      return next;
    });
  };

  const setContrastLevel = (n) => {
    if (grayscale && n !== 0) {
      setGrayscale(false); // desactivar grayscale si se quiere contraste
    }
    setContrast(n);
  };

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      <Button
        icon="pi pi-cog"
        className={`p-button-rounded p-button-success ${styles.floatButton}`}
        onClick={() => setOpen((s) => !s)}
        tooltip="Menú de accesibilidad (Ctrl + U)"
        tooltipOptions={{ position: 'left' }}
      />

      {/* PANEL */}
      <div className={`${styles.panel} ${open ? styles.open : ''}`} role="dialog" aria-label="Menú de accesibilidad">
        <div className={styles.panelHeader}>
          <h3>Menú de Accesibilidad</h3>
          <Button icon="pi pi-times" className="p-button-rounded p-button-text" onClick={() => setOpen(false)} aria-label="Cerrar menú de accesibilidad" />
        </div>

        <div className={styles.options}>
          {/* Tamaño de texto */}
          <div className={styles.optionItem}>
            <i className="pi pi-text-height" aria-hidden="true"></i>
            <span>Tamaño de texto</span>
            <div className={styles.controls}>
              {[1, 2, 3, 4].map((n) => (
                <Button
                  key={n}
                  label={`${n}`}
                  className={`p-button-rounded ${fontSize === n ? 'p-button-success p-button-active' : 'p-button-outlined'}`}
                  onClick={() => setFontSize(n)}
                  aria-pressed={fontSize === n}
                />
              ))}
            </div>
          </div>

          {/* Contraste */}
          <div className={styles.optionItem}>
            <i className="pi pi-adjust" aria-hidden="true"></i>
            <span>Contraste</span>
            <div className={styles.controls}>
              {[0, 1, 2].map((n) => (
                <Button
                  key={n}
                  label={`${n}`}
                  className={`p-button-rounded ${contrast === n ? 'p-button-success p-button-active' : 'p-button-outlined'}`}
                  onClick={() => setContrastLevel(n)}
                  aria-pressed={contrast === n}
                />
              ))}
            </div>
          </div>

          {/* Modo oscuro */}
          <div className={styles.optionItem}>
            <i className="pi pi-moon" aria-hidden="true"></i>
            <span>Modo oscuro</span>
            <Button
              label={darkMode ? 'Desactivar' : 'Activar'}
              className={darkMode ? 'p-button-success p-button-active' : 'p-button-outlined'}
              onClick={toggleDark}
              aria-pressed={darkMode}
            />
          </div>

          {/* Daltonismo */}
          <div className={styles.optionItem}>
            <i className="pi pi-palette" aria-hidden="true"></i>
            <span>Modo daltonismo</span>
            <Button
              label={colorBlind ? 'Desactivar' : 'Activar'}
              className={colorBlind ? 'p-button-success p-button-active' : 'p-button-outlined'}
              onClick={toggleColorBlind}
              aria-pressed={colorBlind}
            />
          </div>

          {/* Escala de grises */}
          <div className={styles.optionItem}>
            <i className="pi pi-eye-slash" aria-hidden="true"></i>
            <span>Escala de grises</span>
            <Button
              label={grayscale ? 'Desactivar' : 'Activar'}
              className={grayscale ? 'p-button-success p-button-active' : 'p-button-outlined'}
              onClick={toggleGrayscale}
              aria-pressed={grayscale}
            />
          </div>

          {/* Restablecer */}
          <div className={styles.optionItem}>
            <i className="pi pi-refresh" aria-hidden="true"></i>
            <span>Restablecer configuración</span>
            <Button label="Restablecer" className="p-button-danger" onClick={resetPreferences} />
          </div>
        </div>
      </div>
    </>
  );
}
