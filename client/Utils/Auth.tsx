"use client";

import { UserType } from "@/redux/services/types-service";
import { useLoadUserQuery } from "@/redux/services/UserAPI";
import React, { useEffect, useState, createContext, useContext } from "react";

interface AuthProviderType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | undefined;
}

const AuthProviderContext = createContext<AuthProviderType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useLoadUserQuery();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (data?.success) {
      setIsAuthenticated(true);
    }
  }, [data]);

  // console.log({ data, isAuthenticated });

  return (
    <AuthProviderContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user: data?.user }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthProviderContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
