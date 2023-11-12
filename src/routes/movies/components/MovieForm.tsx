import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../../../components/forms/TextField";
import { Button } from "antd";
import { MovieCreation } from "../../../types/movies";
import DatePickerField from "../../../components/forms/DatePickerField";
import ImageField from "../../../components/forms/ImageField";
import CheckboxField from "../../../components/forms/CheckboxField";
import SelectField, { Option } from "../../../components/forms/SelectField";
import { useState } from "react";
import { Genre } from "../../../types/genres";
import { MovieTheater } from "../../../types/movieTheater";
import MarkdownField from "../../../components/forms/MarkdownField";
import ActorsAutoComplete from "./ActorsAutoComplete";

type MoviesFormProps = {
  movieCreation?: MovieCreation;
  selectedGenres?: Genre[];
  selectedMovieThetears?: MovieTheater[];
  genres: Genre[];
  movieTheaters: MovieTheater[];
  onSubmit: (movieCreation: MovieCreation) => Promise<void>;
};

const MovieForm = (props: MoviesFormProps) => {
  const [selectedGenres, setSelectedGenres] = useState(
    props.selectedGenres || []
  );
  const [selectedMovieTheaters, setSelectedMovieTheaters] = useState(
    props.selectedMovieThetears || []
  );
  const [genres, setGenres] = useState(props.genres);
  const [movieTheaters, setMovieTheaters] = useState(props.movieTheaters);
  const [selectedActors, setSelectedActors] = useState([]);

  const convertDataToOptions = (data: Genre[] | MovieTheater[]): Option[] => {
    return data.map((data) => ({
      value: data.id,
      label: data.name,
    }));
  };

  return (
    <div className="flex flex-col">
      <Formik
        initialValues={
          props.movieCreation || {
            title: "",
            inTheaters: false,
            trailer: "",
            releaseDate: undefined,
            poster: undefined,
            summary: "",
            actors: [],
          }
        }
        onSubmit={props.onSubmit}
        validationSchema={Yup.object().shape({
            title: Yup.string()
            .required("This field is required")
            .firstLetterUppercase()
            .min(5, "This field must be at least 5 characters")
            .max(50, "This field must be at most 50 characters"),
            trailer: Yup.string()
            .required("This field is required")
            .min(5, "This field must be at least 5 characters")
            .max(50, "This field must be at most 50 characters"),
          releaseDate: Yup.string().required("This field is required"),
          summary: Yup.string()
            .required("This field is required")
            .firstLetterUppercase(),
        })}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="flex flex-col">
            <TextField displayName="Title" fieldName="title" />
            <CheckboxField displayName="In Theaters" fieldName="inTheaters" />
            <TextField displayName="Trailer" fieldName="trailer" />
            <DatePickerField
              displayName="Release Date"
              fieldName="releaseDate"
            />
            <ImageField
              displayName="Poster"
              fieldName="poster"
              pictureURL={props.movieCreation?.posterURL || ""}
            />
            <MarkdownField displayName="Summary" fieldName="summary" />
            <SelectField
              displayName="Genres"
              options={convertDataToOptions(genres)}
              selectedOptions={convertDataToOptions(selectedGenres)}
              onChange={(selectedGenresIds) => {
                setFieldValue('genresIds', selectedGenresIds)
              }}
            />
            <SelectField
              displayName="Movie Theater"
              options={convertDataToOptions(movieTheaters)}
              selectedOptions={convertDataToOptions(selectedMovieTheaters)}
              onChange={(selectedMovieTheatersIds) => {
                setFieldValue('movieTheatersIds', selectedMovieTheatersIds)
              }}
            />
            <ActorsAutoComplete />
            <Button disabled={isSubmitting} htmlType="submit" className="mt-7">
              Save Changes
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MovieForm;
