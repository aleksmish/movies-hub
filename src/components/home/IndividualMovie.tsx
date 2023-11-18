import { Link } from "react-router-dom";
import { Movie } from "../../types/movies";
import { Button, Image, Popconfirm, message } from "antd";
import axios from "axios";
import { moviesURL } from "../../endpoints";
import { useContext } from "react";
import AlertContext from "../../store/AlertContext";
import Authorized from "../../pages/Authorized";

type MovieProps = {
  movie: Movie;
};

const IndividualMovie = ({ movie }: MovieProps) => {
  const buildLink = () => `/movies/${movie.id}`;
  const customAlert = useContext(AlertContext);
  
  const handleConfirm = (e?: React.MouseEvent<HTMLElement>) => {
    message.success("The record has been successfully deleted");
  };
  const handleCancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error("Deleting the record was cancelled");
  };
  const handleDeleteMovie = () => {
    axios.delete(`${moviesURL}/${movie.id}`).then(() => {
      customAlert();
    });
    handleConfirm()
  };

  return (
    <div className="min-h-[400px] max-h-[400px] h-[400px]">
      <Link to={buildLink()}>
        <Image
          alt="Poster"
          preview={false}
          height={300}
          width="100%"
          src={movie.poster}
          className="w-full rounded-md"
        />
      </Link>
      <div className="flex flex-col justify-center h-[100px]">
        <p className="mt-2 font-bold block h-full">
          <Link to={buildLink()}>{movie.title}</Link>
        </p>
        <div className="flex flex-row justify-between items-center h-full">
          <Authorized
            role="admin"
            authorized={
              <>
                <Link to={`/movies/edit/${movie.id}`} className="mr-5" type="">
                  Edit
                </Link>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={handleDeleteMovie}
                  onCancel={handleCancel}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ className: "bg-[#1677ff]" }}
                >
                  <Button type="primary" className="bg-[#1677ff] w-fit">
                    Delete
                  </Button>
                </Popconfirm>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default IndividualMovie;
