import { Movie } from '../../types/movies';
import GenericList from '../shared/GenericList';
import IndividualMovie from './IndividualMovie';
import CustomSpin from './CustomSpin';

type MoviesListProps = {
  movies?: Movie[] | null;
}

const MoviesList = ({movies = []}: MoviesListProps) => {
  return (
    <GenericList list={movies} loadingUI={<CustomSpin />}>
      <div className='grid gap-5 grid-cols-5 min-h-[350px]'>
        {movies?.map(movie => (
          <IndividualMovie key={movie.id} movie={movie} />
        ))}
      </div>
    </GenericList>
  )
}

export default MoviesList