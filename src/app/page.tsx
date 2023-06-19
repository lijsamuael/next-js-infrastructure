"use client";
import { UserContext } from "@/src/context/usersContext";
import { RootState } from "@/src/redux/store";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  // const users = useSelector((state: RootState) => state.users.users);

  const userContext = useContext(UserContext);
  const { users, loading } = userContext || {};
  const [usersData, setUserData] = useState(users);

  useEffect(() => {
    setUserData(users);
    console.log(loading);
    console.log(users);
  });

  return (
    <>
      {loading && (
        <div className="fixed h-screen w-full bg-white">
          <div className="flex justify-center items-center h-full">
            <img
              className="h-16 w-16 "
              src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
              alt=""
            />
          </div>
        </div>
      )}
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usersData &&
              usersData!.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.address.street}, {user.address.suite},{" "}
                    {user.address.city}, {user.address.zipcode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.website}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.company.name}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
