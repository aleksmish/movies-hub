import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const ActorsPage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("create")
  }

  return (
    <div className="h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      <h2 className='mt-5 mb-5 font-semibold text-xl leading-6'>Actors</h2>
      <Button onClick={handleClick}>Create an Actor</Button>
    </div>
  )
}

export default ActorsPage