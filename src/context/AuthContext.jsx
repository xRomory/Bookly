import React, { createContext, useContext, useState, useEffect } from 'react'
import api from "../api/axios";
// import { deleteCookie } from "../api/cookies";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if(token) {
          const response = await api.get("/users/me/");
          setUser(response);
          setIsAuthenticated(true);
        }
      } catch(error) {
        console.error("Error:", error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      await api.get('/users/csrf/')
      const response = api.post("/users/auth/login/", { email, password });

      if(response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

      if(response.data.token) {
        setUser(response.data.token)
        setIsAuthenticated(true)
      }

      return {success: true}

    } catch(error) {
      console.error("Error:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}