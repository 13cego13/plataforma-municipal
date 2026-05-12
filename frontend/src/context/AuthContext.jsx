import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider =
  ({ children }) => {

    const [user, setUser] =
      useState(null);

    const [token, setToken] =
      useState(null);

    useEffect(() => {

      const savedToken =
        localStorage.getItem(
          "token"
        );

      const savedUser =
        localStorage.getItem(
          "user"
        );

      if (
        savedToken &&
        savedUser
      ) {

        setToken(savedToken);

        setUser(
          JSON.parse(savedUser)
        );

      }

    }, []);

    const login = (
      userData,
      userToken
    ) => {

      localStorage.setItem(
        "token",
        userToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(userData);

      setToken(userToken);

    };

    const logout = () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      setUser(null);

      setToken(null);

    };

    return (

      <AuthContext.Provider
        value={{
          user,
          token,
          login,
          logout,
        }}
      >

        {children}

      </AuthContext.Provider>

    );

};

export const useAuth = () =>
  useContext(AuthContext);