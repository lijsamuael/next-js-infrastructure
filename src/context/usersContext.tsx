import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "..//redux/userRedux/usersSlice";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { RootState } from "../redux/store";
import User from "../interfaces/userInterface";

interface UserContextType {
  users: User[] | null;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getFromLocalStorage("user");
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
    setLoading(false);
  }, [dispatch]);

  return (
    <UserContext.Provider value={{ users, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// export const useUserContext = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within an AppProvider");
//   }
//   return context;
// };
