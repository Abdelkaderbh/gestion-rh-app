import Leave from "@/Pages/Leave/Leave";
import Evaluations from "@/Pages/Evaluation/Evaluation";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import { RouteType } from "./SideBar";
import Employees from "@/Pages/Employees/Employees";
import TimeSheet from "@/Pages/TimeSheet/Timesheet";

// Employee routes
const employeeRoutes: RouteType[] = [
  {
    path: "/dashboard",
    icon: "HomeIcon",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/conge",
    icon: "CalendarTodayIcon",
    name: "Congé",
    component: Leave,
  },
  {
    path: "/evaluation",
    icon: "CalendarTodayIcon",
    name: "evaluation",
    component: Evaluations,
  },
  {
    path: "/timesheet",
    icon: "AccessTimeIcon",
    name: "TimeSheets",
    component: TimeSheet,
  },
];

// HR routes
const hrRoutes: RouteType[] = [
  {
    path: "/dashboard",
    icon: "HomeIcon",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/gestion-employes",
    icon: "BadgeIcon",
    name: "Gestion des Employés",
    component: Employees,
  },
  {
    path: "/conge",
    icon: "CalendarTodayIcon",
    name: "Demandes de Congé",
    component: Leave,
  },
  {
    path: "/evaluation",
    icon: "AssessmentIcon",
    name: "Évaluation",
    component: Evaluations,
  },
  {
    path: "/timesheet",
    icon: "CheckCircleIcon",
    name: "TimeSheets requestes",
    component: TimeSheet,
  },
];

export { employeeRoutes, hrRoutes };
