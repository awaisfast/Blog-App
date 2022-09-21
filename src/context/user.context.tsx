import { createContext, ReactNode, useState } from "react";

interface ICurrentUser {
  uid: string;
  displayName: string;
  email: string;
}
interface IUserContext {
  currentUser: null | ICurrentUser;
  setCurrentUser: (currentUser: null) => void;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: (currentUser) => {},
});
interface UserProviderProps {
  children?: ReactNode;
}
export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = {
    currentUser,
    setCurrentUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
