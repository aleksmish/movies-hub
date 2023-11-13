import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actorsURL } from "../endpoints";
import { ActorCreation } from "../types/actors";
import { convertActorToFormData } from "../utils/formData";
import ActorForm from "../components/actors/ActorForm";

const CreateActorPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleCreateActor = async (actor: ActorCreation) => {
    try {
      const formData = convertActorToFormData(actor);
      await axios({
        method: "post",
        url: actorsURL,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/actors");
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response) {
        setErrors(error.response.data);
      }
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
    errors.length && openNotification("top");
  }, [errors]);

  return (
    <div className="h-[70px] flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      {contextHolder}
      <h3 className="mt-5 mb-5 font-semibold text-xl leading-6">
        Create an Actor
      </h3>
      <ActorForm
        onSubmit={async (values) => await handleCreateActor(values)}
      />
    </div>
  );
};

export default CreateActorPage;
