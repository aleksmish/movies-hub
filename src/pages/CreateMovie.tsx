import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { moviesURL } from "../endpoints";
import { Genre } from "../types/genres";
import { MovieTheater } from "../types/movieTheater";
import { MovieCreation, MoviesPostGet } from "../types/movies";
import { convertMovieToFormData } from "../utils/formData";
import MovieForm from "../components/movies/MovieForm";

const CreateMovie = () => {
  const [api, contextHolder] = notification.useNotification();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [movieTheaters, setMovieTheaters] = useState<MovieTheater[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const openNotification = (placement: NotificationPlacement) => {
    api.error({
      message: `Error`,
      description: `${errors && errors.join("\n")}`,
      placement,
    });
  };

  const handleCreateMovie = async (movie: MovieCreation) => {
    try {
      const formData = convertMovieToFormData(movie);
      const response = await axios({
        method: "post",
        data: formData,
        url: moviesURL,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/movies/${response.data}`);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response)
        setErrors(error.response.data);
    }
  };

  useEffect(() => {
    axios
      .get(`${moviesURL}/postget`)
      .then((response: AxiosResponse<MoviesPostGet>) => {
        setGenres(response.data.genres);
        setMovieTheaters(response.data.movieTheaters);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    errors.length && openNotification("top");
  }, [errors]);

  return (
    <div className="flex flex-col content-center max-w-[1200px] w-full m-auto p-5 mb-5">
      {contextHolder}
      <h3 className="mt-5 mb-5 font-semibold text-xl leading-6">
        Create a Movie
      </h3>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <MovieForm
          onSubmit={async values => {
            // @ts-ignore
            values.actors = values.actors?.map(actor => ({id: actor.id, character: actor.character}))
            await handleCreateMovie(values)
          }}
          genres={genres}
          selectedGenres={[]}
          movieTheaters={movieTheaters}
          selectedMovieThetears={[]}
        />
      )}
    </div>
  );
};

export default CreateMovie;
