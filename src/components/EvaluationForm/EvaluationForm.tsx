import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useEvaluation } from "@/hooks/useEvaluation";
import { useEmployee } from "@/hooks/useEmployee";
import { Employee } from "@/context/EmployeeContext";


interface EvaluationFormProps {
  evaluation?: {
    id: string;
    employeeId: string;
    employeeName: string;
    score: number;
    comments?: string;
  };
  onClose: () => void;
}

const AddEvaluationForm: React.FC<EvaluationFormProps> = ({ evaluation, onClose }) => {
  const { addEvaluation, updateEvaluation } = useEvaluation();
  const { employees, fetchEmployees } = useEmployee();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: "",
    employeeId: "",
    employeeName: "",
    score: 0,
    comments: "",
  });

  // Load employees on component mount
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        await fetchEmployees(); // Fetch employees via context
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, [fetchEmployees]);

  // Load evaluation data after employees are loaded
  useEffect(() => {
    if (evaluation && employees && employees.length > 0) {
      setFormData({
        id: evaluation.id,
        employeeId: evaluation.employeeId,
        employeeName: evaluation.employeeName,
        score: evaluation.score,
        comments: evaluation.comments || "",
      });
    }
  }, [evaluation, employees]);

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "score" ? Number(value) : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (evaluation) {
        await updateEvaluation(evaluation.id, formData);
      } else {
        await addEvaluation(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error while submitting evaluation:", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="employeeId" className="block text-sm font-medium">Employee</label>
        {loading ? (
          <p>Loading employees...</p>
        ) : employees && employees.length > 0 ? (
          <select
            name="employeeId"
            className="modal-input"
            value={formData.employeeId}
            onChange={handleChange}
            required
          >
            <option value="">Select an employee</option>
            {employees.map((employee: Employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        ) : (
          <p>No employees found.</p>
        )}
      </div>

      {/* Score Field */}
      <div>
        <label htmlFor="score" className="block text-sm font-medium">Score</label>
        <input
          name="score"
          type="number"
          value={formData.score}
          onChange={handleChange}
          className="modal-input"
          required
          min="0"
          max="100"
        />
      </div>

      {/* Comments Field */}
      <div>
        <label htmlFor="comments" className="block text-sm font-medium">Comments</label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          className="modal-input"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
  <Button
    type="submit"
    className="bg-purple-700 text-white hover:bg-white hover:text-purple-600 hover:border-2 hover:border-purple-600"
  >
    {evaluation ? "Update" : "Save"}
  </Button>
</div>

    </form>
  );
};

export default AddEvaluationForm;