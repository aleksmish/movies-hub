import MovieTheaterForm from "../components/MovieTheaterForm"

const EditMovieTheaterPage = () => {
  return (
    <div className="h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      <h3 className='mt-5 mb-5 font-semibold text-xl leading-6'>Edit a Movie Theater</h3>
      <MovieTheaterForm movieTheater={{id: 1, name: "Some movie title", latitude: 18.4, longtitude: 10}} />
    </div>
  )
}

export default EditMovieTheaterPage