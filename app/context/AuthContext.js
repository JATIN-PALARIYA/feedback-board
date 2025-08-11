// app/context/AuthContext.js
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // restore stored user if any (you said you want to control persistence separately)
    const raw = localStorage.getItem('user');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { localStorage.removeItem('user'); }
    }
  }, []);

  const login = (u, { persist = true } = {}) => {
    if (persist) localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
