import { LoadingButton } from "@mui/lab";
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
import { IAboutPort } from "../About.props";
import { AboutService } from "../../../services/about/about.service";
import { toastError } from "../../../settings/ToastReact/ToastReact";
import { UploadImage } from "../../../components";
import TextEditor from "../../../components/TextEditor/TextEditor";
import { stripHtml } from "string-strip-html";

function EditAboutPage(): ReactElement {
  const { handleSubmit, control, reset } = useForm<IAboutPort>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { errors } = useFormState({
    control,
  });
  const { isLoading, data } = useQuery(
    ["show About"],
    () => AboutService.show(id),
    {
      onError(error) {
        toastError(error, "Get movie");
      },
    }
  );
  const { mutateAsync } = useMutation(
    "update About",
    (data: any) => AboutService.update(data),
    {
      onError(error: any) {
        toastError(error, "Ошибка");
      },
      onSuccess() {
        toastr.success("О нас", "О нас успешно редактирован");
        navigate("/about");
      },
    }
  );
  const onSubmit = async (data: any) => {
    const { name, text, file } = data;
    await mutateAsync({ name, text, file });
  };
  return (
    <EditNewsStyle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="text"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextEditor
              onChange={onChange}
              error={error}
              value={value || data?.data?.data.text}
              placeholder="Editor"
            />
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
          src={data?.data.data.url}
          alt="png"
          className="imageWidth"
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
    </EditNewsStyle>
  );
}
export default EditAboutPage;
