import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const QuestionsStep = () => {
  const { watch, getValues } = useFormContext();

    useEffect(() => {
        const values = getValues("name");
        console.log(values);
    }, []);

  return (
    <div>
      <button type="button" onClick={() => console.log(getValues())}>Get values</button>
      <h1>hola</h1>
    </div>
  );
};

export default QuestionsStep;
