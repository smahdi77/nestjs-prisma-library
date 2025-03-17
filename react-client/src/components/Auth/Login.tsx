import React, { PureComponent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface LoginProps {}

interface LoginState {}

class Login extends React.Component<LoginProps, LoginState> {
  // state = { : }
  render() {
    return (
      <div>
        <div>
          <span className="">نام کاربری</span>
          <input className="m-2" type="text" name="username"></input>
        </div>
        <div>
          <span className="">کلمه عبور</span>
          <input type="password" name="password"></input>
        </div>
        <button className="m-2 btn btn-success">Login</button>
      </div>
    );
  }
}

export default Login;
