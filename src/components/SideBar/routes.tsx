import NotFound from "@/Pages/NotFound/NotFound";
import SignIn from "../../Pages/Auth/SignIn";
import SignUp from "../../Pages/Auth/SignUp";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import { RouteType } from "./SideBar";
import Employees from "@/Pages/Employees/Employees";


const routes: RouteType[] = [
    {
      path: '/dashboard',
      icon: 'HomeIcon',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/employees',
      icon: 'BadgeIcon',
      name: 'Employees',
      component: Employees
    },
    {
      path: '/login',
      name: 'Login',
      component: SignIn
    },
    {
      path: '/register',
      name: 'Create account',
      component: SignUp
    },
    {
      path: '/app/404',
      name: '404',
      component: NotFound
    }
  ];
  
  export default routes;
  