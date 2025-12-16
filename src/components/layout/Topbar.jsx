"use client";
import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import Cookies from "js-cookie";

import { getPerfil, logoutService } from "@/services/auth/auth_service";
import styles from "./Layout.module.css";

export default function Topbar({ onToggleSidebar }) {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await getPerfil();
        setUser(data);
        console.log("Perfil cargado:", data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      }
    };

    cargarPerfil();
  }, []);

  return (
    <>
      {/* ======= TOPBAR ======= */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          padding: "0.8rem 1.5rem",
          boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* ===== Botón sidebar + título ===== */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button
            icon="pi pi-bars"
            className="p-button-rounded p-button-text p-button-plain"
            style={{ color: "#43b028", fontSize: "1.2rem" }}
            onClick={onToggleSidebar}
            tooltip="Mostrar / ocultar menú"
            tooltipOptions={{ position: "bottom" }}
          />

          <h3 style={{ margin: 0, color: "#43b028" }}>
            Sistema de Inclusión Educativa
          </h3>
        </div>

        {/* ===== Información de usuario ===== */}
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => setShowModal(true)}
        >
          <Avatar icon="pi pi-user" shape="circle" />
          <span style={{ marginLeft: "0.5rem", color: "#333" }}>
            {user ? user.persona.nombres : "Usuario"}
          </span>
        </div>
      </header>

      {/* ======= MODAL ======= */}
      <Dialog
        header="Perfil del Usuario"
        visible={showModal}
        style={{ width: "30rem" }}
        onHide={() => setShowModal(false)}
      >
        {user ? (
          <div>
            <p>
              <b>Nombre:</b> {user.persona.nombres}{" "}
              {user.persona.primer_apellido}
            </p>
            <p>
              <b>Documento:</b> {user.persona.identificacion}
            </p>
            <p>
              <b>Correo:</b> {user.persona.correo_institucional}
            </p>
            <p>
              <b>Rol:</b> {user.rol.nombre}
            </p>

            <Button
              label="Cerrar Sesión"
              severity="danger"
              className="mt-3"
              onClick={logoutService}
            />
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </Dialog>
    </>
  );
}
