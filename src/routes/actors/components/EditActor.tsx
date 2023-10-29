import { Form, Formik } from "formik";
import { Button } from "antd";
import * as Yup from "yup";
import ImageField from "../../../components/forms/ImageField";
import DatePickerField from "../../../components/forms/DatePickerField";
import TextField from "../../../components/forms/TextField";

const EditActorForm = () => {
  return (
    <Formik
      initialValues={{ name: "", dateOfBirth: null, image: "" }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 1000);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required("This field is required")
          .firstLetterUppercase()
          .min(5, "This field must be at least 5 characters")
          .max(50, "This field must be at most 50 characters"),
        dateOfBirth: Yup.string()
          .nullable()
          .required("This field is required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <TextField displayName="Name" fieldName="name" />
          <DatePickerField displayName="Date of Birth" fieldName="dateOfBirth" />
          <ImageField  displayName="Image" fieldName="image" />
          <Button disabled={isSubmitting} htmlType="submit" className="mt-7">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default EditActorForm;
