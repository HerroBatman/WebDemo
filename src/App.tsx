import React, { useState } from "react";
import { UserType } from "./types";
import LandingPage from "./components/LandingPage";
import WorkerDashboard from "./components/worker/WorkerDashboard";
import EmployerDashboard from "./components/employer/EmployerDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const handleLogin = (userType: UserType, id: string) => {
    setCurrentUser(userType);
    setUserId(id);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserId(null);
  };

  if (!currentUser) {
    return <LandingPage onLogin={handleLogin} />;
  }

  switch (currentUser) {
    case "worker":
      return <WorkerDashboard userId={userId!} onLogout={handleLogout} />;
    case "employer":
      return <EmployerDashboard userId={userId!} onLogout={handleLogout} />;
    case "admin":
      return <AdminDashboard onLogout={handleLogout} />;
    default:
      return <LandingPage onLogin={handleLogin} />;
  }
}

export default App;
