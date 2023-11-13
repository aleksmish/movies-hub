import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Actor } from '../types/actors'
import EntityPage from '../components/shared/EntityPage'
import { actorsURL } from '../endpoints'
import { ColumnsType } from 'antd/es/table'

const ActorsPage = () => {
  const navigate = useNavigate()

  const columns: ColumnsType<Actor> = [
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
    <EntityPage<Actor>
      url={actorsURL} title={"Actors"} entityName='Actor'>
        {(actors, buttons) => (
          <Table
            className="mt-4 mb-2"
            columns={columns}
            dataSource={actors.map((actor) => ({
              ...actor,
              key: actor.id,
              action: buttons(actor.id)
            }))}
            bordered
            pagination={false}
          />
        )}
    </EntityPage>
  )
}

export default ActorsPage