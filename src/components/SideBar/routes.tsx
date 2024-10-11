import Leave from "@/Pages/Leave/Leave";
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
  {
    path: "/leave",
    icon: "ContactMailIcon",
    name: "Leave",
    component: Leave,
  },
];

export default routes;
