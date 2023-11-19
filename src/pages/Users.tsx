import { Button, Popconfirm, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import axios from "axios";
import EntityPage from "../components/shared/EntityPage";
import { accountsURL } from "../endpoints";
import { User } from "../types/auth";

const Users = () => {
  const columns: ColumnsType<User> = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 350,
    },
  ];

  const promoteToAdmin = async (id: string) => {
    await doAdminRequest(`${accountsURL}/makeAdmin`, id);
    message.success("The user has been upgraded to Admin");
  };

  const removeAdmin = async (id: string) => {
    await doAdminRequest(`${accountsURL}/removeAdmin`, id);
    message.success("The user has been downgraded from Admin");
  };

  const doAdminRequest = async (url: string, id: string) => {
    await axios.post(url, JSON.stringify(id), {
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <EntityPage<User>
      title="Users"
      entityName="user"
      url={`${accountsURL}/listUsers`}
    >
      {(users) => (
        <Table
          className="mt-4 mb-2"
          columns={columns}
          dataSource={users.map((user) => ({
            ...user,
            key: user.id,
            action: (
              <div className="flex flex-row gap-5">
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to upgrade this user to Admin?"
                  onConfirm={() => promoteToAdmin(user.id)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ className: "bg-[#1677ff]" }}
                >
                  <Button type="primary" className="bg-[#1677ff]">
                    Promote to Admin
                  </Button>
                </Popconfirm>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to downgrade this user from Admin?"
                  onConfirm={() => removeAdmin(user.id)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ className: "bg-[#1677ff]" }}
                >
                  <Button type="primary" danger>
                    Downgrade from Admin
                  </Button>
                </Popconfirm>
              </div>
            ),
          }))}
          bordered
          pagination={false}
        />
      )}
    </EntityPage>
  );
};

export default Users;
