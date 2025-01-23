export const ValidateInputs = (inputs) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
  const errors = {}

  if (inputs.email && !emailRegex.test(inputs.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  // if (inputs.password && !passwordRegex.test(inputs.password)) {
  //   errors.password =
  //     'Password must be at least 6 characters long and contain both uppercase and lowercase letters.'
  // }

  return errors
}
