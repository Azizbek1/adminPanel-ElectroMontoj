// export const MenuValidation: IValidate = {
//   required: "Обязательно для заполнения",
//   validate: (value) => {
//     if (value.match(/[а-яА-Я]/)) {
//       return "Логин не может содержать русские буквы";
//     } else if (value.length < 6) {
//       return "Символ должен длиннее 6-ти символов";
//     }
//     return true;
//   },
// };


export const MenuValidation: any = {
  required: "Обязательно для заполнения",
  validate: (value : any) => {
    if (!value.match(/[A-Za-zА-Яа-яЁё]/)) {
      return "Ведите толька быквы";
    }
    return true;
  },
};

export const MenuValidationMenu: any = {
  required: "Обязательно для заполнения",
};


