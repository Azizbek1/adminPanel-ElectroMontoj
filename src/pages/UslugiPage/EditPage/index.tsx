import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { ReactElement } from "react";
import {
  Controller,
  useForm,
  useFormState,
} from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { useNavigate, useParams } from "react-router-dom";

import { stripHtml } from 'string-strip-html';
import { toastError } from "../../../settings/ToastReact/ToastReact";
import { UslugiService } from "../../../services/uslugi/uslugi.service";
import TextEditor from "../../../components/TextEditor/TextEditor";
import { UploadImage } from "../../../components";

function ServisesEditPage(): ReactElement {
  const { handleSubmit, control, reset } = useForm<any>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { errors } = useFormState({
    control,
  });
  const { isLoading, data } = useQuery(
    ["show servises"],
    () => UslugiService.show(id),
    {
      onSuccess({ data }) {},
      onError(error) {
        toastError(error, "Get movie");
      },
    }
  );
  const { mutateAsync } = useMutation(
    "update servises",
    (data: any) => UslugiService.update(id, data),
    {
      onError(error: any) {
        toastError(error, "Ошибка");
      },
      onSuccess() {
        toastr.success("Услуги", "Услуги успешно редактирован");
        navigate("/services");
      },
    }
  );
  const onSubmit = async (data: any) => {
    const { name, file, text } = data;
    await mutateAsync({ name, file, text, show: true });
  };
  return (
    <div>
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
              required
              size="small"
              margin="normal"
              className="auth-form__input"
              error={!!errors?.name?.message}
            />
          )}
        />
        <Controller
          name="text"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextEditor onChange={onChange} error={error} value={value || data?.data?.data.text} placeholder="Editor" />
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
        <img
          src={data?.data.data.file}
          alt="png"
          className=""
          style={{ borderRadius: "50%", width: "50px" }}
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
    </div>
  );
}
export default ServisesEditPage;
