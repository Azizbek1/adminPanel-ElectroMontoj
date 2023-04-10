import {  Fragment, useRef, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";
import SliderPageStyled from "./Style";
import { ISliderAdd } from "./Slider.props";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { ColumnsType } from "antd/lib/table/interface";
import { Link } from "react-router-dom";
import { Button, Col, Row, Table } from "antd";
import { MdCancel, MdOutlineModeEditOutline } from "react-icons/md";
import { useDebounce } from "../../hooks/useDebounce";
import { SlideService } from "../../services/sliders/slide.service";
import { toastError } from "../../settings/ToastReact/ToastReact";
import { ISlidePropsColumns } from "../../components/Table/Columns/columns.props";
import { SlideUrlRoute } from "../../utils/urlsRouter";
import { UploadImage } from "../../components";

function SliderPage() {
  const { handleSubmit, control, reset } = useForm<ISliderAdd>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { errors } = useFormState({
    control,
  });
  const queryData = useQuery(
    ["slide list", debouncedSearch],
    () => SlideService.getAll(debouncedSearch),
    {
      select: ({ data }: any) => {
        return data.data;
      },
      onError(error: any) {
        toastError(error, "slide list");
      },
    }
  );
  const { data, isLoading, error, isError } = queryData;
  const { mutateAsync } = useMutation(
    "create slide",
    (data: any) => SlideService.create(data),
    {
      onError(error: any) {
        toastError(error, "Ошибка");
      },
      onSuccess() {
        toastr.success("Слидер", "Слидер успешно добавлен");
        queryData.refetch();
      },
    }
  );
  const { mutateAsync: deleteAsync } = useMutation(
    "delete slide",
    (genreId: string) => SlideService.delete(genreId),
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
  const onSubmit: SubmitHandler<ISliderAdd> = async (data: ISliderAdd) => {
    const { name, slogan, url } = data;
    await mutateAsync({ name, slogan, url, show: true });
    reset();
  };
  const Slidecolumns: ColumnsType<ISlidePropsColumns> = [
    {
      title: "Загаловка слидера",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Картинка",
      key: "url",
      dataIndex: "url",
      render: (url: string) => {
        return (
          <SliderPageStyled>
            <img className="image__colomns" src={`${url}`} alt="png" />
          </SliderPageStyled>
        );
      },
    },
    {
      title: "Текст",
      key: "slogan",
      dataIndex: "slogan",
    },
    {
      title: "Действия",
      key: "id",
      dataIndex: "id",
      render: (id: string) => {
        return (
          <SliderPageStyled>
            <Link className="warning__edit" to={`${SlideUrlRoute}/${id}`}>
              <MdOutlineModeEditOutline />
            </Link>
            <Button onClick={() => deleteAsync(id)} type="primary" danger>
              <MdCancel />
            </Button>
          </SliderPageStyled>
        );
      },
    },
  ];
  return (
    <SliderPageStyled>
      <h2>SliderPage</h2>
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
              required
              size="small"
              margin="normal"
              className="auth-form__input"
              error={!!errors?.name?.message}
              helperText={errors?.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="slogan"
          render={({ field }) => (
            <TextField
              label="Добавить текст"
              required
              onChange={(e) => field.onChange(e)}
              value={field.value || ""}
              fullWidth={true}
              size="small"
              margin="normal"
              className="auth-form__input"
              error={!!errors?.slogan?.message}
              helperText={errors?.slogan?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="url"
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
        <Col xl={20}>
          <Table
            loading={isLoading}
            rowKey="id"
            columns={Slidecolumns}
            dataSource={data}
          />
        </Col>
      </Row>
    </SliderPageStyled>
  );
}

export default SliderPage;
