import { FormProvider, useForm } from "react-hook-form"
import MultiStepIndex from "./MultiStepIndex";

const Provider = () => {
  const methods = useForm({mode: "all"});

    return (
      <FormProvider {...methods}>
          <MultiStepIndex/>
      </FormProvider>
            
    )
}

export default Provider
