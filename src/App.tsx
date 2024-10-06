import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import Layout from "./Containers/Layout"; // Assurez-vous que Layout est importé correctement
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        
       
        <Route 
          path="/app/*" 
          element={
            <SidebarProvider>  
              <Layout />
            </SidebarProvider>
          } 
        />
        
        
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
