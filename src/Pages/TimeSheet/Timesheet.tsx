import React, { useState, useEffect, useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from "@windmill/react-ui";
import PageTitle from "@/components/Titles/PageTitle";
import { useTimesheet } from "@/hooks/useTimesheet";
import TransitionsModal from "@/components/Modal/Modal";
import TimesheetForm from "@/components/TimesheetForm/TimesheetForm";
import { Timesheet } from "@/context/TimeSheetContext";
import { useAuth } from "@/hooks/useAuth"; // Importez le hook pour l'authentification

const TimeSheet: React.FC = () => {
  const [pageTable, setPageTable] = useState<number>(1);
  const { timesheets, fetchTimesheets,fetchTimesheetsByEmployee, deleteTimesheet, validateTimesheet } = useTimesheet(); // Inclure validateTimesheet

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; body: React.ReactNode; confirmAction?: () => void }>({ title: "", body: "" });

  const { user } = useAuth(); // Récupérez les informations de l'utilisateur
  const role = user?.role; // Obtenez le rôle de l'utilisateur

  const resultsPerPage = 10;
  const totalResults = timesheets ? timesheets.length : 0;

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

  const onPageChangeTable = (p: number) => {
    setPageTable(p);
  };

  const handleDelete = (id: string) => {
    setModalContent({
      title: "Confirm Deletion",
      body: "Are you sure you want to delete this timesheet?",
      confirmAction: async () => {
        await deleteTimesheet(id);
        fetchTimesheetsData();
        handleCloseModal();
      },
    });
    setOpenModal(true);
  };

  const handleOpenModal = (timesheet?: Timesheet) => {
    setModalContent({
      title: timesheet ? "Edit TimeSheet" : "Add TimeSheet",
      body: (
        <TimesheetForm
          timesheet={timesheet}
          onClose={handleCloseModal}
        />
      ),
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleStatusChangeWithConfirmation = (id: string, status: string) => {
    setModalContent({
      title: "Confirm Status Change",
      body: `Are you sure you want to change the status to "${status}"?`,
      confirmAction: async () => {
        await validateTimesheet(id, status); // Appeler la fonction pour valider (approuver) le timesheet
        fetchTimesheetsData();
        handleCloseModal();
      },
    });
    setOpenModal(true);
  };

  const displayedTimesheets = timesheets && timesheets.length > 0
    ? timesheets.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage)
    : [];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <PageTitle>Timesheet</PageTitle>
        {role !== "HR" && ( // Cachez le bouton si le rôle est "HR"
          <Button
            size="small"
            className="border-1 border-purple-600 bg-white text-purple-600 hover:bg-purple-700 hover:text-white"
            icon={AddIcon}
            layout="outline"
            onClick={() => handleOpenModal()}
          >
            Add TimeSheet
          </Button>
        )}
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              {role !== "EMPLOYEE" && <TableCell>Employee Name</TableCell>} {/* Cachez la colonne Employee Name si le rôle est EMPLOYEE */}
              <TableCell>Date</TableCell>
              <TableCell>Hours Worked</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Status</TableCell>
              {role !== "HR" && <TableCell>Actions</TableCell>} {/* Cachez la colonne Actions si le rôle est HR */}
            </tr>
          </TableHeader>
          <TableBody>
            {displayedTimesheets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={role !== "HR" ? 6 : 5} className="text-center">No time entries found.</TableCell>
              </TableRow>
            ) : (
              displayedTimesheets.map((timesheet) => (
                <TableRow key={timesheet.id}>
                  {role !== "EMPLOYEE" && <TableCell>{timesheet.employeeName}</TableCell>} {/* Cachez la cellule Employee Name si le rôle est EMPLOYEE */}
                  <TableCell>{new Date(timesheet.date).toLocaleDateString()}</TableCell>
                  <TableCell>{timesheet.hoursWorked}</TableCell>
                  <TableCell>{timesheet.comments}</TableCell>
                  <TableCell>
                    {role === "HR" ? (
                      <select
                        value={timesheet.status}
                        onChange={(e) => handleStatusChangeWithConfirmation(timesheet.id, e.target.value)}
                        className={`${
                          timesheet.status === "Pending" ? "bg-yellow-500" :
                          timesheet.status === "Accepted" ? "bg-green-500" :
                          timesheet.status === "Rejected" ? "bg-red-500" : ""
                        } text-white p-1 rounded`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : (
                      timesheet.status
                    )}
                  </TableCell>
                  {role !== "HR" && (
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button layout="link" size="small" aria-label="Edit" onClick={() => handleOpenModal(timesheet)}>
                          <EditIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="small" aria-label="Delete" onClick={() => handleDelete(timesheet.id)}>
                          <DeleteIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination totalResults={totalResults} resultsPerPage={resultsPerPage} onChange={onPageChangeTable} label="Table navigation" />
        </TableFooter>
      </TableContainer>

      <TransitionsModal open={openModal} handleClose={handleCloseModal} title={modalContent.title}>
        {modalContent.body}
        {modalContent.confirmAction && (
          <div className="mt-4 flex justify-end space-x-2">
            <Button layout="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button className="bg-red-600 text-white hover:bg-red-700" onClick={modalContent.confirmAction}>
              Confirm
            </Button>
          </div>
        )}
      </TransitionsModal>
    </>
  );
};

export default TimeSheet;
