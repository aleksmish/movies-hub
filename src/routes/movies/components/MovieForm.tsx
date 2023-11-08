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
import AutoCompleteField from "../../../components/forms/AutoCompleteField";

type MoviesFormProps = {
  movieCreation?: MovieCreation;
  selectedGenres?: Genre[];
  selectedMovieThetears?: MovieTheater[];
  genres: Genre[];
  movieTheaters: MovieTheater[];
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

  const convertDataToOptions = (genres: Genre[] | MovieTheater[]): Option[] => {
    return genres.map((genre) => ({
      value: genre.name,
      label: genre.name,
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
            posterURL: "",
          }
        }
        onSubmit={(values, actions) => {
          values.genresIds = selectedGenres.map(
            (selectedGenre) => selectedGenre.name
          );
          values.movieTheatersIds = selectedMovieTheaters.map(
            (selectedMovieTheater) => selectedMovieTheater.name
          );
          alert(JSON.stringify(values));
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .required("This field is required")
            .firstLetterUppercase()
            .min(5, "This field must be at least 5 characters")
            .max(50, "This field must be at most 50 characters"),
          trailer: Yup.string()
            .required("This field is required")
            .firstLetterUppercase()
            .min(5, "This field must be at least 5 characters")
            .max(50, "This field must be at most 50 characters"),
          releaseDate: Yup.string().required("This field is required"),
        })}
      >
        {({ isSubmitting }) => (
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
            <SelectField
              displayName="Genres"
              options={convertDataToOptions(genres)}
              selectedOptions={convertDataToOptions(selectedGenres)}
              onChange={() => {}}
            />
            <SelectField
              displayName="Movie Theater"
              options={convertDataToOptions(movieTheaters)}
              selectedOptions={convertDataToOptions(selectedMovieTheaters)}
              onChange={() => {}}
            />
            <AutoCompleteField displayName="Actors" fieldName="actors" actors={[]} />
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
