export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};
export const validateUsername = (username: string): boolean => {
  return username.length >= 3;
};
export const validateRegister = (username: string, email: string, password: string, confirmPassword: string  ): boolean => {
  if (!validateEmail(email)) {
    return false;
  }
  if (password !== confirmPassword) {
    return false;
  }
  if (password.length < 6) {
    return false;
  }
  if (username.length < 3) {
    return false;
  }
  return true;
};  