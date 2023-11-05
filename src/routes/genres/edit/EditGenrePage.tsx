import axios, { AxiosError, AxiosResponse } from "axios";
import { GenreCreation } from "../../../types/genres";
import GenreForm from "../components/GenreForm";
import { urlGenres } from "../../../endpoints";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Errors from "../../../components/Errors";
import { Spin, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";

const EditGenrePage = () => {
  const [api, contextHolder] = notification.useNotification();
  const { id } = useParams();
  const [genre, setGenre] = useState<GenreCreation>();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleEditGenre = async (editedGenre: GenreCreation) => {
    try {
      await axios.put(`${urlGenres}/${id}`, editedGenre);
      navigate("/genres");
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response)
        setErrors(error.response.data);
    }
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.error({
      message: `Error`,
      description: `${errors && errors.join("\n")}`,
      placement,
    });
  };

  useEffect(() => {
    axios
      .get(`${urlGenres}/${id}`)
      .then((response: AxiosResponse<GenreCreation>) => {
        setGenre(response.data);
      });
  }, [id]);

  useEffect(() => {
    errors.length && openNotification("top");
  }, [errors]);

  return (
    <div className="h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      <h3 className="mt-5 mb-5 font-semibold text-xl leading-6">
        Edit Genre
      </h3>
      {genre ? (
        <GenreForm genreCreation={genre} onSubmit={handleEditGenre} />
      ) : (
        <Spin />
      )}
      <Errors errors={errors} />
    </div>
  );
};

export default EditGenrePage;
