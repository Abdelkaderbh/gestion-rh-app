import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useLeave } from "@/hooks/useLeave"; // Hook to access LeaveProvider methods

interface LeaveFormProps {
  leave?: {
    id: string;
    description: string;
    type: string;
    start_date: string;
    end_date: string;
  };
  onClose: () => void;
}

const AddLeaveForm: React.FC<LeaveFormProps> = ({ leave, onClose }) => {
  const { addLeave, updateLeave } = useLeave();

  const [formData, setFormData] = useState({
    description: "",
    type: "sick",
    start_date: "",
    end_date: "",
  });

  const [errors, setErrors] = useState({
    description: "",
    type: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (leave) {
      setFormData({
        description: leave.description,
        type: leave.type,
        start_date: leave.start_date,
        end_date: leave.end_date,
      });
    }
  }, [leave]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {
      description: formData.description ? "" : "Description is required",
      type: formData.type ? "" : "Leave type is required",
      start_date: formData.start_date ? "" : "Start date is required",
      end_date: formData.end_date ? "" : "End date is required",
    };

    if (
      formData.start_date &&
      formData.end_date &&
      formData.end_date < formData.start_date
    ) {
      newErrors.end_date = "End date cannot be before start date";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (leave) {
          await updateLeave(leave.id, {
            description: formData.description,
            type: formData.type,
            start_date: formData.start_date,
            end_date: formData.end_date,
          });
        } else {
          await addLeave({
            description: formData.description,
            type: formData.type,
            start_date: formData.start_date,
            end_date: formData.end_date,
            userId: ""
          });
        }
        onClose();
      } catch (error) {
        console.error("Error submitting leave:", error);
      }
    }
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Enter leave description"
            value={formData.description}
            onChange={handleChange}
            className="modal-input"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium">
            Leave Type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="modal-input"
          >
            <option value="sick">Sick Leave</option>
            <option value="annual">Annual Leave</option>
            <option value="parental">Parental Leave</option>
            <option value="other">Other</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>

        <div>
          <label htmlFor="start_date" className="block text-sm font-medium">
            Start Date
          </label>
          <input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleChange}
            className="modal-input"
          />
          {errors.start_date && (
            <p className="text-red-500 text-sm">{errors.start_date}</p>
          )}
        </div>

        <div>
          <label htmlFor="end_date" className="block text-sm font-medium">
            End Date
          </label>
          <input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleChange}
            className="modal-input"
          />
          {errors.end_date && (
            <p className="text-red-500 text-sm">{errors.end_date}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-500 text-white">
            {leave ? "Update" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLeaveForm;
