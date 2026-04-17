'use client';

import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [headerTheme, setHeaderTheme] = useState('light');
  const [contactFormVisible, setContactFormVisible] = useState(false);
  const [animationDisabled, setAnimationDisabled] = useState(false);

  return (
    <AppContext.Provider
      value={{
        headerTheme,
        setHeaderTheme,
        contactFormVisible,
        setContactFormVisible,
        animationDisabled,
        setAnimationDisabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
