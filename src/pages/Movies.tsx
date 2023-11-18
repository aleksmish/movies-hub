import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const Movies = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("create")
  }

  return (
    <div className="flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      <h2 className='mt-5 mb-5 font-semibold text-xl leading-6'>Movies</h2>
      <Button onClick={handleClick}>Create a Movie</Button>
    </div>
  )
}

export default Movies