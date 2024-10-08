import NotFound from "@/Pages/NotFound/NotFound";
import SignIn from "../../Pages/Auth/SignIn";
import SignUp from "../../Pages/Auth/SignUp";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import { RouteType } from "./SideBar";


const routes: RouteType[] = [
    {
      path: '/dashboard',
      icon: 'HomeIcon', // Nom de l'icône importée
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/employees',
      icon: 'DescriptionIcon', // Nom de l'icône importée
      name: 'Employees',
      component: Dashboard
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
  