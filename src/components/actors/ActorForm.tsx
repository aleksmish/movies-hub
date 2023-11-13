import { Form, Formik } from "formik";
import { Button } from "antd";
import * as Yup from "yup";
import ImageField from "../forms/ImageField";
import DatePickerField from "../forms/DatePickerField";
import TextField from "../forms/TextField";
import MarkdownField from "../forms/MarkdownField";
import { ActorCreation } from "../../types/actors";

type ActorFormProps = {
  onSubmit: (actor: ActorCreation) => void;
  actorCreation?: ActorCreation;
}

const ActorForm = ({actorCreation, onSubmit}: ActorFormProps) => {
  return (
    <Formik
      initialValues={actorCreation || { name: "", dateOfBirth: undefined, picture: undefined, biography: '', pictureURL: '' }}
      onSubmit={onSubmit}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required("This field is required")
          .firstLetterUppercase()
          .min(5, "This field must be at least 5 characters")
          .max(50, "This field must be at most 50 characters"),
        dateOfBirth: Yup.string().nullable().required("This field is required"),
      })}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <TextField displayName="Name" fieldName="name" />
          <DatePickerField
            displayName="Date of Birth"
            fieldName="dateOfBirth"
          />
          <ImageField displayName="Picture" fieldName="picture" pictureURL={actorCreation?.pictureURL} />
          <MarkdownField displayName="Biography" fieldName="biography" />
          <Button disabled={isSubmitting} htmlType="submit" className="mt-7">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ActorForm;
