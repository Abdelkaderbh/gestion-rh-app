import { useAuth } from "../../hooks/useAuth";

const Employee = () => {
    const { user } = useAuth();

    return (
        <div className="flex items-center justify-end h-screen bg-gray-50 dark:bg-gray-900">
            <div className="p-6 bg-white w-4/5 h-screen shadow-xl dark:bg-gray-800">
                <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
                    Dashboard
                </h1>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Welcome to your dashboard, {user?.name}!
                </p>
            </div>
        </div>
    );
};

export default Employee;