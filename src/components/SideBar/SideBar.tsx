import React from 'react';
import routes from './routes'
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import SidebarSubmenu from './SidebarSubmenu';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import { SvgIconProps } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
// Définir les types pour les routes
export interface RouteType {
  path: string;
  icon?: string;
  name: string;
  component?: React.FC;
  routes?: RouteType[];
}

const iconMap: { [key: string]: OverridableComponent<SvgIconTypeMap<object, "svg">> } = {
    HomeIcon,
    DescriptionIcon,
    // Ajoutez d'autres icônes ici
  };
  
  
  // Définir les props pour le composant Icon
  interface IconProps extends SvgIconProps {
    icon: string;
  }

const Icon: React.FC<IconProps> = ({ icon, ...props }) => {
  const IconComponent = iconMap[icon];
  return IconComponent ? <IconComponent {...props} /> : null;
};


const Sidebar: React.FC = () => {
    return (
      <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
            Windmill
          </a>
          <ul className="mt-6">
  {routes.map((route: RouteType) =>
    route.routes ? (
      <SidebarSubmenu route={route} key={route.name} />
    ) : (
      <li className="relative px-6 py-3" key={route.name}>
        <NavLink
          to={`/app${route.path}`}
          className={({ isActive }) =>
            `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 ${
              isActive ? 'text-gray-800 dark:text-gray-100' : ''
            }`
          }
        >
          {route.icon && <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />}
          <span className="ml-4">{route.name}</span>
        </NavLink>
      </li>
    )
  )}
</ul>

        </div>
      </aside>
    );
  };
  
  export default Sidebar;
  
  