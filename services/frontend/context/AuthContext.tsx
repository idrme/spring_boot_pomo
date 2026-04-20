"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  // login: (token: string, user: User) => void;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);



    const checkIfConnected = async () => {
        const res = await fetch(`/api/private/connected`,
       {
          method: "GET",
          credentials : "include"
       }
    );
    if (res.ok)
    {
      // alert("Header : user connected");
      const data = await res.json();
      setUser({id : data.id, name : data.username, email : data.email});

    }
    else {
      // alert("Header : user not connected");
      setUser(null);
    }
  }

    const logoutRequest = async () => {
        const res = await fetch(`/api/auth/logout`,
       {
          method: "GET",
          credentials : "include"
       }
    );
    if (res.ok)
    {
      // alert("Logout successfully");
      setUser(null);
    }
    else {
            alert("Logout error");
      // alert("Header : user not connected");
      setUser(null);
    }
  }


  useEffect(() => {

    // async function checkIfLogged() {


    // }
    checkIfConnected();
  }, []);

  const login = () => { // Modifier user pour mettre un vbrai obj
    // localStorage.setItem("token", token);
    // setUser(userData);

    checkIfConnected();

    
  };

  const logout = () => { // mettre user a null
    // localStorage.removeItem("token");
    logoutRequest();
    setUser(null);

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};