import Dashboard from "../../Pages/Dashboard/Dashboard";
import { RouteType } from "./SideBar";


const routes: RouteType[] = [
    {
      path: '/dashboard',
      icon: 'HomeIcon',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/employees',
      icon: 'DescriptionIcon', 
      name: 'Employees',
      component: Dashboard
    },
]
  
  export default routes;
  