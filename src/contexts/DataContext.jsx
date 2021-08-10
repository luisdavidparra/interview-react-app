import { useState, createContext } from "react";
import { useContext } from "react/cjs/react.development";
import { useForm } from "react-hook-form";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const methods = useForm({ mode: "all" });

  const value = {
    methods,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);

export default DataContextProvider;
