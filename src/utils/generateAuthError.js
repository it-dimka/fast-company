export function generateAuthError(message) {
  switch (message) {
  case "INVALID_PASSWORD":
    return "Email или пароль введены некоректно";
  case "EMAIL_NOT_FOUND":
    return "Такой email не зарегистрирован";
  default:
    return "Слишком много попыток входа. Попробуйте позднее";
  }
}
