import { useState, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import { useTimesheet } from "@/hooks/useTimesheet";
import { useAuth } from "@/hooks/useAuth";

interface TimesheetFormProps {
  timesheet?: {
    id: string;
    date: string; // La date doit être en format ISO (YYYY-MM-DD)
    hoursWorked: number;
    comments?: string;
  };
  onClose: () => void;
}

type TimesheetFormData = {
  id: string;
  date: string;
  hoursWorked: number;
  comments: string;
};

const TimesheetForm: React.FC<TimesheetFormProps> = ({ timesheet, onClose }) => {
  const { addTimesheet, updateTimesheet,fetchTimesheetsByEmployee,fetchTimesheets } = useTimesheet();

  const [formData, setFormData] = useState<TimesheetFormData>({
    id: "",
    date: "",
    hoursWorked: 0,
    comments: "",
  });

  // Fonction pour s'assurer que la date est au format `YYYY-MM-DD`
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mois de 0 à 11
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

   const { user } = useAuth(); // Récupérez les informations de l'utilisateur
    const role = user?.role; // Obtenez le rôle de l'utilisateur
  
  const fetchTimesheetsData = useCallback(async () => {
      if (role === "HR") {
        // Si l'utilisateur est RH, on récupère tous les timesheets
        fetchTimesheets();
      } else if (role === "EMPLOYEE") {
        // Si l'utilisateur est un employé, on récupère uniquement ses propres timesheets
        fetchTimesheetsByEmployee();
      }
    }, [role, fetchTimesheets, fetchTimesheetsByEmployee]);
  
    useEffect(() => {
      fetchTimesheetsData(); // Appel de la fonction pour récupérer les timesheets
    }, [fetchTimesheetsData]);

  useEffect(() => {
    if (timesheet) {
      setFormData({
        id: timesheet.id,
        date: formatDate(timesheet.date), // Conversion au bon format
        hoursWorked: timesheet.hoursWorked,
        comments: timesheet.comments || "",
      });
    }
  }, [timesheet]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "hoursWorked" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (timesheet) {
        await updateTimesheet(timesheet.id, formData as any);
        fetchTimesheetsData();
      } else {
        await addTimesheet(formData as any);
        fetchTimesheetsData();
      }
      onClose();
    } catch (error) {
      console.error("Error while submitting timesheet:", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date" className="block text-sm font-medium">Date</label>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="modal-input"
          required
        />
      </div>

      <div>
        <label htmlFor="hoursWorked" className="block text-sm font-medium">Hours Worked</label>
        <input
          name="hoursWorked"
          type="number"
          value={formData.hoursWorked}
          onChange={handleChange}
          className="modal-input"
          required
          min="0"
        />
      </div>

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

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-purple-700 text-white hover:bg-white hover:text-purple-600 hover:border-2 hover:border-purple-600"
        >
          {timesheet ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
};

export default TimesheetForm;
