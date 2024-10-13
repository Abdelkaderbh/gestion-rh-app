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
import { useEmployee } from "@/hooks/useEmployee";
import TransitionsModal from "@/components/Modal/Modal";
import AddEmployeeForm from "@/components/AddEmployeeForm/AddEmployeeForm";

const Employees: React.FC = () => {
  const [pageTable, setPageTable] = useState<number>(1);
  const { employees, fetchEmployees, deleteEmployee } = useEmployee();
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: string;
    fullName: string;
    email: string;
  } | null>(null);
  const [modalContent, setModalContent] = useState<{
    title: string;
    body: string | React.ReactNode;
    confirmAction?: () => void;
  }>({ title: "", body: "" });

  const resultsPerPage = 10;
  const totalResults = employees ? employees.length : 0;

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const onPageChangeTable = (p: number) => {
    setPageTable(p);
  };

  const handleDelete = async (id: string) => {
    setModalContent({
      title: "Confirm Deletion",
      body: "Are you sure you want to delete this employee?",
      confirmAction: async () => {
        await deleteEmployee(id);
        handleCloseModal(); // Close modal after deletion
      },
    });
    setOpenModal(true);
  };

  const handleOpenModal = (employee?: {
    id: string;
    fullName: string;
    email: string;
  }) => {
    setSelectedEmployee(employee || null);
    setModalContent({
      title: employee ? "Edit Employee" : "Add Employee",
      body: (
        <AddEmployeeForm
          employee={employee} // Pass the employee for editing
          onClose={handleCloseModal} // Close modal on save
        />
      ),
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEmployee(null); // Reset selected employee when modal closes
  };

  const displayedEmployees = employees
    ? employees.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    : [];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <PageTitle>Employees List</PageTitle>
        <Button
          size="small"
          icon={AddIcon}
          layout="outline"
          onClick={() => handleOpenModal()}
        >
          Add Employee
        </Button>
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Full Name </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {displayedEmployees.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {user.email}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() =>
                        handleOpenModal({
                          id: user.id,
                          fullName: user.name,
                          email: user.email,
                        })
                      }
                    >
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
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
        {modalContent.confirmAction && (
          <div className="mt-4 flex justify-end space-x-2">
            <Button layout="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700 focus:outline-none"
              onClick={modalContent.confirmAction}
              layout="outline"
            >
              Confirm
            </Button>
          </div>
        )}
      </TransitionsModal>
    </>
  );
};

export default Employees;
