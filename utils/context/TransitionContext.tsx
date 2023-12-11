import React, { createContext } from 'react';
import { useState } from 'react';

interface TransitionContextProps {
  completed: boolean;
  toggleCompleted?: (value: boolean) => void;
}

const TransitionContext = createContext<TransitionContextProps | undefined>({ completed: false });

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const [completed, setCompleted] = useState<boolean>(false);


  const toggleCompleted = (value: boolean) => {
    setCompleted(value);
  };

  return (
    <TransitionContext.Provider
      value={{
        toggleCompleted,
        completed,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionContext;
