import React, { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";

const Dashboard: React.FC = () => {
    const { user } = useAuth();
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

    return (
        <div className="flex items-center justify-end h-screen bg-gray-50 dark:bg-gray-900">
            <div className="p-6 bg-white w-4/5 h-screen shadow-xl dark:bg-gray-800">
                <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Dashboard
                </h1>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Welcome to your dashboard, {user?.name}!
                </p>
                {renderContent}
            </div>
        </div>
    );
};

export default Dashboard;