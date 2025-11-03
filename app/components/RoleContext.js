"use client";
import { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  // ✅ Default user (for now) so Sidebar appears
  const [user, setUser] = useState({
    role: "Admin",
    name: "Demo User",
  });

  return (
    <RoleContext.Provider value={{ user, setUser }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
