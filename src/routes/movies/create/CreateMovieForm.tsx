import MovieForm from "../components/MovieForm"

const CreateMoviePage = () => {
  return (
    <div className="h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      <MovieForm movieCreation={{  title: '',
  inTheaters: true,
  trailer: '',
  releaseDate: new Date(),
  posterURL: '',}} />
    </div>
  )
}

export default CreateMoviePage