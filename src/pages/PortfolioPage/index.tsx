import React, { ReactElement, useEffect, useState } from "react";
import ServicesPageStyled from "./Style";
import { Button, Col, Row, Table } from "antd";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";
import { TextField } from "@mui/material";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { MdCancel, MdOutlineModeEditOutline } from "react-icons/md";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { stripHtml } from "string-strip-html";
import { toastError } from "../../settings/ToastReact/ToastReact";
import { useDebounce } from "../../hooks/useDebounce";
import TextEditor from "../../components/TextEditor/TextEditor";
import { UploadImage } from "../../components";
import { PrortFolioService } from "../../services/portfolio/portfolio.service";
import { PortUrlRoute } from "../../utils/urlsRouter";

export default function PortFolioPage(): ReactElement {
  const { handleSubmit, control, reset } = useForm<any>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { errors } = useFormState({
    control,
  });
  const queryData = useQuery(
    ["Portofolio list", debouncedSearch],
    () => PrortFolioService.getAll(debouncedSearch),
    {
      select: ({ data }: any) => {
        return data.data;
      },
      onError(error: any) {
        toastError(error, "Portofolio list");
      },
    }
  );
  const { mutateAsync } = useMutation(
    "create Portofolio",
    (data: any) => PrortFolioService.create(data),
    {
      onError(error: any) {
        toastError(error, "Ошибка");
      },
      onSuccess() {
        toastr.success("Услуги", "Услуги успешно добавлен");
        queryData.refetch();
      },
    }
  );
  const { mutateAsync: deleteAsync } = useMutation(
    "delete Portofolio",
    (genreId: string) => PrortFolioService.delete(genreId),
    {
      onError(error) {
        toastError(error, "Ошибка при удаление");
      },
      onSuccess() {
        toastr.success("Удаление", "успешно удалён");
        queryData.refetch();
      },
    }
  );
  const { data, isLoading } = queryData;
  const Newscolumns: ColumnsType<any> = [
    {
      title: "Загаловка Портфолио",
      key: "name",
      dataIndex: "name",
    },

    {
      title: "Картинка",
      key: "file",
      dataIndex: "file",
      render: (url: string) => {
        return (
          <ServicesPageStyled>
            <img className="image__colomns" src={`${url}`} alt="jpg" />
          </ServicesPageStyled>
        );
      },
    },
    {
      title: "Действия",
      key: "id",
      dataIndex: "id",
      render: (id: string) => {
        return (
          <ServicesPageStyled>
            <Link className="warning__edit" to={`${PortUrlRoute}/${id}`}>
              <MdOutlineModeEditOutline />
            </Link>
            <Button onClick={() => deleteAsync(id)} type="primary" danger>
              <MdCancel />
            </Button>
          </ServicesPageStyled>
        );
      },
    },
  ];
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    await mutateAsync(data);
    reset();
  };
  return (
    <ServicesPageStyled>
      <h2>Портфолио</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              label="Добавить Загаловку"
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              fullWidth={true}
              size="small"
              required
              margin="normal"
              className="auth-form__input"
              error={!!errors?.name?.message}
            />
          )}
        />

        <Controller
          name="text"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextEditor onChange={onChange} error={error} value={value} placeholder="editor"/>
          )}
          rules={{
            validate: {
              required: (v) =>
                (v && stripHtml(v).result.length > 0) ||
                "Description is required!",
            },
          }}
        />
        <Controller
          control={control}
          name="file"
          render={({ field }) => (
            <UploadImage onChange={(e) => field.onChange(e)} />
          )}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          sx={{
            marginTop: 2,
          }}
        >
          Добавить
        </LoadingButton>
      </form>
      <Row>
        <Col xl={24}>
          <Table
            loading={isLoading}
            rowKey="id"
            columns={Newscolumns}
            dataSource={data}
          />
        </Col>
      </Row>
    </ServicesPageStyled>
  );
}
