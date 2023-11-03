import { ErrorMessage, Form, Formik } from 'formik'
import Button from "../../../components/Button"
import TextField from '../../../components/forms/TextField';
import * as Yup from "yup"

const CreateGenreForm = () => {
  return (
    <div className='flex flex-col'>
      <h3 className='mt-5 mb-5 font-semibold text-xl leading-6'>Create a Genre</h3>
      <Formik
        initialValues={{ name: '' }}
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
           <Button disabled={isSubmitting} htmlType="submit" className="mt-7">
             Submit
           </Button>
         </Form>
       )}
     </Formik>
    </div>
  )
}

export default CreateGenreForm