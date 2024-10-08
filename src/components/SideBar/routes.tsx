import Dashboard from "../../Pages/Dashboard/Dashboard";
import { RouteType } from "./SideBar";
import Employees from "@/Pages/Employees/Employees";

const routes: RouteType[] = [
  {
    path: "/dashboard",
    icon: "HomeIcon",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/employees",
    icon: "BadgeIcon",
    name: "Employees",
    component: Employees,
  },
];

export default routes;
