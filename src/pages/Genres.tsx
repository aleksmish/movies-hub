import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import EntityPage from "../components/shared/EntityPage";
import { genresURL } from "../endpoints";
import { Genre } from "../types/genres";

const Genres = () => {
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
  return (
    <>
      <EntityPage<Genre> url={genresURL} title="Genres" entityName="Genre">
        {(genres, buttons) => (
          <Table
            className="mt-4 mb-2"
            columns={columns}
            dataSource={genres.map((genre) => ({
              ...genre,
              key: genre.id,
              action: buttons(genre.id),
            }))}
            bordered
            pagination={false}
          />
        )}
      </EntityPage>
    </>
  );
};

export default Genres;
