import React, { useContext, useState, useEffect } from "react";
import { useSidebar } from "../../context/SidebarContext";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";
import { useAuth } from "@/hooks/useAuth";
import { useNotification } from "@/hooks/useNotification";

const Header: React.FC = () => {
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useSidebar();
  const { logout } = useAuth();
  const { notifications, fetchNotifications,deleteNotification, unreadCount, markAsRead } = useNotification();
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(true);


  useEffect(() => {
    console.log("Notifications mises à jour :", notifications);
  }, [notifications]);

  useEffect(() => {
    const loadNotifications = async () => {
      await fetchNotifications();
      setLoadingNotifications(false);
    };
    loadNotifications();
  }, [fetchNotifications]);

  const handleDelete = async (id: number) => {
    setLoadingNotifications(true);
    try {
      await deleteNotification(id); // Utilise la fonction deleteNotification
      await fetchNotifications();   // Rafraîchit la liste des notifications
    } catch (err) {
      console.error("Error deleting notification:", err);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const handleDropdownOpen = () => {
    console.log("Ouverture du menu des notifications");
    if (notifications) {
      notifications.forEach((notification) => {
        if (!notification.readed) markAsRead(notification.id);
      });
    }
    setIsNotificationsMenuOpen(true);
  };

  // Gère l'ouverture/fermeture du menu du profil
  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
  <div className="container flex items-center justify-start h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
    {/* Mobile hamburger */}
    <button
      className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
      onClick={toggleSidebar}
      aria-label="Menu"
    >
      <MenuIcon className="w-6 h-6" aria-hidden="true" />
    </button>

    {/* Right-side icons */}
    <ul className="flex items-center flex-shrink-0 space-x-6 justify-end w-full">

      {/* Theme toggler */}
      <li className="flex">
        <button
          className="rounded-md focus:outline-none focus:shadow-outline-purple"
          onClick={toggleMode}
          aria-label="Toggle color mode"
        >
          {mode === "dark" ? (
            <WbSunnyIcon className="w-5 h-5" aria-hidden="true" />
          ) : (
            <NightlightRoundIcon className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </li>

      {/* Notifications */}
      <li className="relative">
  <button
    onClick={handleDropdownOpen}
    className="relative align-middle rounded-md focus:outline-none"
    aria-label="Notifications"
  >
    <NotificationsIcon className="w-5 h-5" />
    {unreadCount > 0 && (
      <Badge className="absolute top-0 right-0 w-0 h-4 text-white bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
        {unreadCount}
      </Badge>
    )}
  </button>

  {/* Dropdown des notifications */}
  <Dropdown
              className="absolute right-0 mt-2 max-w-xs w-96 max-h-60 overflow-y-auto z-50 text-gray-400 font-bold"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              {loadingNotifications ? (
                <DropdownItem>Loading...</DropdownItem>
              ) : notifications && notifications.length > 0 ? (
                notifications.map((notif) => (
                  <DropdownItem key={notif.id} className="flex justify-between items-center  border-b border-gray-200">
                    <div className="flex-1">
                      <div className="flex justify-between">
                      <div className="title font-bold text-purple-600">{notif.type}</div>
                      <DeleteIcon sx={{ fontSize: 20 }} className="text-small text-red-500 hover:text-red-700" onClick={() => handleDelete(notif.id)}/>

                      </div>
                      <div className="text-gray-900">{notif.message}</div>
                      <div className="text-gray-500 text-xs text-right">
                        {new Date(notif.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                   
                      
                  </DropdownItem>
                ))
              ) : (
                <DropdownItem>No notifications</DropdownItem>
              )}
            </Dropdown>
</li>


      {/* Profile menu */}
      <li className="relative">
        <button
          className="rounded-full focus:shadow-outline-purple focus:outline-none"
          onClick={handleProfileClick}
          aria-label="Account"
          aria-haspopup="true"
        >
          <Avatar
            className="w-10 h-10 align-middle"
            src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
            alt="User Avatar"
            aria-hidden="true"
          />
        </button>

        <Dropdown
          align="right"
          isOpen={isProfileMenuOpen}
          onClose={() => setIsProfileMenuOpen(false)}
        >
          <DropdownItem tag="a" href="#">
            <PersonOutlineIcon className="w-4 h-4 mr-3" aria-hidden="true" />
            <span>Profile</span>
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <SettingsIcon className="w-4 h-4 mr-3" aria-hidden="true" />
            <span>Settings</span>
          </DropdownItem>
          <DropdownItem onClick={logout}>
            <LogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
            <span>Log out</span>
          </DropdownItem>
        </Dropdown>
      </li>
    </ul>
  </div>
</header>

  );
};

export default Header;
