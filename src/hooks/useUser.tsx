import UserContext, { UserContextType } from "../context/UserContext";
import { useContext } from "react";

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
