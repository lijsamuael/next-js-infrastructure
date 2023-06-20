import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "..//redux/userRedux/usersSlice";
import {
  encryptData,
  decryptData,
  isTimestampWithinRange,
} from "../utils/encription";
import { RootState } from "../redux/store";
import User from "../interfaces/userInterface";
import { fetchData } from "../api/fetchData";

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

  useEffect(() => {
    localStorage.setItem("users", encryptData(dataToSave));
    fetchData("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        dispatch(setUser(response.data));
        setLoading(false);
        console.log("response data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

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
      {loading ? (
        <div className="fixed h-screen w-full bg-white">
          <div className="flex justify-center items-center h-full">
            <img
              className="h-16 w-16 "
              src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
              alt=""
            />
          </div>
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};
