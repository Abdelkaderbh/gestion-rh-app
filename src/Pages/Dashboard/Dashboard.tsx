import React, { useMemo, useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Log user to check if it is being populated
  useEffect(() => {
    console.log("User data:", user);
    if (user) {
      setIsLoading(false); // User is loaded, stop loading
    } else if (!user && !isLoading) {
      setIsLoading(true); // User is not loaded yet
    }
  }, [user]);

  const role = user?.role;

  const renderContent = useMemo(() => {
    switch (role) {
      case "HR":
        return (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              HR Dashboard
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Here you can manage Employees, view Reports, and more.
            </p>
          </div>
        );
      case "EMPLOYEE":
        return (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Employee Dashboard
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Here you can view your Schedule, Holidays, and Applications.
            </p>
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              General Dashboard
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Welcome to the dashboard.
            </p>
          </div>
        );
    }
  }, [role]);

  // If loading, display loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  // If user fails to load or user is undefined
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">
          Unable to load user data. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 bg-white w-4/5 h-screen shadow-xl dark:bg-gray-800">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Welcome to your dashboard, {user.name}!
        </p>
        {renderContent}
      </div>
    </div>
  );
};

export default Dashboard;
