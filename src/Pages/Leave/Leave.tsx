import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Button,
  Pagination,
} from "@windmill/react-ui";
import TransitionsModal from "@/components/Modal/Modal";
import PageTitle from "@/components/Titles/PageTitle";
import { useLeave } from "@/hooks/useLeave";
import { useAuth } from "@/hooks/useAuth";
import AddLeaveForm from "@/components/AddLeaveForm/AddLeaveForm";

const Leave: React.FC = () => {
  const [pageTable, setPageTable] = useState<number>(1);
  const {
    leaves,
    fetchLeaves,
    fetchLeaveByEmployee,
    deleteLeave,
    addLeave,
    updateLeaveStatus,
  } = useLeave();
  const { role } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [temporaryStatus, setTemporaryStatus] = useState<string | null>(null);

  const [modalContent, setModalContent] = useState<{
    title: string;
    body: string | React.ReactNode;
    confirmAction?: () => void;
  }>({ title: "", body: "" });

  const resultsPerPage = 10;
  const totalResults = leaves ? leaves.length : 0;

  const onPageChangeTable = (p: number) => {
    setPageTable(p);
  };

  useEffect(() => {
    if (role === "HR") {
      fetchLeaves();
    } else {
      fetchLeaveByEmployee();
    }
  }, [fetchLeaves, fetchLeaveByEmployee, role]);

  const getBadgeClass = (status: string | undefined) => {
    if (!status) return "bg-gray-300 text-black";

    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const handleStartEditing = (leaveId: string, currentStatus: string) => {
    setEditingStatusId(leaveId);
    setTemporaryStatus(currentStatus);
  };

  const handleCancelEditing = () => {
    setEditingStatusId(null);
    setTemporaryStatus(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent({ title: "", body: "" });
  };

  const handleSaveStatus = async (leaveId: string) => {
    if (temporaryStatus) {
      await updateLeaveStatus(
        leaveId,
        temporaryStatus as "Accepted" | "Rejected" | "Pending"
      );
      setEditingStatusId(null);
      setTemporaryStatus(null);
    }
  };

  const handleOpenAddLeaveModal = () => {
    setModalContent({
      title: "Add new leave request",
      body: <AddLeaveForm onSave={handleAddLeave} onClose={handleCloseModal} />,
    });
    setOpenModal(true);
  };


  const handleAddLeave = async (leaveData: any) => {
    await addLeave(leaveData);
    handleCloseModal();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <PageTitle>Leaves List</PageTitle>
        {role === "EMPLOYEE" && (
          <Button
            size="small"
            icon={AddIcon}
            layout="outline"
            onClick={handleOpenAddLeaveModal}
          >
            Add Leave
          </Button>
        )}
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              {role === "HR" && <TableCell>Employee</TableCell>}{" "}
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {leaves &&
              leaves
                .slice(
                  (pageTable - 1) * resultsPerPage,
                  pageTable * resultsPerPage
                )
                .map((leave, i) => (
                  <TableRow key={i}>
                    {role === "HR" && (
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <p className="font-semibold">{leave.employeeName}</p>
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <span className="text-sm">{leave.conge.type}</span>
                    </TableCell>
                    <TableCell>
                      {editingStatusId === leave.conge.id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={temporaryStatus || leave.conge.status}
                            onChange={(e) => setTemporaryStatus(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <CheckCircleIcon
                            onClick={() => handleSaveStatus(leave.conge.id)}
                            className="cursor-pointer text-green-500"
                          />
                          <CancelIcon
                            onClick={handleCancelEditing}
                            className="cursor-pointer text-red-500"
                          />
                        </div>
                      ) : (
                        <Badge
                          className={getBadgeClass(leave.conge.status)}
                          onClick={() =>
                            role === "HR" &&
                            handleStartEditing(
                              leave.conge.id,
                              leave.conge.status
                            )
                          }
                        >
                          {leave.conge.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(leave.conge.start_date).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(leave.conge.end_date).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        {role === "HR" && (
                          <Button
                            layout="link"
                            size="small"
                            aria-label="Edit Status"
                            onClick={() =>
                              handleStartEditing(
                                leave.conge.id,
                                leave.conge.status
                              )
                            }
                          >
                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                          </Button>
                        )}
                        {role !== "HR" && (
                          <Button
                            layout="link"
                            size="small"
                            aria-label="Delete"
                            onClick={() => deleteLeave(leave.id)}
                          >
                            <DeleteIcon
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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
      {openModal && (
        <TransitionsModal open={openModal} handleClose={handleCloseModal}>
          <div>
            <h3>{modalContent.title}</h3>
            {modalContent.body}
          </div>
        </TransitionsModal>
      )}
    </>
  );
};

export default Leave;
