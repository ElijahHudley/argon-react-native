import React from 'react'

export const AuthContext = React.createContext();

class AuthContextProvider extends React.Component {

  state={ digit: 2 }
  const [auth, setAuth] = React.useContext(AuthContext);

  static contextType = AuthContext;

  constructor(props) {
    super(props)
    this.state = { loading: true, showAction: false }
    setTimeout(() => {
      StatusBar.setBackgroundColor(primary)
    }, 100)
  }

  const handleSubmit = async () => {
    try {
      // axios request
      // save user and token to context
      setAuth(data);
    } catch (err) {
      //
    }
  };

  render() {
    const {state, fetchChatList} = this.context;

    return (<AuthContext.Provider value={{digit:this.state.digit}} >
      {this.props.children}
    </AuthContext.Provider>)
  }
}
export default AuthContextProvider;