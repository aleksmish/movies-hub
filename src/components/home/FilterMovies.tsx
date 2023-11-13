import { ErrorMessage, Form, Formik } from 'formik';
import {Genre} from "../../types/genres"
import { Input, Select } from 'antd';
import * as Yup from 'yup'

type FilterMoviesProps = {
  title: string;
  genreId: number;
  upcomingReleases: boolean;
  inTheaters: boolean;
}

const FilterMovies = () => {
  const initialValues: FilterMoviesProps = {
    title: '',
    genreId: 0,
    upcomingReleases: false,
    inTheaters: false,
  }
  const genres: Genre[] = [{id: 1, name: "Drama"}, {id:2, name: "Comedy"}]

  return (
    <div>
      <Formik
        initialValues={initialValues}
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
          handleChange,
        }) => (
         <Form className='flex flex-col mb-7 mt-5'>
          <Input className='' type="text" name="name" id="name" onChange={handleChange} placeholder='Find the movie' />
          <ErrorMessage name="name" component="div" children={error => <div className='text-[#ff4d4f]'>{error}</div>} />
          <Select
            className='mt-5'
            defaultValue="Pick your Genre"
            style={{ width: 170 }}
            onChange={handleChange}
          >
            {genres.map(genre => (
              <Select.Option key={genre.id} value={genre.name}>{genre.name}</Select.Option>
            ))}
          </Select>
         </Form>
       )}
     </Formik>
    </div>
  )
}

export default FilterMovies