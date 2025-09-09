import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types";

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  userRole: "employer" | "jobseeker" | "admin" | null;
  setUserRole: (role: "employer" | "jobseeker" | "admin" | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<
    "employer" | "jobseeker" | "admin" | null
  >("employer");

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
