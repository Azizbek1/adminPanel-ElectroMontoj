import React from "react";
import SiginPageStyled from "./Style";
import {
  SubmitHandler,
  useFormState,
  useForm,
  Controller,
} from "react-hook-form";
import { ISignInForm } from "./Sigin.props";
import { loginValidation, passwordValidation } from "./Sigin.validate";
import { Button, Input, Typography } from "antd";
import { useMutation } from "react-query";
import { AuthService } from "../../services/auth/auth.service";
import { toastError } from "../../settings/ToastReact/ToastReact";
import { toastr } from "react-redux-toastr";
import { setIsAuth, setIsStatus } from "../../store/Dispatch";
import { setLocalStorage } from "../../settings/localstorage/localStorage";

const SiginPage = () => {
  /* ===== React-hook-form ===== */
  const { handleSubmit, control, reset } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const { mutateAsync } = useMutation(
    "create About",
    (data: any) => AuthService.login(data),
    {
      onError(error: any) {
        toastError(error, "Ошибка");
      },
      onSuccess() {
        toastr.success("Успесшно вошли", "Добро пожаловать");
      },
    }
  );

  const onSubmit: SubmitHandler<ISignInForm> = (data) => {
    mutateAsync(data)
    setIsAuth('admin')
    setIsStatus(true)
    setLocalStorage('isAuth', 'admin')
    setLocalStorage('status', true)
    reset();
  };

  return (
    <SiginPageStyled>
      <div className="auth-form">
        <Typography.Title>Войдите</Typography.Title>
        <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="itemInputs">
            <Controller
              control={control}
              name="login"
              rules={loginValidation}
              render={({ field }) => (
                <Input
                  onChange={(e) => field.onChange(e)}
                  value={field.value || ""}
                  className="auth-form__input"
                  placeholder="Логин"
                  status={errors?.login ? "error" : ""}
                />
              )}
            />
            <span className="error">{errors?.login?.message}</span>
          </div>

          <div className="itemInputs">
            <Controller
              control={control}
              name="password"
              rules={passwordValidation}
              render={({ field }) => (
                <Input.Password
                  onChange={(e) => field.onChange(e)}
                  value={field.value || ""}
                  className="auth-form__input"
                  placeholder="пароль"
                  status={errors?.password ? "error" : ""}
                />
              )}
            />
            <span className="error">{errors?.password?.message}</span>
          </div>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </form>
      </div>
    </SiginPageStyled>
  );
};

export default SiginPage;
