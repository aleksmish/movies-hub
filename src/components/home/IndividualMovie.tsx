import { Movie } from '../../types/movies'

type MovieProps = {
  movie: Movie;
}

const IndividualMovie = ({movie}: MovieProps) => {
  const buildLink = () => `/movie/${movie.id}`
  return (
    <div className='min-h-[300px]'>
      <a href={buildLink()}>
        <img alt="Poster" src={movie.poster} className='w-full rounded-md'/>
      </a>
      <p className='mt-4 self-center font-bold'>
        <a href={buildLink()}>{movie.title}</a>
      </p>
    </div>
  )
}

export default IndividualMovie