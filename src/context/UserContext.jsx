"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile } from "@/services/auth/user_service";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const loadUser = async () => {
    setLoadingUser(true);
    try {
      const data = await getUserProfile();
      setUser(data);
    } catch (err) {
      console.error("Error cargando perfil:", err);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    // Intentamos cargar el perfil al montar
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser, reloadUser: loadUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
