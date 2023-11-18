import { Button, Input, Pagination, Select } from "antd";
import axios, { AxiosResponse } from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CheckboxField from "../components/forms/CheckboxField";
import { Option } from "../components/forms/SelectField";
import MoviesList from "../components/home/MoviesList";
import { genresURL, moviesURL } from "../endpoints";
import { Actor } from "../types/actors";
import { Genre } from "../types/genres";
import { MovieTheater } from "../types/movieTheater";
import { Movie } from "../types/movies";

type FilterMoviesForm = {
  title: string;
  genreId: number;
  upcomingReleases: boolean;
  inTheaters: boolean;
  page: number;
  recordsPerPage: number;
};

const RECORDS_PER_PAGE = 10;

const FilterMovies = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const query = new URLSearchParams(useLocation().search);
  const [totalAmountOfRecords, setTotalAmountOfRecords] = useState(0);
  const navigate = useNavigate();

  const initialValues: FilterMoviesForm = {
    title: "",
    genreId: 0,
    upcomingReleases: false,
    inTheaters: false,
    page: 1,
    recordsPerPage: RECORDS_PER_PAGE,
  };

  const handleSearchMovies = (values: FilterMoviesForm) => {
    modifyURL(values);
    axios
      .get(`${moviesURL}/filter`, { params: values })
      .then((response: AxiosResponse<Movie[]>) => {
        setTotalAmountOfRecords(parseInt(response.headers["totalamountofrecords"]));
        setMovies(response.data);
      });
  };

  const modifyURL = (values: FilterMoviesForm) => {
    const queryStrings: string[] = [];

    if (values.title) {
      queryStrings.push(`title=${values.title}`);
    }
    if (values.genreId) {
      queryStrings.push(`genreId=${values.genreId}`);
    }
    if (values.inTheaters) {
      queryStrings.push(`inTheaters=${values.inTheaters}`);
    }
    if (values.upcomingReleases) {
      queryStrings.push(`upcomingReleases=${values.upcomingReleases}`);
    }

    queryStrings.push(`page=${values.page}`);
    navigate(`/movies/filter?${queryStrings.join("&")}`);
  };

  const convertDataToOptions = (
    data: Genre[] | MovieTheater[] | Actor[]
  ): Option[] => {
    return data.map((data) => ({
      value: data.id,
      label: data.name,
    }));
  };

  useEffect(() => {
    axios.get(`${genresURL}/all`).then((response: AxiosResponse<Genre[]>) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    if (query.get("title")) {
      initialValues.title = query.get("title")!;
    }
    if (query.get("genreId")) {
      initialValues.genreId = parseInt(query.get("genreId")!);
    }
    if (query.get("inTheaters")) {
      initialValues.inTheaters = Boolean(query.get("inTheaters")!);
    }
    if (query.get("upcomingReleases")) {
      initialValues.upcomingReleases = Boolean(query.get("upcomingReleases")!);
    }
    if (query.get("page")) {
      initialValues.page = parseInt(query.get("page")!);
    }

    handleSearchMovies(initialValues);
  }, []);

  return (
    <div className="flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          values.page = 1;
          await handleSearchMovies(values);
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string(),
        })}
      >
        {({ handleChange, isSubmitting, setFieldValue, values }) => (
          <>
            <Form className="flex flex-col mb-7 mt-5">
              <Input
                className="mt-4 mb-2"
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                placeholder="Find the movie"
              />
              <ErrorMessage
                name="title"
                component="div"
                children={(error) => (
                  <div className="text-[#ff4d4f]">{error}</div>
                )}
              />
              <Select
                className="mt-4 mb-2"
                id="genreId"
                defaultValue="Pick your Genre"
                style={{ width: 170 }}
                onChange={(selectedGenreId) => {
                  setFieldValue("genreId", selectedGenreId);
                }}
                options={convertDataToOptions(genres)}
              />
              <CheckboxField displayName="In Theaters" fieldName="inTheaters" />
              <CheckboxField
                displayName="Upcoming Releases"
                fieldName="upcomingReleases"
              />
              <Button
                disabled={isSubmitting}
                htmlType="submit"
                type="primary"
                className="bg-[#1677ff] w-fit mt-7"
              >
                Search
              </Button>
            </Form>
            <MoviesList movies={movies} />
            <Pagination
              className="mt-7 mb-2"
              pageSize={RECORDS_PER_PAGE}
              onChange={(page) => {
                values.page = page;
                handleSearchMovies(values);
              }}
              total={totalAmountOfRecords}
              current={values.page}
              hideOnSinglePage
            />
          </>
        )}
      </Formik>
    </div>
  );
};

export default FilterMovies;
