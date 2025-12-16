"use client";
import React from "react";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const [activeView, setActiveView] = React.useState("general");

  const dashboards = {
    general:
      "https://app.powerbi.com/reportEmbed?reportId=6ce70a46-41f9-4ace-b43d-1bce4ae0fa21&autoAuth=true&ctid=e2bf1c48-1dae-47ba-9808-67da61e2588d&pageName=fe58b6918ca915d895b8&navContentPaneEnabled=false&pageView=fitToPage&filterPaneEnabled=false",
    alumno:
      "https://app.powerbi.com/reportEmbed?reportId=6ce70a46-41f9-4ace-b43d-1bce4ae0fa21&autoAuth=true&ctid=e2bf1c48-1dae-47ba-9808-67da61e2588d&pageName=8cec3880d78bfbc531c9&navContentPaneEnabled=false&pageView=fitToPage&filterPaneEnabled=false",
    docente:
      "https://app.powerbi.com/reportEmbed?reportId=6ce70a46-41f9-4ace-b43d-1bce4ae0fa21&autoAuth=true&ctid=e2bf1c48-1dae-47ba-9808-67da61e2588d&pageName=5d4d1ae540fd5d9ca6a0&navContentPaneEnabled=false&pageView=fitToPage&filterPaneEnabled=false",
    evento:
      "https://app.powerbi.com/reportEmbed?reportId=6ce70a46-41f9-4ace-b43d-1bce4ae0fa21&autoAuth=true&ctid=e2bf1c48-1dae-47ba-9808-67da61e2588d&pageName=1a327232f9244e553d73&navContentPaneEnabled=false&pageView=fitToPage&filterPaneEnabled=false",
  };

  const views = [
    { id: "general", label: "General" },
    { id: "alumno", label: "Alumno" },
    { id: "docente", label: "Docente" },
    { id: "evento", label: "Evento" },
  ];

  const openPrintWindow = () => {
    const url = dashboards[activeView];

    const printHTML = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Imprimir Dashboard - ${activeView}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            overflow: hidden;
            background-color: #f5f5f5;
          }
          .controls {
            background-color: #ffffff;
            padding: 1rem 1.5rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
          }
          .print-btn {
            background-color: #43b028;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
          }
          .print-btn:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }
          .dashboard-container {
            width: 100vw;
            height: calc(100vh - 80px);
            background: white;
          }
          iframe { width: 100%; height: 100%; border: none; display: block; }
          @media print { .controls { display: none !important; } body { margin:0; padding:0 } }
        </style>
      </head>
      <body>
        <div class="controls">
          <div>
            <h3>📊 Dashboard: <span>${activeView}</span></h3>
            <p id="status">⏳ Cargando dashboard...</p>
          </div>
          <button id="printBtn" class="print-btn" disabled>🖨️ Imprimir</button>
        </div>

        <div class="dashboard-container">
          <iframe src="${url}" id="dashboardFrame" allowfullscreen></iframe>
        </div>

        <script>
          (function() {
            const printBtn = document.getElementById('printBtn');
            const status = document.getElementById('status');
            let afterPrintFired = false;

            setTimeout(() => {
              printBtn.disabled = false;
              status.textContent = '✅ Listo para imprimir.';
            }, 3000);

            printBtn.addEventListener('click', () => {
              try {
                window.focus();
                window.print();

                setTimeout(() => {
                  if (!afterPrintFired) {
                    window.close();
                  }
                }, 2000);
              } catch (err) {
                console.error('Error al imprimir:', err);
                window.close();
              }
            });

            function handleAfterPrint() {
              afterPrintFired = true;
              setTimeout(() => window.close(), 300);
            }

            if ("onafterprint" in window) {
              window.addEventListener("afterprint", handleAfterPrint);
            }
          })();
        </script>
      </body>
      </html>
    `;

    const printWindow = window.open(
      "",
      "PrintDashboard",
      "width=1400,height=900,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes"
    );

    if (!printWindow) {
      alert("⚠️ Debes permitir ventanas emergentes para imprimir.");
      return;
    }

    printWindow.document.write(printHTML);
    printWindow.document.close();
    printWindow.focus();
  };

  return (
    <div className={styles.dashboard}>
      <nav className={styles.viewSelector}>
        {views.map((view) => (
          <button
            key={view.id}
            className={`${styles.viewButton} ${
              activeView === view.id ? styles.active : ""
            }`}
            onClick={() => setActiveView(view.id)}
          >
            {view.label}
          </button>
        ))}
      </nav>

      <div className={styles.dashboardContent}>
        <iframe
          key={activeView}
          title={`${activeView} - Análisis Software Inclusivo`}
          src={dashboards[activeView]}
          allowFullScreen
        />
      </div>

      {/* BOTÓN A LA IZQUIERDA */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <button
          onClick={openPrintWindow}
          style={{
            padding: "10px 20px",
            backgroundColor: "#43b028",
            color: "white",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          🖨️ Imprimir Dashboard
        </button>
      </div>
    </div>
  );
}