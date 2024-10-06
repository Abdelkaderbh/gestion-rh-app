import React, { useContext, Suspense, useEffect, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Main from '../../src/Containers/Main';
import routes from '@/components/SideBar/routes';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/SideBar/SideBar';
import { SidebarContext, SidebarContextType } from '@/context/SidebarContext';

const NotFound = lazy(() => import('../Pages/NotFound/NotFound'));
// const Dashboard = lazy(() => import('../Pages/Dashboard/Dashboard'));


const Layout: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext) as SidebarContextType;
  const location = useLocation();

  useEffect(() => {
    closeSidebar();
  }, [location, closeSidebar]);

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}>
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route, i) => (
                route.component ? (
                  <Route
                    key={i}
                    path={route.path}
                    element={<route.component />}
                  />
                ) : null
              ))}
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
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
