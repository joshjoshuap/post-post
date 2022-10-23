import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  jsonWebToken: null,
  userId: null,
  userName: null,
  login: () => {},
  logout: () => {},
});
