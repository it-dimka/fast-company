export const validatorConfigEditForm = {
  email: {
    isRequired: {
      message: "Email обязателен для заполнения"
    },
    isEmail: {
      message: "Email введен не корректно"
    }
  },
  name: {
    isRequired: {
      message: "Это поле не может быть пустым"
    },
    min: {
      message: "Минимум 2 символа",
      value: 2
    }
  }
};

export const validatorConfigLoginForm = {
  email: {
    isRequired: {
      message: "Email обязателен для заполнения"
    },
    isEmail: {
      message: "Email введен не корректно"
    }
  },
  password: {
    isRequired: {
      message: "Password обязателен для заполнения"
    },
    isCapitalSymbol: {
      message: "Пароль должен сожержать хотя бы одну заглавную букву"
    },
    isContainDigit: {
      message: "Пароль должен сожержать хотя бы одно число"
    },
    min: {
      message: "Пароль не должен быть короче 8 символов",
      value: 8
    }
  }
};

export const validatorConfigRegisterForm = {
  email: {
    isRequired: {
      message: "Email обязателен для заполнения"
    },
    isEmail: {
      message: "Email введен не корректно"
    }
  },
  password: {
    isRequired: {
      message: "Password обязателен для заполнения"
    },
    isCapitalSymbol: {
      message: "Пароль должен сожержать хотя бы одну заглавную букву"
    },
    isContainDigit: {
      message: "Пароль должен сожержать хотя бы одно число"
    },
    min: {
      message: "Пароль не должен быть короче 8 символов",
      value: 8
    }
  },
  profession: {
    isRequired: {
      message: "Обязательно укажите вашу профессию"
    }
  },
  license: {
    isRequired: {
      message: "Подтвердите что вы ознакомились с лицензионным соглашением"
    }
  }
};
