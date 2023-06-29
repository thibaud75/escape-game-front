let saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

let logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
};

let isLogged = () => {
  let token = localStorage.getItem("token");
  return !!token;
};

let saveUserId = (userId: string) => {
  localStorage.setItem("userId", userId);
};
let saveUserName = (userName: string) => {
  localStorage.setItem("userName", userName);
};

export const accountService = {
  saveToken,
  logout,
  isLogged,
  saveUserId,
  saveUserName,
};
