import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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

const Employees: React.FC = () => {
  const [pageTable, setPageTable] = useState<number>(1);
  const { employees, fetchEmployees, deleteEmployee } = useEmployee();

  const resultsPerPage = 10;
  const totalResults = employees ? employees.length : 0;

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const onPageChangeTable = (p: number) => {
    setPageTable(p);
  };

  const handleDelete = async (id: string) => {
    await deleteEmployee(id);
  };

  const displayedEmployees = employees
    ? employees.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage
      )
    : [];

  return (
    <>
      <PageTitle>Employees List</PageTitle>

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
                    <Button layout="link" size="small" aria-label="Edit">
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
    </>
  );
};

export default Employees;
