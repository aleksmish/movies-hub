import { Button } from "antd";
import { Formik, Form } from "formik";
import { UserCredentials } from "../../types/auth";
import * as Yup from "yup";
import TextField from "../forms/TextField";

type AuthFormProps = {
  model: UserCredentials;
  onSubmit: (values: UserCredentials) => void;
};

const AuthForm = ({ model, onSubmit }: AuthFormProps) => {
  return (
    <Formik
      initialValues={model || {email: "", password: ""}}
      onSubmit={onSubmit}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .required("This field is required")
          .email('You have to insert a valid email'),
        password: Yup.string()
          .required("This field is required")
      })}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <TextField displayName="Email" fieldName="email" />
          <TextField displayName="Password" fieldName="password" type="password" />
          <Button disabled={isSubmitting} htmlType="submit" className="mt-7">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
