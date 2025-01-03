import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import { SidebarProvider } from "./context/SidebarContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./Containers/Layout";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/app/*"
            element={
              <SidebarProvider>
                <Layout />
              </SidebarProvider>
            }
          />
        </Route>
        {!token ? (
          <Route path="/" element={<Navigate to="/login" />} />
        ) : (
          <Route path="/" element={<Navigate to="/app/dashboard" />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
