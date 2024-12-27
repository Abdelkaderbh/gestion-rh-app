import React, { useState, useEffect } from "react";
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
import { useAuth } from "@/hooks/useAuth";
import { useEvaluation } from "@/hooks/useEvaluation";
import TransitionsModal from "@/components/Modal/Modal";
import EvaluationForm from "@/components/EvaluationForm/EvaluationForm";
import { Evaluation } from "@/context/EvaluationContex";

const Evaluations: React.FC = () => {
  const [pageTable, setPageTable] = useState<number>(1);
  const { user } = useAuth();
  const role = user?.role; // Determine the user's role
  const { evaluations, fetchEvaluations, fetchEvaluationsByEmployee, deleteEvaluation } = useEvaluation();

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; body: React.ReactNode; confirmAction?: () => void }>({ title: "", body: "" });

  const resultsPerPage = 10;
  const totalResults = evaluations ? evaluations.length : 0;

  useEffect(() => {
    if (role === "HR") {
      fetchEvaluations();
    } else {
      fetchEvaluationsByEmployee();
    }
  }, [fetchEvaluations, fetchEvaluationsByEmployee, role]);

  const onPageChangeTable = (p: number) => {
    setPageTable(p);
  };

  const handleDelete = async (id: string) => {
    setModalContent({
      title: "Confirm Deletion",
      body: "Are you sure you want to delete this evaluation?",
      confirmAction: async () => {
        await deleteEvaluation(id);
        fetchEvaluations();
        handleCloseModal();
      },
    });
    setOpenModal(true);
  };

  const handleOpenModal = (evaluation?: Evaluation) => {
    setModalContent({
      title: evaluation ? "Edit Evaluation" : "Add Evaluation",
      body: (
        <EvaluationForm
          evaluation={evaluation}
          onClose={handleCloseModal}
        />
      ),
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const displayedEvaluations = evaluations && evaluations.length > 0
    ? evaluations.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage)
    : [];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <PageTitle>Evaluations List</PageTitle>
        {role === "HR" && (
          <Button
            size="small"
            className="border-1 border-purple-600 bg-white text-purple-600 hover:bg-purple-700 hover:text-white"
            icon={AddIcon}
            layout="outline"
            onClick={() => handleOpenModal()}
          >
            Add Evaluation
          </Button>
        )}
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Employee Name</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Evaluation Date</TableCell>
              {role === "HR" && <TableCell>Actions</TableCell>}
            </tr>
          </TableHeader>
          <TableBody>
            {displayedEvaluations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={role === "HR" ? 5 : 4} className="text-center">
                  No evaluations found.
                </TableCell>
              </TableRow>
            ) : (
              displayedEvaluations.map((evaluation) => (
                <TableRow key={evaluation.id}>
                  <TableCell>{evaluation.employeeName}</TableCell>
                  <TableCell>{evaluation.score}</TableCell>
                  <TableCell>{evaluation.comments}</TableCell>
                  <TableCell>{evaluation.evaluationDate ? new Date(evaluation.evaluationDate).toLocaleDateString() : ""}</TableCell>
                  {role === "HR" && (
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button layout="link" size="small" aria-label="Edit" onClick={() => handleOpenModal(evaluation)}>
                          <EditIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="small" aria-label="Delete" onClick={() => handleDelete(evaluation.id)}>
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
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
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

export default Evaluations;
