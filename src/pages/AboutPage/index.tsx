import React, { ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { IAboutPort } from "./About.props";
import { Button } from "antd";
import AboutStyled from "./Style";
import { useDebounce } from "../../hooks/useDebounce";
import { AboutService } from "../../services/about/about.service";
import { toastError } from "../../settings/ToastReact/ToastReact";
import { UploadImage } from "../../components";
import TextEditor from "../../components/TextEditor/TextEditor";
import { stripHtml } from "string-strip-html";
import { AboutUrlRoute } from "../../utils/urlsRouter";
interface Props {}

function AboutPage({}: Props): ReactElement {
  const { handleSubmit, control, reset } = useForm<IAboutPort>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const { errors } = useFormState({
    control,
  });
  const queryData = useQuery(
    ["About list", debouncedSearch],
    () => AboutService.getAll(debouncedSearch),
    {
      select: ({ data }: any) => {
        return data.data;
      },
      onError(error: any) {
        toastError(error, "About list");
      },
    }
  );
  const { mutateAsync } = useMutation(
    "create About",
    (data: any) => AboutService.create(data),
    {
      onError(error: any) {
        toastError(error, "Ошибка проверте файлы");
      },
      onSuccess() {
        toastr.success("О нас", "О нас успешно добавлен");
        queryData.refetch();
      },
    }
  );
  const { mutateAsync: deleteAsync } = useMutation(
    "delete Abou",
    (genreId: string) => AboutService.delete(genreId),
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
  console.log(data);
  const onSubmit: SubmitHandler<IAboutPort> = async (data: IAboutPort) => {
    await mutateAsync(data);
    reset();
  };
  return (
    <AboutStyled>
      <h2>О нас</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="text"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <TextEditor
              onChange={onChange}
              error={error}
              value={value}
              placeholder="editor"
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
        <div className="bt-Mar">
          <Button onClick={() => navigate("/about/edit")}>Редактировать</Button>
        </div>
      </form>
    </AboutStyled>
  );
}

export default AboutPage;
