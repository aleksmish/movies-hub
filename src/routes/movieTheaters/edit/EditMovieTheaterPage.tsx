import EditEntity from "../../../components/EditEntity";
import { movieTheatersURL } from "../../../endpoints";
import {
  MovieTheater,
  MovieTheaterCreation,
} from "../../../types/movieTheater";
import MovieTheaterForm from "../components/MovieTheaterForm";

const EditMovieTheaterPage = () => {
  return (
    <EditEntity<MovieTheaterCreation, MovieTheater>
      url={movieTheatersURL}
      entityName="Movie Theater"
      indexURL="/movie-theaters"
    >
      {(movieTheater, handleEditMovieTheater) => (
        <MovieTheaterForm
          movieTheater={movieTheater}
          onSubmit={async (values) => await handleEditMovieTheater(values)}
        />
      )}
    </EditEntity>
  );
};

export default EditMovieTheaterPage;
