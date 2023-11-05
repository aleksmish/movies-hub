import { Genre } from "../../../types/genres"
import MovieForm from "../components/MovieForm"

const EditMoviePage = () => {
  const genres: Genre[] = [{id:1, name: "Comedy"}, {id: 2, name: "Drama"}]
  const selectedGenres: Genre[] = [{id: 2, name: "Drama"}]
  const movieTheaters = [{id: 1, name: 'Some theater'}, {id: 2, name: "Some theater2"}]
  return (
    <div className="h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      <h3 className='mt-5 mb-5 font-semibold text-xl leading-6'>Edit a Movie</h3>
      <MovieForm genres={genres} selectedGenres={selectedGenres} movieTheaters={movieTheaters} />
    </div>
  )
}

export default EditMoviePage