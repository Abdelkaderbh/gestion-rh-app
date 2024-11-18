import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui';

import PageTitle from '@/components/Titles/PageTitle';
import { useLeave } from '@/hooks/useLeave';  // Import the useLeave hook

const Leave: React.FC = () => {
  const [pageTable, setPageTable] = useState<number>(1);
  const { leaves, fetchLeaves, deleteLeave } = useLeave(); // Use leaves and fetchLeaves from the context

  const resultsPerPage = 10;
  const totalResults = leaves ? leaves.length : 0;  // Get the total number of leaves

  // pagination change control
  const onPageChangeTable = (p: number) => {
    setPageTable(p);
  };

  useEffect(() => {
    fetchLeaves();  // Fetch the leaves when the component mounts
  }, [fetchLeaves]);

  // Function to map status to badge types
  const getBadgeType = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'pending':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this leave?')) {
      await deleteLeave(id);
    }
  };

  return (
    <>
      <PageTitle>Leaves List</PageTitle>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Employee</TableCell>
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
                .slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage)  // Paginate the leaves
                .map((leave, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar className="hidden mr-3 md:block" src="ddd" alt="Employee avatar" />
                        <div>
                          <p className="font-semibold">{leave.employeeId}</p> {/* Replace with employee name if available */}
                          <p className="text-xs text-gray-600 dark:text-gray-400">{leave.reason}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{leave.reason}</span>
                    </TableCell>
                    <TableCell>
                      <Badge type={getBadgeType(leave.status)}>{leave.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(leave.startDate).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{new Date(leave.endDate).toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Button layout="link" size="small" aria-label="Edit">
                          <EditIcon className="w-5 h-5" aria-hidden="true" />
                        </Button>
                        <Button layout="link" size="small" aria-label="Delete" onClick={() => handleDelete(leave.id)}>
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

export default Leave;
