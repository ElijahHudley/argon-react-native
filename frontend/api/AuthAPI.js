import React from 'react'
import axios from 'axios';

export const AuthAPI = React.createContext();

class AuthContextProvider extends React.Component {

  const login = async () => {
    try {
      // axios request
      // save user and token to context
      setAuth(data);
    } catch (err) {
      //
    }
  };

  const register = async () => {
    try {
      // axios request
      // save user and token to context
      setAuth(data);
    } catch (err) {
      //
    }
  };

  const logout = async () => {
    try {
      // axios request
      // save user and token to context
      setAuth(data);
    } catch (err) {
      //
    }
  };
}

export default AuthAPI;