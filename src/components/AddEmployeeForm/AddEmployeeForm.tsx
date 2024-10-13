import { useState, useEffect } from "react";
import { useEmployee } from "@/hooks/useEmployee";
import { Button } from "../ui/button";

interface EmployeeFormProps {
  employee?: {
    id: string;
    fullName: string;
    email: string;
  };
  onClose: () => void; 
}

const AddEmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onClose }) => {
  const { addEmployee, updateEmployee } = useEmployee();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  useEffect(() => {
    if (employee) {
      // If employee prop is passed, populate form data for editing
      setFormData({
        fullName: employee.fullName,
        email: employee.email,
      });
    }
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email) {
      const newEmployee = {
        name: formData.fullName,
        email: formData.email,
        password: "azerty1234",
      };

      if (employee) {
        await updateEmployee(employee.id, newEmployee);
      } else {
        await addEmployee(newEmployee);
      }
      onClose();
    } else {
      console.error("All fields are required.");
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter employee's full name"
            value={formData.fullName}
            onChange={handleChange}
            className="modal-input"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter employee's email"
            value={formData.email}
            onChange={handleChange}
            className="modal-input"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-500 text-white">
            {employee ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
