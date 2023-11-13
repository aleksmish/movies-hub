import { Form, Formik } from 'formik'
import Button from "../shared/Button"
import TextField from '../forms/TextField';
import * as Yup from "yup"
import { GenreCreation } from '../../types/genres';

type GenreFormProps = {
  genreCreation?: GenreCreation;
  onSubmit: (genre: GenreCreation) => void;
}

const GenreForm = ({onSubmit, genreCreation}: GenreFormProps) => {
  return (
    <div className='flex flex-col'>
      <Formik
        initialValues={genreCreation || {name: ''}}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("This field is required")
            .firstLetterUppercase()
            .min(5, "This field must be at least 5 characters")
            .max(50, "This field must be at most 50 characters")
        })}
      >
        {({ 
          isSubmitting,
        }) => (
          <Form className='flex flex-col'>
            <TextField displayName="Name" fieldName="name" />
            <Button disabled={isSubmitting} htmlType="submit" className="mt-7">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default GenreForm