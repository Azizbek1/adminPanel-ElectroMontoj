import { LoadingButton } from "@mui/lab";
import { Button, TextField } from "@mui/material";
import React, { ReactElement } from "react";
import EditNewsStyle from "../Style";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { useNavigate, useParams } from "react-router-dom";
import { UploadImage } from "../../../components";
import { toastError } from "../../../settings/ToastReact/ToastReact";
import { PrortFolioService } from "../../../services/portfolio/portfolio.service";
import { INewsAdd } from "../../NewsPage/News.props";

function EditPortfolio(): ReactElement {
  const { handleSubmit, control, reset } = useForm<INewsAdd>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { errors } = useFormState({
    control,
  });
  const { isLoading, data } = useQuery(
    ["show portfolio"],
    () => PrortFolioService.show(id),
    {
      onSuccess({ data }) {},
      onError(error) {
        toastError(error, "Get movie");
      },
    }
  );
  const { mutateAsync } = useMutation(
    "update portfolio",
    (data: any) => PrortFolioService.update(id, data),
    {
      onError(error: any) {
        toastError(error, "Ошибка");
      },
      onSuccess() {
        toastr.success("Новости", "Новости успешно редактирован");
        navigate("/portfolio");
      },
    }
  );
  const onSubmit = async (data: any) => {
    const { name, text, file } = data;
    await mutateAsync({ name, text, file });
  };
  const goBack = () => navigate(-1);
  return (
    <EditNewsStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              label="Добавить Загаловку"
              onChange={(e) => field.onChange(e)}
              value={field.value || data?.data?.data.name}
              fullWidth={true}
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
          name="text"
          render={({ field }) => (
            <TextField
              label="Добавить текст"
              onChange={(e) => field.onChange(e)}
              value={field.value || data?.data?.data.text}
              fullWidth={true}
              size="small"
              margin="normal"
              className="auth-form__input"
              error={!!errors?.text?.message}
              helperText={errors?.text?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="file"
          render={({ field }) => (
            <UploadImage onChange={(e) => field.onChange(e)} />
          )}
        />
        <img
          src={data?.data.data.file}
          alt="png"
          className="imageWidth"
          style={{ width: "300px", height: "300px", marginTop: "20px" }}
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
          Редактировать
        </LoadingButton>
      </form>
      <div style={{ marginTop: "10px" }}>
        <Button variant="outlined" color="error" onClick={goBack}>
          Назад
        </Button>
      </div>
    </EditNewsStyle>
  );
}
export default EditPortfolio;
