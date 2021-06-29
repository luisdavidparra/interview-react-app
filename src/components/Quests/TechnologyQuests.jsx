import React from "react";
import IndividualQuest from "./IndividualQuest";
import { useDataContext } from "../../contexts/DataContext";

const TechnologyQuests = ({ Tec }) => {
  const { Questions } = useDataContext();

  return (
    <>
      <div className=" justify-content-around w-100">
        {Questions.map((quest, index) => (
          <IndividualQuest index={index} Questions={Questions} quest={quest} Tec={Tec} key={index} />
        ))}
      </div>
    </>
  );
};

export default TechnologyQuests;
