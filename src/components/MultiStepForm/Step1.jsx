import { FormGroup, FormText, Input, Label } from "reactstrap";
import { useDataContext } from "./../../contexts/DataContext";

const Step1 = () => {
  const { methods } = useDataContext();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <>
      <FormGroup sm={10} >
        <h5>Insert candidate information</h5>
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
    </>
  );
};

export default Step1;
