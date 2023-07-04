import React, { ReactNode, createContext, useState, useEffect } from "react";

interface UserContextData {
  userData: UserData | null;
  updateUserData: (data: UserData) => void;
}

interface UserData {
  name: string;
  email: string;
  lastname: string;
  birthday: string;
  date: string;
  role: string;
}

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataContext = createContext<UserContextData>({
  userData: null,
  updateUserData: () => {},
});

export const UserDataProvider: React.FC<UserDataProviderProps> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>({
    name: "",
    email: "",
    lastname: "",
    birthday: "",
    date: "",
    role: "",
  });

  useEffect(() => {
    const localStorageData = localStorage.getItem("userData");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setUserData(parsedData);
    }
  }, []);

  const updateUserData = (data: UserData) => {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};
