//to manage the user's status
/*import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextProps {
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = (username: string) => {

    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    console.log(`User ${username} logged in`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    console.log('User logged out');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};*/

/*export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
*/