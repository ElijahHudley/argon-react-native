import React from 'react'

export const AuthContext = React.createContext();

class ContextProvider extends React.Component {

  state={digit:2}

  render() {
    return (<AuthContext.Provider value={{digit:this.state.digit}} >
      {this.props.children}
    </AuthContext.Provider>)
  }
}
export default ContextProvider;