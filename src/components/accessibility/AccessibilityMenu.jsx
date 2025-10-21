'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'primereact/button';
import styles from './AccessibilityMenu.module.css';

const STORAGE_KEY = 'accessibility_prefs';

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [fontSize, setFontSize] = useState(1); // niveles 1 a 4
  const [contrast, setContrast] = useState(0); // niveles 0 a 2
  const [darkMode, setDarkMode] = useState(false);
  const [colorBlind, setColorBlind] = useState(false);

  /* =====================
     🔹 Cargar preferencias
  ===================== */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const prefs = JSON.parse(saved);
        if (prefs.fontSize) setFontSize(prefs.fontSize);
        if (prefs.contrast !== undefined) setContrast(prefs.contrast);
        if (prefs.darkMode !== undefined) setDarkMode(prefs.darkMode);
        if (prefs.colorBlind !== undefined) setColorBlind(prefs.colorBlind);
      } catch (e) {
        console.warn('Error al leer preferencias de accesibilidad', e);
      }
    }
  }, []);

  /* =====================
     🔹 Aplicar y guardar cambios
  ===================== */
  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${100 + (fontSize - 1) * 10}%`;
    root.classList.remove('contrast-1', 'contrast-2', 'dark-mode', 'daltonic');

    if (contrast === 1) root.classList.add('contrast-1');
    if (contrast === 2) root.classList.add('contrast-2');
    if (darkMode) root.classList.add('dark-mode');
    if (colorBlind) root.classList.add('daltonic');

    // Guardar preferencias
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ fontSize, contrast, darkMode, colorBlind })
    );
  }, [fontSize, contrast, darkMode, colorBlind]);

  /* =====================
     🔹 Atajo de teclado (Ctrl + U)
  ===================== */
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

  /* =====================
     🔹 Abrir / cerrar menú
  ===================== */
  const toggleMenu = () => setOpen(!open);

  return (
    <>
      {/* ===== BOTÓN FLOTANTE ===== */}
      <Button
        icon="pi pi-cog"
        className={`p-button-rounded p-button-success ${styles.floatButton}`}
        onClick={toggleMenu}
        tooltip="Menú de accesibilidad (Ctrl + U)"
        tooltipOptions={{ position: 'left' }}
      />

      {/* ===== PANEL LATERAL ===== */}
      <div
        className={`${styles.panel} ${open ? styles.open : ''}`}
        role="dialog"
        aria-label="Menú de accesibilidad"
      >
        <div className={styles.panelHeader}>
          <h3>Menú de Accesibilidad</h3>
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-text"
            onClick={toggleMenu}
            aria-label="Cerrar menú de accesibilidad"
          />
        </div>

        <div className={styles.options}>
          {/* Aumentar tamaño de letra */}
          <div className={`accessibility-option ${styles.optionItem}`}>
            <i className="pi pi-text-height"></i>
            <span>Tamaño de texto</span>
            <div className={styles.controls}>
              {[1, 2, 3, 4].map((n) => (
                <Button
                  key={n}
                  label={`${n}`}
                  className={`p-button-rounded ${
                    fontSize === n
                      ? 'p-button-success p-button-active'
                      : 'p-button-outlined'
                  }`}
                  onClick={() => setFontSize(n)}
                  aria-pressed={fontSize === n}
                />
              ))}
            </div>
          </div>

          {/* Contraste */}
          <div className={`accessibility-option ${styles.optionItem}`}>
            <i className="pi pi-adjust"></i>
            <span>Contraste</span>
            <div className={styles.controls}>
              {[0, 1, 2].map((n) => (
                <Button
                  key={n}
                  label={`${n}`}
                  className={`p-button-rounded ${
                    contrast === n
                      ? 'p-button-success p-button-active'
                      : 'p-button-outlined'
                  }`}
                  onClick={() => setContrast(n)}
                  aria-pressed={contrast === n}
                />
              ))}
            </div>
          </div>

          {/* Modo oscuro */}
          <div className={`accessibility-option ${styles.optionItem}`}>
            <i className="pi pi-moon"></i>
            <span>Modo oscuro</span>
            <Button
              label={darkMode ? 'Desactivar' : 'Activar'}
              className={
                darkMode
                  ? 'p-button-success p-button-active'
                  : 'p-button-outlined'
              }
              onClick={() => setDarkMode(!darkMode)}
              aria-pressed={darkMode}
            />
          </div>

          {/* Daltonismo */}
          <div className={`accessibility-option ${styles.optionItem}`}>
            <i className="pi pi-palette"></i>
            <span>Modo daltonismo</span>
            <Button
              label={colorBlind ? 'Desactivar' : 'Activar'}
              className={
                colorBlind
                  ? 'p-button-success p-button-active'
                  : 'p-button-outlined'
              }
              onClick={() => setColorBlind(!colorBlind)}
              aria-pressed={colorBlind}
            />
          </div>
        </div>
      </div>
    </>
  );
}
