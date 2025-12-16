"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Redirección directa sin validar credenciales
    router.push("/administrador/dashboard");
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
