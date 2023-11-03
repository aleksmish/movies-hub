import { Form, Formik } from 'formik'
import * as Yup from "yup"
import TextField from '../../../components/forms/TextField'
import { MovieTheater } from '../../../types/movieTheater'
import MapField from '../../../components/forms/MapField'
import { Coordinates } from '../../../types/coordinates'
import { Button } from 'antd'

type MovieTheaterFormProps = {
  movieTheater?: MovieTheater;
}

const MovieTheaterForm = ({movieTheater}: MovieTheaterFormProps) => {

  const transformCoordinates = (): Coordinates[] | undefined => {
    if (movieTheater?.latitude && movieTheater?.longtitude) {
      const response: Coordinates = {lat: movieTheater.latitude, lng: movieTheater.longtitude};
      return [response];
    }
    return undefined;
  }

  return (
    <div className='flex flex-col'>
      <Formik
        initialValues={{ name: movieTheater?.name, latitude: movieTheater?.latitude, longtitude: movieTheater?.longtitude }}
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
            .max(50, "This field must be at most 50 characters")
        })}
      >
       {({
          isSubmitting,
        }) => (
         <Form className='flex flex-col'>
            <TextField displayName="Name" fieldName="name" />
            <div className='mt-4'>
              <MapField latField='latitude' lngField='longtitude' coordinates={transformCoordinates()} />
            </div>
            <Button disabled={isSubmitting} htmlType="submit" className="mt-7">
              Submit
            </Button>
         </Form>
       )}
     </Formik>
    </div>
  )
}

export default MovieTheaterForm