import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ImageLight from "../../assets/img/login-office.jpeg";
import ImageDark from "../../assets/img/login-office-dark.jpg";
import { Button } from "@windmill/react-ui";
import { Input } from "@/components/ui/input";
import Alert from "@mui/material/Alert";  
import "./Alert.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null); // State for message
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null); // State for alert type

  const { login, authError } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password);
      if (authError) {
        setMessage("Login failed. Please check your credentials.");
        setAlertType("error");
        
      
        const timer = setTimeout(() => {
          setMessage(null);
          setAlertType(null);
        }, 3000);
  
        return () => clearTimeout(timer); 
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900 relative">
      {/* Afficher l'alerte en haut de la page */}
      {message && alertType && (
        <div className="slide-down">
          <Alert severity={alertType}>
            {message}
          </Alert>
        </div>
      )}

      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>

              <form onSubmit={handleSubmit}>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <Input
                    className="mt-1"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </label>
                <label className="block text-sm mt-4">
                  <span className="text-gray-700 dark:text-gray-400">
                    Password
                  </span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </label>
                <Button
                  className="mt-4 p-3 bg-purple-800 text-white hover:bg-purple-700"
                  block
                  type="submit"
                >
                  Log in
                </Button>
              </form>

              <hr className="my-8 dark:border-gray-600" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-700 dark:text-purple-500 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-700 dark:text-purple-500 hover:underline"
                  to="/register"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SignIn;