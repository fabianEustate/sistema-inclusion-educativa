"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import Cookies from "js-cookie";

import { loginService, getPerfil } from "@/services/auth/auth_service";
import styles from "./Login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const validateFields = () => {
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Por favor complete todos los campos.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateFields()) return;

    setLoading(true);

    try {
      // LOGIN
      const loginResponse = await loginService(email, password);
      console.log("Datos devueltos del LOGIN:", loginResponse);

      // 🔥 Guardar tokens antes de pedir el perfil
      localStorage.setItem("accessToken", loginResponse.token_acceso);
      localStorage.setItem("refreshToken", loginResponse.token_renovacion);

      // Obtener token generado
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("No se pudo obtener el token de autenticación.");
      }

      // Guardar token en cookies (middleware lo necesita)
      Cookies.set("accessToken", token, {
        expires: remember ? 7 : 1,
        secure: true,
      });

      // Obtener datos del usuario
      const perfil = await getPerfil();
      const rol = perfil?.rol?.nombre?.toLowerCase() || "";

      console.log("Perfil cargado:", perfil);

      // Normalizar acentos
      const normalizedRol = rol.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // Guardar rol en cookies
      Cookies.set("userRole", normalizedRol, { expires: 1 });

      console.log("Usuario autenticado:", perfil);

      // Redirección por rol
      const rutas = {
        administrador: "/administrador/dashboard",
        docente: "/docente/dashboard",
        tutor: "/tutor/dashboard",
        psicologo: "/psicologo/dashboard",
      };

      if (rutas[normalizedRol]) {
        router.push(rutas[normalizedRol]);
      } else {
        setErrorMsg("El usuario no tiene un rol válido o asignado.");
      }
    } catch (error) {
      console.error("Error en login:", error);

      if (error.response?.status === 401) {
        setErrorMsg("Credenciales incorrectas.");
      } else if (error.response?.status === 500) {
        setErrorMsg("Error interno en el servidor.");
      } else {
        setErrorMsg("No se pudo conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Bienvenido a IncluSys</h2>
        <p className={styles.subtitle}>Inicie sesión para continuar</p>

        {errorMsg && (
          <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>
        )}

        <label className={styles.label} htmlFor="email">
          Usuario
        </label>
        <InputText
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Usuario"
          required
          className={styles.input}
        />

        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <Password
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          toggleMask
          feedback={false}
          placeholder="Password"
          className={styles.password}   // <-- importante
        />


        <div className={styles.options}>
          <div className={styles.remember}>
            <Checkbox
              inputId="remember"
              checked={remember}
              onChange={(e) => setRemember(e.checked)}
            />
            <label htmlFor="remember">Recordarme</label>
          </div>
          <a href="#" className={styles.link}>
            ¿Olvidó su contraseña?
          </a>
        </div>

        <Button
          label={loading ? "Iniciando..." : "Iniciar sesión"}
          loading={loading}
          className={styles.button}
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
}
