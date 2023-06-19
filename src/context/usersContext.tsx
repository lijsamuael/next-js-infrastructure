import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "..//redux/userRedux/usersSlice";
import {
  encryptData,
  decryptData,
  isTimestampWithinRange,
  fetchUsers,
} from "../utils/encription";
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

  const timestamp = new Date().toISOString();
  const dataToSave = {
    timestamp,
    users,
  };

  localStorage.setItem("users", encryptData(dataToSave));

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        dispatch(setUser(fetchedUsers));
        console.log("Fetched users", fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAndSetUsers();

    const encryptedData = localStorage.getItem("users");
    const storedUser = decryptData(encryptedData);

    if (
      storedUser &&
      storedUser.timestamp &&
      storedUser.users &&
      isTimestampWithinRange(storedUser.timestamp, 10)
    ) {
      const { timestamp, users } = storedUser;
      console.log("Retrieved from localStorage");
      console.log("Timestamp:", timestamp);
      console.log("Users:", users);
    } else {
      const updatedTimestamp = new Date().toISOString();
      const updatedDataToSave = {
        timestamp: updatedTimestamp,
        users,
      };
      localStorage.setItem(
        "users",
        encryptData(JSON.stringify(updatedDataToSave))
      );
    }
  }, [dispatch]);

  return (
    <UserContext.Provider value={{ users, loading }}>
      {children}
    </UserContext.Provider>
  );
};
