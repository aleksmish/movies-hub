import axios, { AxiosError } from 'axios'
import { GenreCreation } from '../types/genres'
import GenreForm from '../components/genres/GenreForm'
import { genresURL } from '../endpoints'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { NotificationPlacement } from 'antd/es/notification/interface'
import { notification } from 'antd'

const CreateGenre = () => {
  const [api, contextHolder] = notification.useNotification();
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate();

  const handleCreateGenre = async (genre: GenreCreation) => {
    try {
      await axios.post(genresURL, genre);
      navigate('/genres');
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response) {
        setErrors(error.response?.data);
      }
    }
  }

  const openNotification = (placement: NotificationPlacement) => {
    api.error({
      message: `Error`,
      description: `${errors && errors.join("\n")}`,
      placement,
    });
  };

  useEffect(() => {
    errors.length && openNotification("top");
  }, [errors]);

  return (
    <div className="flex flex-col content-center max-w-[1200px] w-full m-auto p-5 mb-5">
      {contextHolder}
      <h3 className='mt-5 mb-5 font-semibold text-xl leading-6'>Create a Genre</h3>
      <GenreForm onSubmit={handleCreateGenre} />
    </div>
  )
}

export default CreateGenre