import Dashboard from "../../Pages/Dashboard/Dashboard";
import { RouteType } from "./SideBar";
import Employees from "@/Pages/Employees/Employees";

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
    //component: Conges,
  },
  {
    path: "/feuille-de-temps",
    icon: "AccessTimeIcon",
    name: "Feuille de Temps",
    //component: FeuilleDeTemps,
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
    icon: "ManageAccounts",
    name: "Gestion des Employés",
    component: Employees,
  },
  {
    path: "/conge",
    icon: "CalendarTodayIcon",
    name: "Demandes de Congé",
    //component: Conges,
  },
  {
    path: "/evaluation",
    icon: "AssessmentIcon",
    name: "Évaluation",
    // component: Evaluation,
  },
  {
    path: "/confirmation-feuille-de-temps",
    icon: "CheckCircleIcon",
    name: "Demandes des Feuilles de Temps",
    //component: ConfirmationFeuilleDeTemps,
  },
];

export { employeeRoutes, hrRoutes };
