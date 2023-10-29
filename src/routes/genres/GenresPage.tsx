import React from 'react'
import CreateGenreForm from "./components/CreateGenreForm"
import Button from "../../components/Button"
import { useNavigate } from 'react-router-dom'

const GenresPage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("create")
  }

  return (
    <div className="h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      <h2 className='mt-5 mb-5 font-semibold text-xl leading-6'>Genres</h2>
      <Button onClick={handleClick}>Create a Genre</Button>
    </div>
  )
}

export default GenresPage