import { useState, createContext } from "react";
import { useContext } from "react/cjs/react.development";
import { useForm } from "react-hook-form";

const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const methods = useForm();
  // const {
  //   formState: { errors, isSubmitted, isValid },
  // } = methods;
  const [tecSelected, setTecSelected] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [scoreData, setScoreData] = useState([]);
  const Questions = ["How much does know about  ", "Amount of apps made with ", "Level "];

  const [newUser, setNewUser] = useState();
  const [totalAverage, setTotalAverage] = useState(0);

  const value = {
    answerData,
    setAnswerData,
    scoreData,
    setScoreData,
    Questions,
    // Technologies,
    totalAverage,
    setTotalAverage,
    methods,
    newUser,
    setNewUser,
    tecSelected,
    setTecSelected,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);

export default DataContextProvider;
