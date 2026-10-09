import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, setToken } from '../services/api';
import { DEMO_USERS } from '../services/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campushire_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // No direct auto-login: user must explicitly log in via login page!
    return null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('campushire_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('campushire_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      if (res && res.token) {
        setToken(res.token);
        setUser(res.user);
        return { success: true, user: res.user };
      }
    } catch (err) {
      // Demo / offline fallback authentication for all 5 prototype students & staff
      if ((email === 'student@campushire.ai' || email === 'alex@campushire.ai') && password === 'password123') {
        setUser(DEMO_USERS.student1);
        setToken('demo-token-alex');
        return { success: true, user: DEMO_USERS.student1 };
      } else if (email === 'priya@campushire.ai' && password === 'password123') {
        setUser(DEMO_USERS.student2);
        setToken('demo-token-priya');
        return { success: true, user: DEMO_USERS.student2 };
      } else if (email === 'rohit@campushire.ai' && password === 'password123') {
        setUser(DEMO_USERS.student3);
        setToken('demo-token-rohit');
        return { success: true, user: DEMO_USERS.student3 };
      } else if (email === 'ananya@campushire.ai' && password === 'password123') {
        setUser(DEMO_USERS.student4);
        setToken('demo-token-ananya');
        return { success: true, user: DEMO_USERS.student4 };
      } else if (email === 'kavya@campushire.ai' && password === 'password123') {
        setUser(DEMO_USERS.student5);
        setToken('demo-token-kavya');
        return { success: true, user: DEMO_USERS.student5 };
      } else if (email === 'officer@campushire.ai' && password === 'password123') {
        setUser(DEMO_USERS.officer);
        setToken('demo-token-officer');
        return { success: true, user: DEMO_USERS.officer };
      } else if (email === 'recruiter@campushire.ai' && password === 'password123') {
        setUser(DEMO_USERS.recruiter);
        setToken('demo-token-recruiter');
        return { success: true, user: DEMO_USERS.recruiter };
      }
      throw new Error('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await authApi.register(userData);
      if (res && res.token) {
        setToken(res.token);
        setUser(res.user);
        return { success: true, user: res.user };
      }
    } catch (err) {
      // Fallback registered user creation
      const newUser = {
        id: Date.now(),
        email: userData.email,
        fullName: userData.fullName,
        role: userData.role,
        department: userData.department || 'Computer Science and Engineering',
        cgpa: userData.cgpa || 8.0,
        graduationYear: userData.graduationYear || 2026,
        targetRole: userData.targetRole || 'Software Engineer',
        profileCompletion: 60
      };
      setUser(newUser);
      setToken('demo-token-registered');
      return { success: true, user: newUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('campushire_user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
