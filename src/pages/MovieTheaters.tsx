import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import EntityPage from "../components/shared/EntityPage";
import { movieTheatersURL } from "../endpoints";
import { MovieTheater } from "../types/movieTheater";

const MovieTheaters = () => {
  const columns: ColumnsType<MovieTheater> = [
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

  return (
    <EntityPage<MovieTheater>
      url={movieTheatersURL}
      title="Movie Theaters"
      entityName="Movie Theater"
    >
      {(movieTheaters, buttons) => (
        <Table
          className="mt-4 mb-2"
          columns={columns}
          dataSource={movieTheaters.map((movieTheater) => ({
            ...movieTheater,
            key: movieTheater.id,
            action: buttons(movieTheater.id),
          }))}
          bordered
          pagination={false}
        />
      )}
    </EntityPage>
  );
};

export default MovieTheaters;
