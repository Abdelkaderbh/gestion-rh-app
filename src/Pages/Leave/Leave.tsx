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

  const resultsPerPage = 10;
  const totalResults = leaves ? leaves.length : 0;

  const [modalContent, setModalContent] = useState<{
    title: string;
    body: string | React.ReactNode;
    confirmAction?: () => void;
  }>({ title: "", body: "" });

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

  const getBadgeType = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "success";
      case "rejected":
        return "danger";
      case "pending":
        return "warning";
      default:
        return "neutral";
    }
  };

  const handleOpenStatusModal = (leave: Leave) => {
    setModalContent({
      title: 'Update Status for this Leave',
      body: (
        <TableCell>
          <div className="flex items-center space-x-4">
            {role === "HR" ? (
              <select
                value={leave.status}
                onChange={(e) =>
                  updateLeaveStatus(leave.id, e.target.value as Leave["status"])
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            ) : (
              <Button
                layout="link"
                size="small"
                aria-label="Delete"
                onClick={() => handleDelete(leave.id)}
              >
                <DeleteIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            )}
          </div>
        </TableCell>
      ),
    });
    setOpenModal(true);
  };

  const handleUpdateStatus = async (
    id: string,
    status: "Accepted" | "Rejected"
  ) => {
    await updateLeaveStatus(id, status);
    handleCloseModal();
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

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLeave(null);
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
              {role === "HR" && <TableCell>Employee</TableCell>}
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
                          <div>
                            <p className="font-semibold">{leave.userId}</p>
                          </div>
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <span className="text-sm">{leave.type}</span>
                    </TableCell>
                    <TableCell>
                      <Badge type={getBadgeType(leave.status)}>
                        {leave.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(leave.start_date).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(leave.end_date).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        {role === "HR" && (
                          <Button
                            layout="link"
                            size="small"
                            aria-label="Edit Status"
                            onClick={() => handleOpenStatusModal(leave)}
                          >
                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                          </Button>
                        )}
                        {role !== "HR" && (
                          <Button
                            layout="link"
                            size="small"
                            aria-label="Delete"
                            onClick={() => handleDelete(leave.id)}
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

      <TransitionsModal
        open={openModal}
        handleClose={handleCloseModal}
        title={modalContent.title}
      >
        {modalContent.body}
      </TransitionsModal>
    </>
  );
};

export default Leave;
