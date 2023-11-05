import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Genre } from "../../types/genres";
import axios, { AxiosError, AxiosResponse } from "axios";
import { urlGenres } from "../../endpoints";
import { Pagination, PaginationProps, Popconfirm, Select, Table, message, notification } from "antd";
import GenericList from "../../components/GenericList";
import { ColumnsType } from "antd/es/table";
import SelectRecordsPerPage from "./components/SelectRecordsPerPage";
import { NotificationPlacement } from "antd/es/notification/interface";

const GenresPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [totalAmountOfRecords, setTotalAmountOfRecords] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState<Error[]>([]);
  const navigate = useNavigate();

  const columns: ColumnsType<Genre> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 350,
    },
  ];

  const handleEditClick = (genreId: number) => {
    navigate(`edit/${genreId}`);
  };

  const handleDeleteGenre = async (genreId: number) => {
    try {
      await axios.delete(`${urlGenres}/${genreId}`);
      handleConfirm()
      setGenres(genres.filter((genre) => genre.id !== genreId));
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

  const handleNavigateToCreateGenre = () => {
    navigate("create");
  };

  const handlePagination: PaginationProps["onChange"] = (page) => {
    setCurrentPage(page);
  };

  const handleSelectRecrodsPerPage = (value: number) => {
    setCurrentPage(1);
    setRecordsPerPage(value);
  };

  const handleConfirm = (e?: React.MouseEvent<HTMLElement>) => {
    message.success('The genre has been successfully deleted');
  };
  
  const handleCancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error('Deleting was cancelled');
  };

  useEffect(() => {
    axios
      .get(urlGenres, {
        params: { page: currentPage, recordsPerPage },
      })
      .then((response: AxiosResponse<Genre[]>) => {
        const totalAmountOfRecords = parseInt(
          response.headers["totalamountofrecords"]
        );
        setTotalAmountOfRecords(totalAmountOfRecords);
        setGenres(response.data);
      });
  }, [recordsPerPage, currentPage]);

  useEffect(() => {
    errors.length && openNotification("top");
  }, [errors]);

  return (
    <div className="h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      {contextHolder}
      <h2 className="mt-5 mb-5 font-semibold text-xl leading-6">Genres</h2>
      <Button onClick={handleNavigateToCreateGenre}>Create a Genre</Button>
      <SelectRecordsPerPage onChange={handleSelectRecrodsPerPage} />
      <GenericList list={genres}>
        <Table
          className="mt-4 mb-2"
          columns={columns}
          dataSource={genres.map((genre) => ({
            ...genre,
            key: genre.id,
            action: (
              <div className="flex flex-row gap-5 align-middle">
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => handleDeleteGenre(genre.id)}
                  onCancel={handleCancel}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{className: "bg-[#1677ff]"}}
                >
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </Popconfirm>
                <Button type="primary" className="bg-[#1677ff]" onClick={() => handleEditClick(genre.id)}>Edit</Button>
              </div>
            ),
          }))}
          bordered
          pagination={false}
        />
      </GenericList>
      <Pagination
        className="mt-4 mb-2"
        current={currentPage}
        total={totalAmountOfRecords}
        hideOnSinglePage
        pageSize={recordsPerPage}
        onChange={handlePagination}
      />
    </div>
  );
};

export default GenresPage;
