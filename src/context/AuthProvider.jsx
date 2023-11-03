import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const inintialState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };

    default:
      throw new Error("unknown action");
  }
}

const FAKE_USER = {
  name: "Mohammad",
  email: "mamadi78.94@gmail.com",
  password: "123456789",
};

export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dipatch] = useReducer(
    authReducer,
    inintialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dipatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dipatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
