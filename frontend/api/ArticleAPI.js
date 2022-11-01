import React from 'react'
import axios from 'axios';

export const ArticleAPI = React.createContext();

class AuthContextProvider extends React.Component {

  const getArticles = async () => {
    try {
      // axios request
      // save user and token to context
      setAuth(data);
    } catch (err) {
      //
    }
  };

  const getImages = async () => {
    try {
      // axios request
      // save user and token to context
      setAuth(data);
    } catch (err) {
      //
    }
  };

  const getAudio = async () => {
    try {
      // axios request
      // save user and token to context
      setAuth(data);
    } catch (err) {
      //
    }
  };
}

export default ArticleAPI;