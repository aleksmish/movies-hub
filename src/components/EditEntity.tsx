import { Spin, notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type EditEntityProps<TCreation, TRead> = {
  url: string;
  entityName: string;
  indexURL: string;
  children: (entity: TCreation, onEditEntity: (entity: TCreation) => void) => ReactElement;
  transformFormData?: (entity: TCreation) => FormData;
  transform?: (entity: TRead) => TCreation;
};

const EditEntity = <TCreation, TRead>({
  url,
  entityName,
  indexURL,
  children,
  transformFormData,
  transform = (entity: any) => entity,
}: EditEntityProps<TCreation, TRead>) => {
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [entity, setEntity] = useState<TCreation>();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleEditEntity = async (entity: TCreation) => {
    try {
      if (transformFormData) {
        const formData = transformFormData(entity)
        await axios({
          method: 'put',
          url: `${url}/${id}`,
          data: formData,
          headers: {'Content-Type': 'multipart/form-data'},
        });
      } else {
        await axios.put(`${url}/${id}`, entity);
      }
      navigate(indexURL);
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
    axios.get(`${url}/${id}`).then((response: AxiosResponse<TRead>) => {
      setEntity(transform(response.data));
    });
  }, [id]);

  useEffect(() => {
    errors.length && openNotification("top");
  }, [errors]);

  return (
    <div className="h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      {contextHolder}
      <h3 className="mt-5 mb-5 font-semibold text-xl leading-6">Edit {entityName}</h3>
      {entity ? (
        children(entity, handleEditEntity)
      ) : (
        <Spin className="min-h-[300px] flex justify-center content-center"/>
      )}
    </div>
  );
};

export default EditEntity;
