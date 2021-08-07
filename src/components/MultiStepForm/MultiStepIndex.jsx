import { Button, Card, Form, FormGroup, FormText, Input, Label } from "reactstrap";
import { useState, useEffect } from "react";
import { useFormContext, useForm } from "react-hook-form";
import Step1 from "./Step1";
import { getAllTechnologies } from "../../services/technologies";
import Questions from "./QuestionsStep";

const MultiStepIndex = () => {
  const [technologies, setTechnologies] = useState([]);
  const [step, setStep] = useState(0);
  // const {
  //   watch,
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm({ mode: "all" });

  const {
    watch,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useFormContext();

  useEffect(() => {
    const getTec = async () => {
      const data = await getAllTechnologies();
      setTechnologies(data);
    };
    getTec();
  }, []);

  const completeFormStep = (num) => {
    console.log(watch());
    if (num === 1) {
      setStep((step) => step + 1);
    } else {
      setStep((step) => step - 1);
    }
  };
  const onSubmit = (data) => console.log(data);

  const renderButton = () => {
    if (step > 1) {
      return (
        <Button color="primary" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
          Save
        </Button>
      );
    } else {
      return (
        <>
          <Button color="primary" onClick={() => completeFormStep(1)} disabled={!isValid}>
            Next
          </Button>
          <Button color="danger" onClick={() => completeFormStep(-1)}>
            Back
          </Button>
        </>
      );
    }
  };
  return (
    <Card>
      <Form>
        {step === 0 && (
          <section className="text-start p-4">
            <FormGroup sm={10}>
              <Label for="name">Name:</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter a name"
                {...register("name", { required: { value: true, message: "type a name" } })}
                invalid={errors.name}
              />
              {errors.name && <FormText className="text-danger">{errors.name.message}</FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="lastname">Last name:</Label>
              <Input
                type="text"
                name="lastname"
                placeholder="Enter a last name"
                {...register("lastname", { required: { value: true, message: "type a last name" } })}
                invalid={errors.lastname}
              />
              {errors.lastname && <FormText className="text-danger">{errors.lastname.message}</FormText>}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter an email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
                invalid={errors.email}
              />
              {errors.email && <FormText className="text-danger">{errors.email.message}</FormText>}
            </FormGroup>
          </section>
        )}
        {step === 1 && (
          <section>
            {technologies.map((tec) => (
              <div key={tec.tec}>
                <label>
                  {tec.tec}
                  <input
                    type="checkbox"
                    value={tec.tec}
                    name="tec"
                    {...register("tecToAsk", {
                      required: "Need to pick at least one tec",
                    })}
                  />
                </label>
              </div>
            ))}
            {errors.tec && <FormText className="text-danger">{errors.tec.message}</FormText>}
          </section>
        )}
        {step === 0 && <Questions />}
      </Form>
      {renderButton()}
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </Card>
  );
};

export default MultiStepIndex;
