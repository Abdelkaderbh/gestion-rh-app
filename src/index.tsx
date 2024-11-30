import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import DarkModeToggle from "./components/DarkModeToggle.tsx";
import { EmployeeProvider } from "./context/EmployeeContext.tsx";
import { LeaveProvider } from "./context/LeaveContext.tsx";
import { NotificationProvider } from "@/context/NotificationContext.tsx";
import { EvaluationProvider } from "./context/EvaluationContex.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <LeaveProvider>
            <DarkModeToggle />
            <EmployeeProvider>
              <App />
            </EmployeeProvider>
          </LeaveProvider>
        <NotificationProvider>
          <DarkModeToggle />
          <EmployeeProvider>
            <EvaluationProvider>
            <App />
            </EvaluationProvider>
          </EmployeeProvider>
          </NotificationProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
