import {
  Button,
  Pagination,
  PaginationProps,
  Popconfirm,
  message,
  notification,
} from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericList from "./GenericList";
import SelectRecordsPerPage from "../forms/SelectRecordsPerPage";

type EntityPageProps<T> = {
  url: string;
  createURL?: string;
  title: string;
  entityName: string;
  children: (
    entities: T[],
    buttons: (entityId: number) => ReactElement
  ) => ReactElement;
};

const EntityPage = <T extends { id: number | string }>({
  url,
  createURL,
  title,
  entityName,
  children,
}: EntityPageProps<T>) => {
  const [api, contextHolder] = notification.useNotification();
  const [entities, setEntities] = useState<T[]>([]);
  const [totalAmountOfRecords, setTotalAmountOfRecords] = useState(0);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState<Error[]>([]);
  const navigate = useNavigate();

  const handleEditClick = (entityId: number) => {
    navigate(`edit/${entityId}`);
  };

  const handleDeleteEntity = async (entityId: number) => {
    try {
      await axios.delete(`${url}/${entityId}`);
      handleConfirm();
      setEntities(entities.filter((entity) => entity.id !== entityId));
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

  const handleNavigateToCreateEntity = () => {
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
    message.success("The record has been successfully deleted");
  };

  const handleCancel = (e?: React.MouseEvent<HTMLElement>) => {
    message.error("Deleting the record was cancelled");
  };

  const Buttons = (entityId: number) => (
    <div className="flex flex-row gap-5 align-middle">
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={() => handleDeleteEntity(entityId)}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
        okButtonProps={{ className: "bg-[#1677ff]" }}
      >
        <Button type="primary" danger>
          Delete
        </Button>
      </Popconfirm>
      <Button
        type="primary"
        className="bg-[#1677ff]"
        onClick={() => handleEditClick(entityId)}
      >
        Edit
      </Button>
    </div>
  );

  useEffect(() => {
    axios
      .get(url, {
        params: { page: currentPage, recordsPerPage },
      })
      .then((response: AxiosResponse<T[]>) => {
        const totalAmountOfRecords = parseInt(
          response.headers["totalamountofrecords"]
        );
        setTotalAmountOfRecords(totalAmountOfRecords);
        setEntities(response.data);
      });
  }, [recordsPerPage, currentPage]);

  useEffect(() => {
    errors.length && openNotification("top");
  }, [errors]);

  return (
    <div className="flex flex-col content-center max-w-[1200px] w-full m-auto p-5">
      {contextHolder}
      <h2 className="mt-5 mb-5 font-semibold text-xl leading-6">{title}</h2>
      {createURL && (
        <Button onClick={handleNavigateToCreateEntity}>
          Create {entityName}
        </Button>
      )}
      <SelectRecordsPerPage onChange={handleSelectRecrodsPerPage} />
      <Pagination
        className="mt-4 mb-2"
        current={currentPage}
        total={totalAmountOfRecords}
        hideOnSinglePage
        pageSize={recordsPerPage}
        onChange={handlePagination}
      />
      <GenericList list={entities}>{children(entities!, Buttons)}</GenericList>
    </div>
  );
};

export default EntityPage;
