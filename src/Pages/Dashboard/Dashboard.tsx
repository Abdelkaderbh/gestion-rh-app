import React, { useContext } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import PaidIcon from "@mui/icons-material/Paid";
import SmsIcon from "@mui/icons-material/Sms";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PageTitle from "@/components/Titles/PageTitle";
import Card from "@/components/Cards/Card";
import { useAuth } from "@/hooks/useAuth";
import { useLeave } from "@/hooks/useLeave";
import { useEmployee } from "@/hooks/useEmployee";
import { useTimesheet } from "@/hooks/useTimesheet";

const capitalizeFirstLetter = (name: string | undefined) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role;
  const userName = capitalizeFirstLetter(user?.name);
  const {leaves} = useLeave();
  const {employees} = useEmployee();
  const {timesheets} = useTimesheet();

  const totalLeaves = leaves ? leaves.length : 0;
  const totalEmployees = employees ? employees.length : 0;
  const totalTimesheets = timesheets ? timesheets.length : 0;
 

  return (
    <>
      {role === "HR" ? (
        <PageTitle>
          Welcome, <b>{userName}</b>
        </PageTitle>
      ) : role === "EMPLOYEE" ? (
        <PageTitle>
          Welcome, <b>{userName}</b>
        </PageTitle>
      ) : (
        <PageTitle>Welcome to the Dashboard</PageTitle>
      )}

      {role === "HR" && (
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <Card title="Total Employees" value={totalLeaves}>
            <GroupsIcon
              component="svg"
              className="mr-4 text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
            />
          </Card>

          <Card title="Conge Demands" value={totalEmployees}>
            <PaidIcon
              component="svg"
              className="mr-4 text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500"
            />
          </Card>

          <Card title="Timesheets demand" value={totalTimesheets}>
            <ShoppingCartIcon
              component="svg"
              className="mr-4 text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
            />
          </Card>

          <Card title="Pending contacts" value="35">
            <SmsIcon
              component="svg"
              className="mr-4 text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
            />
          </Card>
        </div>
      )}
    </>
  );
};

export default Dashboard;
