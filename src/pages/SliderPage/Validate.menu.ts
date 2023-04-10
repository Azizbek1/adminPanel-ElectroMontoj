export const SliderValidation: IValidate = {
  required: "Обязательно для заполнения",
  validate: (value) => {
    if (value.match(/[а-яА-Я]/)) {
      return "Логин не может содержать русские буквы";
    }
    return true;
  },
};

interface IValidate {
    required: string
    validate: (value: string) => boolean | string
}
