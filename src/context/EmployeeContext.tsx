import useAxios from "../hooks/useAxios";
import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

export interface Employee {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}

interface EmployeeResponse {
  employee: Omit<Employee, "password">;
}

interface EmployeesResponse {
  employees: Omit<Employee, "password">[];
}

export interface EmployeeContextType {
  employees: Omit<Employee, "password">[] | null;
  addEmployee: (employee: Omit<Employee, "role" | "password">) => Promise<void>;
  updateEmployee: (
    id: string,
    updatedEmployee: Partial<Omit<Employee, "role" | "password">>
  ) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  fetchEmployees: () => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

interface EmployeeProviderProps {
  children: ReactNode;
}

export const EmployeeProvider: React.FC<EmployeeProviderProps> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<
    Omit<Employee, "password">[] | null
  >(null);

  const { sendRequest } = useAxios<EmployeesResponse>();

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await sendRequest({
        url: "/api/employees/all",
        method: "GET",
      });
      if (response) {
        setEmployees(response.employees);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  }, [sendRequest]);

  const { sendRequest: sendSingleRequest } = useAxios<EmployeeResponse>();

  const addEmployee = useCallback(
    async (newEmployee: Omit<Employee, "role" | "password">) => {
      try {
        const response = await sendSingleRequest({
          url: "/api/employees/addEmployee",
          method: "POST",
          data: { ...newEmployee, role: "EMPLOYEE" },
        });
        if (response) {
          await fetchEmployees();
        }
      } catch (err) {
        console.error("Error adding employee:", err);
      }
    },
    [sendSingleRequest, fetchEmployees]
  );

  const updateEmployee = useCallback(
    async (
      id: string,
      updatedEmployee: Partial<Omit<Employee, "role" | "password">>
    ) => {
      try {
        await sendSingleRequest({
          url: `/api/employees/update/${id}`,
          method: "PUT",
          data: updatedEmployee,
        });
        await fetchEmployees();
      } catch (err) {
        console.error("Error updating employee:", err);
      }
    },
    [sendSingleRequest, fetchEmployees]
  );

  const deleteEmployee = useCallback(
    async (id: string) => {
      try {
        await sendSingleRequest({
          url: `/api/employees/delete/${id}`,
          method: "DELETE",
        });
        await fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err);
      }
    },
    [sendSingleRequest, fetchEmployees]
  );

  const value = useMemo(
    () => ({
      employees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      fetchEmployees,
    }),
    [employees, addEmployee, updateEmployee, deleteEmployee, fetchEmployees]
  );

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;
