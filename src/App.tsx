import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import { SidebarProvider } from "./context/SidebarContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./Containers/Layout";

function App() {
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
        <Route path="/" element={<Navigate to="/login" />} />

      </Routes>
    </div>
  );
}

export default App;
