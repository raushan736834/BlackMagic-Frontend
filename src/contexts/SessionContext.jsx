import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import customerService from "../services/customerService";

const SessionContext = createContext(null);

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within SessionProvider");
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(() => {
    const saved = localStorage.getItem("customerSession");
    return saved ? JSON.parse(saved) : null;
  });

  const [adminData, setAdminData] = useState(() => {
    const saved = localStorage.getItem("adminSession");
    return saved ? JSON.parse(saved) : null;
  });

  const [sessionError, setSessionError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Save customer session
  useEffect(() => {
    if (sessionData) {
      localStorage.setItem("customerSession", JSON.stringify(sessionData));
    } else {
      localStorage.removeItem("customerSession");
    }
  }, [sessionData]);

  // Save admin session
  useEffect(() => {
    if (adminData) {
      localStorage.setItem("adminSession", JSON.stringify(adminData));
    } else {
      localStorage.removeItem("adminSession");
    }
  }, [adminData]);

  // Customer Session Methods
  const startSession = useCallback(async (tableNumber, partySize = 2) => {
    setIsLoading(true);
    setSessionError(null);
    
    try {
      const response = await customerService.startSession({ qrToken: tableNumber });
      
      const session = {
        sessionCode: response?.data?.sessionCode,
        tableNumber: response?.data?.tableNumber,
        partySize,
        startedAt: response?.data?.startedAt,
        isActive: response?.data?.status === "ACTIVE",
      };
      
      setSessionData(session);
      setIsLoading(false);
      return { success: true, data: session };
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to start session";
      setSessionError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  const updateSession = useCallback((updates) => {
    setSessionData((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const endSession = useCallback(() => {
    setSessionData(null);
    setSessionError(null);
    localStorage.removeItem("customerSession");
    localStorage.removeItem("cart");
    localStorage.removeItem("orderHistory");
  }, []);

  const isSessionActive = useCallback(() => {
    return sessionData?.isActive === true;
  }, [sessionData]);

  // Getter methods for convenience
  const getSessionCode = useCallback(() => {
    return sessionData?.sessionCode;
  }, [sessionData]);

  const getTableNumber = useCallback(() => {
    return sessionData?.tableNumber;
  }, [sessionData]);

  const getPartySize = useCallback(() => {
    return sessionData?.partySize;
  }, [sessionData]);

  // Admin Session Methods
  const loginAdmin = useCallback((userData, token) => {
    const admin = {
      ...userData,
      token,
      loginAt: new Date().toISOString(),
    };
    setAdminData(admin);
    return admin;
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminData(null);
    localStorage.removeItem("adminSession");
  }, []);

  const isAdminAuthenticated = useCallback(() => {
    return adminData?.token != null;
  }, [adminData]);

  const getAdminToken = useCallback(() => {
    return adminData?.token;
  }, [adminData]);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      // Customer Session
      sessionData,
      startSession,
      updateSession,
      endSession,
      isSessionActive,
      getSessionCode,
      getTableNumber,
      getPartySize,
      sessionError,
      isLoading,

      // Admin Session
      adminData,
      loginAdmin,
      logoutAdmin,
      isAdminAuthenticated,
      getAdminToken,
    }),
    [
      sessionData,
      startSession,
      updateSession,
      endSession,
      isSessionActive,
      getSessionCode,
      getTableNumber,
      getPartySize,
      sessionError,
      isLoading,
      adminData,
      loginAdmin,
      logoutAdmin,
      isAdminAuthenticated,
      getAdminToken,
    ]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionContext;
