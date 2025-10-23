'use client';
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import styles from './Login.module.css';

export default function LoginPage() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [remember, setRemember] = useState(false);

const handleSubmit = (e) => {
e.preventDefault();
console.log('Datos de inicio de sesión:', { email, password, remember });
// Aquí luego se integrará la autenticación con Firebase o el backend
};

return (
<div className={styles.container}>

  {/* Formulario */}
  <form onSubmit={handleSubmit} className={styles.form}>
    <h2 className={styles.title}>Bienvenido al sistema de inclusión</h2>
    <p className={styles.subtitle}>Inicie sesión para continuar</p>

    <label className={styles.label} htmlFor="email">Usuario</label>
    <InputText
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email address"
      required
      className={styles.input}
    />

    <label className={styles.label} htmlFor="password">Password</label>
    <Password
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      toggleMask
      feedback={false}
      placeholder="Password"
      className={styles.password}
    />

    <div className={styles.options}>
      <div className={styles.remember}>
        <Checkbox
          inputId="remember"
          checked={remember}
          onChange={(e) => setRemember(e.checked)}
        />
        <label htmlFor="remember">Remember me</label>
      </div>
      <a href="#" className={styles.link}>Forgot password?</a>
    </div>

    <Button label="Sign In" className={styles.button} type="submit" />
  </form>
</div>


);
}