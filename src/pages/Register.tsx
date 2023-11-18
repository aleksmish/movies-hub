import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import { accountsURL } from "../endpoints";
import AuthenticationContext from "../store/AuthContext";
import { AuthenticationResponse, UserCredentials } from "../types/auth";
import { getClaims, saveToken } from "../utils/handleJWT";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [api, contextHolder] = notification.useNotification();
  const { claims, update } = useContext(AuthenticationContext);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleRegistrate = async (credentials: UserCredentials) => {
    try {
      const response = await axios.post<AuthenticationResponse>(
        `${accountsURL}/create`,
        credentials
      );
      saveToken(response.data);
      update(getClaims());
      navigate("/");
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
    errors.length && openNotification("top");
  }, [errors]);

  return (
    <div className="flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      {contextHolder}
      <h2 className="mt-5 mb-5 font-semibold text-xl leading-6">
        Registration
      </h2>
      <AuthForm
        model={{ email: "", password: "" }}
        onSubmit={async (values) => await handleRegistrate(values)}
      />
    </div>
  );
};

export default Register;
