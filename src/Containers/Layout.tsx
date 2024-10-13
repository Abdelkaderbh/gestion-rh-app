import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Main from "../../src/Containers/Main";
import { employeeRoutes, hrRoutes } from "@/components/SideBar/routes";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/SideBar/SideBar";
import { SidebarContext, SidebarContextType } from "@/context/SidebarContext";
import { useAuth } from "@/hooks/useAuth";

const NotFound = lazy(() => import("../Pages/NotFound/NotFound"));

const Layout: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useContext(
    SidebarContext
  ) as SidebarContextType;
  const location = useLocation();
  const { user } = useAuth();
  const role = user?.role || "EMPLOYEE";

  useEffect(() => {
    closeSidebar();
  }, [location, closeSidebar]);

  const routes = role === "HR" ? hrRoutes : employeeRoutes;

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
        isSidebarOpen && "overflow-hidden"
      }`}
    >
      <Sidebar role={role} />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route, i) =>
                route.component ? (
                  <Route
                    key={i}
                    path={route.path}
                    element={<route.component />}
                  />
                ) : null
              )}
              <Route path="/app" element={<Navigate to="/app/dashboard" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Main>
      </div>
    </div>
  );
};

export default Layout;
