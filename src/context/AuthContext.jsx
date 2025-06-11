import React, { createContext, useContext, useState, useEffect } from 'react'
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");
        if(token && storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else if(token) {
          const response = await api.get("/users/me/");
          setUser(response.data);
          setUser("user", JSON.stringify(response.data));
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
      const response = await api.post("/users/auth/login/", { email, password });;

      if(response.data.token) {
        const userData = {
          ...response.data.user,
          is_admin: response.data.user.is_staff || response.data.user.is_superuser
        }
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(userData);
        setIsAuthenticated(true);
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

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    api.post("/users/auth/logout/")
    
  }

  const updateUserSettings = async (firstName, lastName, contactNumber) => {
    try {
      const response = await api.put("/users/me/update/", {
        first_name: firstName,
        last_name: lastName,
        contact_number: contactNumber,
      });

      setUser((prev) => ({
        ...prev,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        contact_number: response.data.contact_number,
      }));

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          contact_number: response.data.contact_number,
        })
      );
      return { success: true }
    } catch (error) {
      console.error("Failed to update user:", error);
      return { success: false, error: error.response?.data };
    }
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUserSettings,
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