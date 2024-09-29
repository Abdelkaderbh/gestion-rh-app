import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";

function App() {
  return  (<div className="App">
  <Routes>
    <Route path="/login" element={<SignIn />} />
    <Route path="/register" element={<SignUp />} />
    
  </Routes>
  
</div>
);
}

export default App;
