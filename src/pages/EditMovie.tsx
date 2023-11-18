import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "../components/movies/MovieForm";
import CustomSpin from "../components/shared/Spin";
import { moviesURL } from "../endpoints";
import { MovieCreation, MoviePutGet } from "../types/movies";
import { convertMovieToFormData } from "../utils/formData";
import dayjs from "dayjs";

const EditMovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [movie, setMovie] = useState<MovieCreation>();
  const [moviePutGet, setMoviePutGet] = useState<MoviePutGet>();
  const [errors, setErrors] = useState([]);

  const handleEditMovie = async (movie: MovieCreation) => {
    try {
      const formData = convertMovieToFormData(movie);
      await axios({
        method: "put",
        url: `${moviesURL}/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/movies/${id}`);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response)
        setErrors(error.response.data);
    }
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.error({
      message: `Error`,
      description: `${errors && errors.join("\n")}`,
      placement,
    });
  };

  useEffect(() => {
    axios
      .get(`${moviesURL}/putget/${id}`)
      .then((response: AxiosResponse<MoviePutGet>) => {
        const model: MovieCreation = {
          title: response.data.movie.title,
          inTheaters: response.data.movie.inTheaters,
          trailer: response.data.movie.trailer,
          posterURL: response.data.movie.poster,
          summary: response.data.movie.summary,
          releaseDate: dayjs(response.data.movie.releaseDate),
          actors: response.data.movie.actors,
          movieTheatersIds: response.data.selectedMovieTheaters.map(selectedMovieTheater => selectedMovieTheater.id),
          genresIds: response.data.selectedGenres.map(genre => genre.id),
        };

        setMovie(model);
        setMoviePutGet(response.data);
      });
  }, [id]);

  useEffect(() => {
    errors.length && openNotification("top");
  }, [errors]);

  return (
    <div className="flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      {contextHolder}
      <h3 className="mt-5 mb-5 font-semibold text-xl leading-6">
        Edit a Movie
      </h3>
      {movie && moviePutGet ? (
        <MovieForm
          movieCreation={movie}
          onSubmit={async (values) => await handleEditMovie(values)}
          genres={moviePutGet.genres}
          selectedGenres={moviePutGet.selectedGenres}
          selectedMovieThetears={moviePutGet.selectedMovieTheaters}
          movieTheaters={moviePutGet.movieTheaters}
          selectedActors={moviePutGet.actors}
        />
      ) : (
        <CustomSpin />
      )}
    </div>
  );
};

export default EditMovie;
