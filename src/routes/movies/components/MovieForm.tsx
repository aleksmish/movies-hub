import { Form, Formik } from 'formik'
import * as Yup from "yup"
import TextField from '../../../components/forms/TextField'
import MapField from '../../../components/forms/MapField'
import { Button } from 'antd'
import { MovieCreation } from '../../../types/movies'
import DatePickerField from '../../../components/forms/DatePickerField'
import ImageField from '../../../components/forms/ImageField'
import CheckboxField from '../../../components/forms/CheckboxField'

type MoviesFormProps = {
  movieCreation: MovieCreation;
}

const MovieForm = ({movieCreation}: MoviesFormProps) => {
  return (
    <div className='flex flex-col'>
      <Formik
        initialValues={movieCreation}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 1000);
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
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
            <TextField displayName="Title" fieldName="title" />
            <CheckboxField displayName='In Theaters' fieldName="inTheaters" />
            <TextField displayName="Trailer" fieldName="trailer" />
            <DatePickerField displayName="Release Date" fieldName="releaseDate" />
            <ImageField displayName='Poster' fieldName='poster' imageURL={movieCreation.posterURL} />
            <Button disabled={isSubmitting} htmlType="submit" className="mt-7">
              Save Changes
            </Button>
         </Form>
       )}
     </Formik>
    </div>
  )
}

export default MovieForm